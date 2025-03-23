import React from 'react';
import Image from 'next/image';

interface ImageContainerProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

/**
 * A container component that properly handles Next.js Image with fill property
 * by ensuring the parent has position: relative set
 */
const ImageContainer: React.FC<ImageContainerProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  className = '',
  imageClassName = '',
  fill = true,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
}) => {
  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ 
        position: 'relative',
        aspectRatio: aspectRatio
      }}
    >
      <Image 
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={imageClassName}
        style={{ 
          objectFit,
          objectPosition
        }}
      />
    </div>
  );
};

export default ImageContainer; 