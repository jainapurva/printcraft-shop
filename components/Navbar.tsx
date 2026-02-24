'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Menu, X, Printer } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Shop', href: '/#shop' },
  { label: 'How It Works', href: '/#how' },
  { label: 'Custom Print', href: '/#custom' },
  { label: 'Support', href: '/#faq' },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-white">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-400 rounded-xl flex items-center justify-center">
              <Printer className="w-5 h-5 text-white" />
            </div>
            PrintCraft
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link key={link.label} href={link.href} className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 font-medium transition-all text-sm">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold ring-2 ring-gray-950">
                  {itemCount}
                </span>
              )}
            </Link>
            <button className="md:hidden p-2 text-gray-300 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800 px-4 py-3 space-y-1">
          {NAV_LINKS.map(link => (
            <Link key={link.label} href={link.href} className="block text-gray-300 hover:text-white font-medium py-2.5 px-3 rounded-lg hover:bg-white/10" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
