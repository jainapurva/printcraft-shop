'use client';
import Image from 'next/image';
import { Product, COLOR_HEX } from '@/lib/products';
import { useSession } from 'next-auth/react';
import { ShoppingCart, Clock, Heart } from 'lucide-react';
import { trackEvent } from '@/lib/useAnalytics';
import { useState, useEffect } from 'react';

export default function ProductCard({ product, onSelect }: { product: Product; onSelect?: (product: Product) => void }) {
  const { data: session } = useSession();
  const [inWatchlist, setInWatchlist] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      fetch('/api/user/watchlist')
        .then(r => r.json())
        .then(data => {
          if (data.watchlist?.includes(product.id)) setInWatchlist(true);
        })
        .catch(() => {});
    }
  }, [session, product.id]);

  const toggleWatchlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session?.user || watchlistLoading) return;
    setWatchlistLoading(true);
    try {
      const res = await fetch('/api/user/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id }),
      });
      const data = await res.json();
      setInWatchlist(data.watchlist.includes(product.id));
    } catch {}
    setWatchlistLoading(false);
  };

  const categoryColors: Record<string, string> = {
    organizers: 'bg-purple-500/10 text-purple-300 ring-1 ring-purple-500/20',
    'cable-management': 'bg-purple-500/10 text-purple-300 ring-1 ring-purple-500/20',
    decorative: 'bg-purple-500/10 text-purple-300 ring-1 ring-purple-500/20',
    functional: 'bg-purple-500/10 text-purple-300 ring-1 ring-purple-500/20',
  };

  const handleAddToCart = () => {
    // Open modal so user can pick a color
    onSelect?.(product);
  };

  const handleView = () => {
    trackEvent('product_viewed', { productId: product.id, productName: product.name, category: product.category });
    onSelect?.(product);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer" onClick={handleView}>
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
        {session?.user && (
          <button
            onClick={toggleWatchlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-sm ${
              inWatchlist
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white opacity-0 group-hover:opacity-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWatchlist ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1.5">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.features.slice(0, 3).map(f => (
            <span key={f} className="text-[11px] bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full font-medium">{f}</span>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{product.leadTime}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{product.materials.join(' / ')}</span>
        </div>

        {/* Color swatches */}
        {product.colors?.length > 0 && (
          <div className="flex items-center gap-1.5 mb-4">
            {product.colors.slice(0, 7).map(color => (
              <span
                key={color}
                className="w-4 h-4 rounded-full ring-1 ring-gray-200 hover:scale-125 transition-transform cursor-pointer"
                style={{ backgroundColor: COLOR_HEX[color] || '#ccc' }}
                title={color}
              />
            ))}
            {product.colors.length > 7 && (
              <span className="text-[10px] text-gray-400 font-medium ml-0.5">+{product.colors.length - 7}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-purple-500/25 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
