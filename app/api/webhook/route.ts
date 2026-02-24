import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getDB, saveDB } from '@/lib/orders';
import { sendOrderConfirmationToCustomer, sendNewOrderNotificationToOwner } from '@/lib/email';

let _stripe: Stripe;
function getStripe() {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-01-28.clover' });
  return _stripe;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Retrieve full session with line items; cast away the Response<> wrapper
    const fullSession = (await getStripe().checkout.sessions.retrieve(session.id, {
      expand: ['line_items'],
    })) as unknown as Stripe.Checkout.Session;

    const items = (fullSession.line_items?.data || []).map(item => ({
      productName: item.description || 'Product',
      quantity: item.quantity || 1,
      price: (item.amount_total || 0) / 100 / (item.quantity || 1),
    }));

    const totalAmount = (fullSession.amount_total || 0) / 100;
    const customerName = fullSession.metadata?.customerName || 'Customer';
    const customerEmail = fullSession.customer_email || '';
    const orderId = `ORD-${fullSession.id.slice(-8).toUpperCase()}`;

    // Save order to DB
    const db = getDB();
    db.orders.push({
      id: orderId,
      type: 'product',
      customerName,
      customerEmail,
      stripeSessionId: fullSession.id,
      items,
      amountTotal: totalAmount,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    });
    saveDB(db);

    // Build shipping address from collected_information (this Stripe API version's structure)
    const shippingDetails = fullSession.collected_information?.shipping_details;
    const shippingAddress = shippingDetails
      ? [
          shippingDetails.address?.line1,
          shippingDetails.address?.city,
          shippingDetails.address?.state,
          shippingDetails.address?.country,
        ].filter(Boolean).join(', ')
      : undefined;

    await Promise.allSettled([
      sendOrderConfirmationToCustomer({ customerName, customerEmail, items, totalAmount, orderId }),
      sendNewOrderNotificationToOwner({ customerName, customerEmail, items, totalAmount, orderId, shippingAddress }),
    ]);
  }

  return NextResponse.json({ received: true });
}
