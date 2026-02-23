'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Lock } from 'lucide-react';
import { useState } from 'react';
import { trackEvent } from '@/lib/useAnalytics';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pendingOrder, setPendingOrder] = useState<string | null>(null);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setLoading(true);
    setError('');
    trackEvent('checkout_started', { itemCount: items.length, total });
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ productName: i.product.name, price: i.product.price, quantity: i.quantity })),
          customerEmail: email,
          customerName: name,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.paymentPending) {
        clearCart();
        setPendingOrder(data.orderId);
      } else {
        setError('Failed to start checkout. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (pendingOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="text-5xl mb-4">📋</div>
        <h2 className="text-2xl font-bold mb-2">Order Received!</h2>
        <p className="text-gray-500 mb-2">Your order <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">{pendingOrder}</code> has been saved.</p>
        <p className="text-gray-400 text-sm mb-6">Online payments are coming soon. We&apos;ll reach out to you shortly to arrange payment and confirm your order.</p>
        <Link href="/shop" className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">Continue Shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products to get started.</p>
        <Link href="/shop" className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">📦</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{product.leadTime} lead time · {product.materials[0]}</p>
                <div className="flex items-center gap-3 mt-3">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"><Minus className="w-3 h-3" /></button>
                  <span className="font-semibold w-6 text-center">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"><Plus className="w-3 h-3" /></button>
                  <button onClick={() => removeItem(product.id)} className="ml-auto text-red-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-lg">${(product.price * quantity).toFixed(2)}</p>
                <p className="text-xs text-gray-400">${product.price.toFixed(2)} each</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-20">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Shipping</span><span className="text-green-600">Calculated at checkout</span></div>
            <div className="border-t border-gray-100 my-4" />
            <div className="flex justify-between font-bold text-lg mb-6"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <form onSubmit={handleCheckout} className="space-y-3">
              <input required type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              <input required type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" />
                {loading ? 'Processing...' : 'Place Order'}
              </button>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                <Lock className="w-3 h-3" /> Secured checkout
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
