import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Star, Upload, CheckCircle, Package } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-amber-50 pt-16 pb-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4" />
            400+ pieces shipped and counting
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Precision 3D Prints,<br />
            <span className="text-orange-500">Built to Order</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            From desk organizers to custom STL prints — we make functional, beautiful 3D printed products with fast turnaround and real craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
              Shop Products <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/quote" className="bg-white border-2 border-gray-200 hover:border-orange-300 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" /> Upload Your STL
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '400+', label: 'Pieces Shipped' },
            { value: '3', label: 'Product Categories' },
            { value: '1-5', label: 'Day Lead Time' },
            { value: '5+', label: 'Materials Available' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-orange-400 mb-1">{s.value}</div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-1">Our most popular ready-to-ship items</p>
          </div>
          <Link href="/shop" className="text-orange-500 font-semibold hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">How It Works</h2>
          <p className="text-gray-500 text-center mb-12">Ordering is simple — whether you pick from our catalog or bring your own design.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Order from Catalog</h3>
              <ol className="space-y-2 text-gray-600 text-sm">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Browse our product catalog</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Add items to cart, choose material &amp; color</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Place your order — we start printing</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Delivered in 1-5 days</li>
              </ol>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Custom STL Print</h3>
              <ol className="space-y-2 text-gray-600 text-sm">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Upload your STL file</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Tell us material, color &amp; quantity</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />We review and send you a quote + lead time</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Approve and we start printing</li>
              </ol>
              <Link href="/quote" className="mt-5 inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="about">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">What We Print</h2>
        <p className="text-gray-500 text-center mb-12">Everything is printed fresh to order — no stale warehouse inventory.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🗂️', title: 'Organizers', desc: 'Desk organizers, drawer dividers, wall shelves, and storage solutions for every space.', href: '/shop?cat=organizers' },
            { icon: '🔌', title: 'Cable Management', desc: 'Cable clips, raceways, monitor spines — keep your workspace tidy and cable-free.', href: '/shop?cat=cable-management' },
            { icon: '🎨', title: 'Decorative', desc: 'Geometric vases, wall art panels, planters, and unique decor pieces for modern spaces.', href: '/shop?cat=decorative' },
          ].map(c => (
            <Link key={c.title} href={c.href} className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all">
              <div className="text-4xl mb-3">{c.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">{c.title}</h3>
              <p className="text-gray-500 text-sm">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20 px-4" id="faq">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          {[
            { q: 'What materials do you print with?', a: 'We primarily use PLA, PETG, TPU, and ASA. PLA is great for most indoor products, PETG for moisture resistance, TPU for flexible parts, and ASA for outdoor use.' },
            { q: 'How long does printing take?', a: "Most catalog items ship in 1-5 business days. Custom prints depend on complexity — we'll tell you the exact lead time in your quote." },
            { q: 'What file formats do you accept for custom prints?', a: 'We accept STL, OBJ, and 3MF files. STL is the most common and preferred format.' },
            { q: 'Do you offer bulk/wholesale pricing?', a: 'Yes! For orders of 10+ pieces we offer volume discounts. Contact us for a custom quote.' },
            { q: 'What colors are available?', a: 'We stock 20+ colors for most materials including black, white, grey, red, blue, green, orange, and more. Some specialty colors may require a small upcharge.' },
          ].map((faq, i) => (
            <div key={i} className="bg-white rounded-xl p-6 mb-3 border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
              <p className="text-gray-500 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Ready to print something amazing?</h2>
        <p className="text-orange-100 mb-8 max-w-xl mx-auto">Browse our catalog or upload your own design. Fast turnaround, great quality.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="bg-white text-orange-500 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors">Shop Now</Link>
          <Link href="/quote" className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-400 transition-colors">Custom Quote</Link>
        </div>
      </section>
    </div>
  );
}
