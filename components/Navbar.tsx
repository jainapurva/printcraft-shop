'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Menu, X, Printer } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-orange-500">
            <Printer className="w-6 h-6" />
            PrintCraft
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Shop</Link>
            <Link href="/quote" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Custom Print</Link>
            <Link href="/#about" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">About</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link href="/shop" className="block text-gray-700 font-medium py-2" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="/quote" className="block text-gray-700 font-medium py-2" onClick={() => setMenuOpen(false)}>Custom Print</Link>
          <Link href="/#about" className="block text-gray-700 font-medium py-2" onClick={() => setMenuOpen(false)}>About</Link>
        </div>
      )}
    </nav>
  );
}
