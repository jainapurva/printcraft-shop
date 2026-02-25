import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey || stripeKey === 'sk_test_placeholder') {
    // Payments not yet configured — save order manually
    const { items, customerEmail, customerName } = await req.json();
    const { getDB, saveDB } = await import('@/lib/orders');
    const db = getDB();
    const orderId = `ORD-${Date.now()}`;
    db.orders.push({
      id: orderId,
      type: 'product',
      customerName,
      customerEmail,
      items,
      status: 'pending_payment',
      createdAt: new Date().toISOString(),
      note: 'Payment pending — Stripe not yet configured',
    });
    saveDB(db);
    return NextResponse.json({ url: null, orderId, paymentPending: true });
  }

  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeKey, { apiVersion: '2026-01-28.clover' });
    const { items, customerEmail, customerName, shippingAddress } = await req.json();

    const lineItems = items.map((item: { productName: string; price: number; quantity: number }) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.productName, description: "3D Printed Product by Appy's Studio" },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail,
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'AU', 'IN'] },
      metadata: { customerName, shippingAddress: shippingAddress || '' },
      success_url: `${baseUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
