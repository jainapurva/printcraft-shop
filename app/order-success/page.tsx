import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
      <p className="text-gray-500 mb-2">Payment received. We&apos;ll start printing your order right away.</p>
      <p className="text-gray-400 text-sm mb-8">You&apos;ll receive an email confirmation with your order details and tracking info once shipped.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/shop" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-colors">Continue Shopping</Link>
        <Link href="/" className="border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-bold transition-colors">Back to Home</Link>
      </div>
    </div>
  );
}
