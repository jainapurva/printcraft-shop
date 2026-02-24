import Link from 'next/link';
import { Printer, Mail, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 text-white font-bold text-xl mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-400 rounded-xl flex items-center justify-center">
                <Printer className="w-5 h-5 text-white" />
              </div>
              Apurva's Studio
            </div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              High-quality 3D printed products made to order. From desk organizers to custom STL prints — we&apos;ve shipped 4,000+ pieces and counting.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="mailto:appysstudioca@gmail.com" className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-xl flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-xl flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-xl flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#shop" className="hover:text-orange-400 transition-colors">All Products</Link></li>
              <li><Link href="/#how" className="hover:text-orange-400 transition-colors">How It Works</Link></li>
              <li><Link href="/#custom" className="hover:text-orange-400 transition-colors">Custom Print</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Info</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#faq" className="hover:text-orange-400 transition-colors">FAQ</Link></li>
              <li><a href="mailto:appysstudioca@gmail.com" className="hover:text-orange-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-600 flex flex-col sm:flex-row justify-between gap-2">
          <p>&copy; {new Date().getFullYear()} Apurva's Studio. All rights reserved.</p>
          <p>Made with precision, printed with care.</p>
        </div>
      </div>
    </footer>
  );
}
