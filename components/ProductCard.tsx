'use client';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Clock, Package } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const categoryColors: Record<string, string> = {
    organizers: 'bg-blue-100 text-blue-700',
    'cable-management': 'bg-green-100 text-green-700',
    decorative: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-400">Photo coming soon</p>
          </div>
        </div>
        <span className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full ${categoryColors[product.category] || 'bg-gray-100 text-gray-600'}`}>
          {product.category.replace('-', ' ')}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.features.slice(0, 3).map(f => (
            <span key={f} className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full border border-gray-100">{f}</span>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{product.leadTime}</span>
          <span>{product.materials.join(' / ')}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium text-sm transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
