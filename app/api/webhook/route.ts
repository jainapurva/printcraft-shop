import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getDB, saveDB } from '@/lib/orders';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const db = getDB();
    const order = {
      id: `ORD-${session.id}`,
      type: 'product',
      customerName: session.metadata?.customerName || 'Unknown',
      customerEmail: session.customer_email || '',
      stripeSessionId: session.id,
      amountTotal: (session.amount_total || 0) / 100,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    db.orders.push(order);
    saveDB(db);
  }

  return NextResponse.json({ received: true });
}
