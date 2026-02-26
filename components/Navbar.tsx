'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useSession, signIn, signOut } from 'next-auth/react';
import { ShoppingCart, Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const NAV_LINKS = [
  { label: '3D Printing', href: '/#shop' },
  { label: 'Robotics', href: '/robotics', badge: 'Soon' },
  { label: 'Custom Print', href: '/#custom' },
  { label: 'Support', href: '/#faq' },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-white">
            <Image src="/logo.png" alt="Appy's Studio" width={36} height={36} className="rounded-md" />
            Appy&apos;s Studio
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link key={link.label} href={link.href} className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 font-medium transition-all text-sm flex items-center gap-1.5">
                {link.label}
                {'badge' in link && link.badge && (
                  <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded-full ring-1 ring-purple-500/30">{link.badge}</span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {session?.user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/10 transition-all"
                >
                  {session.user.image ? (
                    <Image src={session.user.image} alt="" width={32} height={32} className="rounded-full ring-2 ring-purple-500/50" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">
                      {session.user.name?.[0]?.toUpperCase() || '?'}
                    </div>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-800">
                      <p className="text-sm font-semibold text-white truncate">{session.user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link href="/account" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                        <LayoutDashboard className="w-4 h-4" /> My Account
                      </Link>
                      <button onClick={() => { setUserMenuOpen(false); signOut(); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="hidden sm:flex items-center gap-2 text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 font-medium transition-all"
              >
                <User className="w-4 h-4" /> Sign In
              </button>
            )}

            <Link href="/cart" className="relative p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-purple-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold ring-2 ring-gray-950">
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
            <Link key={link.label} href={link.href} className="flex items-center gap-2 text-gray-300 hover:text-white font-medium py-2.5 px-3 rounded-lg hover:bg-white/10" onClick={() => setMenuOpen(false)}>
              {link.label}
              {'badge' in link && link.badge && (
                <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded-full ring-1 ring-purple-500/30">{link.badge}</span>
              )}
            </Link>
          ))}
          {!session?.user && (
            <button onClick={() => { setMenuOpen(false); signIn(); }} className="w-full text-left flex items-center gap-2 text-gray-300 hover:text-white font-medium py-2.5 px-3 rounded-lg hover:bg-white/10">
              <User className="w-4 h-4" /> Sign In
            </button>
          )}
          {session?.user && (
            <>
              <Link href="/account" className="block text-gray-300 hover:text-white font-medium py-2.5 px-3 rounded-lg hover:bg-white/10" onClick={() => setMenuOpen(false)}>
                <span className="flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> My Account</span>
              </Link>
              <button onClick={() => { setMenuOpen(false); signOut(); }} className="w-full text-left flex items-center gap-2 text-gray-300 hover:text-white font-medium py-2.5 px-3 rounded-lg hover:bg-white/10">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
