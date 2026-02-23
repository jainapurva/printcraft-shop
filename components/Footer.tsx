import Link from 'next/link';
import { Printer, Mail, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-3">
              <Printer className="w-6 h-6 text-orange-400" />
              PrintCraft
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              High-quality 3D printed products made to order. From desk organizers to custom STL prints — we&apos;ve shipped 400+ pieces and counting.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="mailto:hello@printcraft.co" className="hover:text-orange-400 transition-colors"><Mail className="w-5 h-5" /></a>
              <a href="#" className="hover:text-orange-400 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-orange-400 transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop?cat=organizers" className="hover:text-orange-400 transition-colors">Organizers</Link></li>
              <li><Link href="/shop?cat=cable-management" className="hover:text-orange-400 transition-colors">Cable Management</Link></li>
              <li><Link href="/shop?cat=decorative" className="hover:text-orange-400 transition-colors">Decorative</Link></li>
              <li><Link href="/quote" className="hover:text-orange-400 transition-colors">Custom Print</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Info</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link href="/#faq" className="hover:text-orange-400 transition-colors">FAQ</Link></li>
              <li><a href="mailto:hello@printcraft.co" className="hover:text-orange-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
          <p>&copy; 2025 PrintCraft. All rights reserved.</p>
          <p>Made with precision, printed with care.</p>
        </div>
      </div>
    </footer>
  );
}
