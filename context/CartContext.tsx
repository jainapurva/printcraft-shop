'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '@/lib/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

function cartKey(productId: string, color?: string) {
  return color ? `${productId}::${color}` : productId;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, color?: string) => void;
  removeItem: (productId: string, color?: string) => void;
  updateQuantity: (productId: string, color: string | undefined, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, color?: string) => {
    setItems(prev => {
      const key = cartKey(product.id, color);
      const existing = prev.find(i => cartKey(i.product.id, i.selectedColor) === key);
      if (existing) return prev.map(i => cartKey(i.product.id, i.selectedColor) === key ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product, quantity: 1, selectedColor: color }];
    });
  }, []);

  const removeItem = useCallback((productId: string, color?: string) => {
    const key = cartKey(productId, color);
    setItems(prev => prev.filter(i => cartKey(i.product.id, i.selectedColor) !== key));
  }, []);

  const updateQuantity = useCallback((productId: string, color: string | undefined, quantity: number) => {
    const key = cartKey(productId, color);
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => cartKey(i.product.id, i.selectedColor) !== key));
    } else {
      setItems(prev => prev.map(i => cartKey(i.product.id, i.selectedColor) === key ? { ...i, quantity } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
