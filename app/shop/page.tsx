'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, categories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCat);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop All Products</h1>
        <p className="text-gray-500">Browse our catalog of ready-to-print items — made fresh to order.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
              activeCategory === c.id
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">No products found in this category.</div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
