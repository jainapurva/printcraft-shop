'use client';

type EventType = 'page_view' | 'product_viewed' | 'add_to_cart' | 'checkout_started' | 'order_completed' | 'quote_submitted';

export function trackEvent(type: EventType, data: Record<string, string | number | undefined> = {}) {
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data }),
  }).catch(() => {});
}
