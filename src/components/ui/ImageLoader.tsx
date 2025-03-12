'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ImageLoaderProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  grayscale?: boolean;
  style?: React.CSSProperties;
}

const ImageLoader = ({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = fill ? '(max-width: 768px) 100vw, 50vw' : undefined,
  priority = false,
  className = '',
  grayscale = true,
  style = {}
}: ImageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ 
      minHeight: fill ? '100%' : undefined,
      height: fill ? '100%' : undefined,
      ...style
    }}>
      {/* Loading skeleton */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-[#f4f3f0]"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{ 
            opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            backgroundPosition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            background: 'linear-gradient(90deg, #f4f3f0, #e5e2d9, #f4f3f0)',
            backgroundSize: '200% 100%'
          }}
        />
      )}

      {/* Actual image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={`
          ${isLoading ? 'opacity-0' : 'opacity-100'} 
          transition-opacity duration-500
          ${grayscale ? 'grayscale hover:grayscale-0 transition-all duration-700' : ''}
          ${fill ? 'object-cover' : ''}
        `}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default ImageLoader; 