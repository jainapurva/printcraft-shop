import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Order Confirmed!</h1>
        <p className="text-gray-500 mb-2 leading-relaxed">Payment received. We&apos;ll start printing your order right away.</p>
        <p className="text-gray-400 text-sm mb-10">You&apos;ll receive an email confirmation with your order details and tracking info once shipped.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="bg-gradient-to-r from-purple-500 to-purple-400 text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all">Continue Shopping</Link>
          <Link href="/" className="ring-2 ring-gray-200 hover:ring-gray-300 text-gray-700 px-8 py-3.5 rounded-xl font-bold transition-all">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
