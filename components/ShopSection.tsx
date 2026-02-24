'use client';
import { useState } from 'react';
import { Product, categories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function ShopSection({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div>
      {/* Category filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeCategory === c.id
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/25'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
