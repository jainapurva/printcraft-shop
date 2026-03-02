'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Clock, ChevronLeft, ChevronRight, Package, Check } from 'lucide-react';
import { Product, COLOR_HEX } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { trackEvent } from '@/lib/useAnalytics';
import ColorizedProductImage from '@/components/ColorizedProductImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('');

  const images = product?.images?.length ? product.images : product ? [product.image] : [];

  // Reset state when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setAddedToCart(false);
    setSelectedColor(product?.colors?.[0] || '');
  }, [product?.id, product?.colors]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [product]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!product) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') setSelectedImageIndex(i => (i > 0 ? i - 1 : images.length - 1));
    if (e.key === 'ArrowRight') setSelectedImageIndex(i => (i < images.length - 1 ? i + 1 : 0));
  }, [product, onClose, images.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, selectedColor || undefined);
    trackEvent('add_to_cart', { productId: product.id, productName: product.name, price: product.price, color: selectedColor });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const prevImage = () => setSelectedImageIndex(i => (i > 0 ? i - 1 : images.length - 1));
  const nextImage = () => setSelectedImageIndex(i => (i < images.length - 1 ? i + 1 : 0));

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white transition-all shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image Gallery */}
              <div className="md:w-1/2 p-4 sm:p-6">
                {/* Main image */}
                <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedImageIndex}-${selectedColor}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0"
                    >
                      {selectedImageIndex === 0 && selectedColor && product.transparentImage ? (
                        <ColorizedProductImage
                          originalSrc={images[0]}
                          transparentSrc={product.transparentImage}
                          selectedColor={selectedColor}
                          alt={`${product.name} in ${selectedColor}`}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                      ) : (
                        <Image
                          src={images[selectedImageIndex]}
                          alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Color preview label */}
                  {selectedImageIndex === 0 && selectedColor && product.transparentImage && (
                    <div className="absolute top-2.5 left-2.5 z-[3] flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-full pointer-events-none">
                      <span
                        className="w-2.5 h-2.5 rounded-full ring-1 ring-white/30"
                        style={{ backgroundColor: COLOR_HEX[selectedColor] || '#ccc' }}
                      />
                      Color preview
                    </div>
                  )}

                  {/* Navigation arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-[2] w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:bg-white transition-all shadow-md"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-[2] w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:bg-white transition-all shadow-md"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  {images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[2] bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                      {selectedImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                          idx === selectedImageIndex
                            ? 'ring-2 ring-purple-500 ring-offset-2'
                            : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 p-5 sm:p-6 md:py-8 md:pr-8 md:pl-2 flex flex-col">
                {/* Category */}
                <span className="inline-block text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full w-fit mb-3">
                  {product.category.replace('-', ' ')}
                </span>

                {/* Name */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="text-3xl font-extrabold text-gray-900 mb-4">
                  ${product.price.toFixed(2)}
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Features</h3>
                  <ul className="space-y-1.5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {product.leadTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Package className="w-4 h-4" />
                    {product.materials.join(', ')}
                  </span>
                </div>

                {/* Color picker */}
                {product.colors?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Color{selectedColor && <span className="font-normal text-gray-500"> — {selectedColor}</span>}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          title={color}
                          className={`w-9 h-9 rounded-full transition-all flex items-center justify-center ${
                            selectedColor === color
                              ? 'ring-2 ring-purple-500 ring-offset-2 scale-110'
                              : 'hover:scale-110 ring-1 ring-gray-200'
                          }`}
                          style={{ backgroundColor: COLOR_HEX[color] || '#ccc' }}
                        >
                          {selectedColor === color && (
                            <Check className={`w-4 h-4 ${['White', 'Marble', 'Pink Light', 'Pastel Green', 'Yellow'].includes(color) ? 'text-gray-700' : 'text-white'}`} strokeWidth={3} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stock status */}
                <div className="mb-6">
                  {product.inStock ? (
                    <span className="text-sm text-green-600 font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-sm text-red-500 font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Add to Cart */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-base transition-all active:scale-[0.98] ${
                      addedToCart
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                        : product.inStock
                          ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {addedToCart ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
