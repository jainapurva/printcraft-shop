'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { COLOR_HEX } from '@/lib/products';

interface ColorizedProductImageProps {
  originalSrc: string;
  transparentSrc?: string;
  selectedColor?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}

const LIGHT_COLORS = new Set(['White', 'Marble', 'Pink Light', 'Pastel Green', 'Yellow']);

export default function ColorizedProductImage({
  originalSrc,
  transparentSrc,
  selectedColor,
  alt,
  sizes,
  priority = false,
}: ColorizedProductImageProps) {
  const hexColor = selectedColor ? COLOR_HEX[selectedColor] : undefined;
  const canColorize = !!(transparentSrc && hexColor);

  // Preload the mask image to prevent flash on first render
  useEffect(() => {
    if (transparentSrc) {
      const img = new window.Image();
      img.src = transparentSrc;
    }
  }, [transparentSrc]);

  if (!canColorize) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={originalSrc}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </div>
    );
  }

  const isLight = selectedColor ? LIGHT_COLORS.has(selectedColor) : false;

  return (
    <div className={`relative w-full h-full ${isLight ? 'bg-[#f0f0f0]' : 'bg-white'}`}>
      {/* Layer 1: Color fill, masked to product shape only */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          backgroundColor: hexColor,
          WebkitMaskImage: `url(${transparentSrc})`,
          maskImage: `url(${transparentSrc})`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        } as React.CSSProperties}
      />

      {/* Layer 2: Grayscale product for detail/shadows, multiply blended */}
      <Image
        src={transparentSrc}
        alt={alt}
        fill
        className="object-contain mix-blend-multiply"
        style={{ filter: 'grayscale(1) brightness(1.1) contrast(1.05)' }}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
