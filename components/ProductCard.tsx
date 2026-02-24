'use client';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Clock } from 'lucide-react';
import { trackEvent } from '@/lib/useAnalytics';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const categoryColors: Record<string, string> = {
    organizers: 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20',
    'cable-management': 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20',
    decorative: 'bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20',
    functional: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20',
  };

  const handleAddToCart = () => {
    addItem(product);
    trackEvent('add_to_cart', { productId: product.id, productName: product.name, price: product.price });
  };

  const handleView = () => {
    trackEvent('product_viewed', { productId: product.id, productName: product.name, category: product.category });
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100" onClick={handleView}>
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm ${categoryColors[product.category] || 'bg-gray-100 text-gray-600'}`}>
          {product.category.replace('-', ' ')}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1.5">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.features.slice(0, 3).map(f => (
            <span key={f} className="text-[11px] bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full font-medium">{f}</span>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{product.leadTime}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{product.materials.join(' / ')}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-orange-500/25 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
