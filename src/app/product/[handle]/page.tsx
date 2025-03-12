'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Heart, Minus, Plus, Check, ArrowRight, AlertTriangle } from 'lucide-react';
import { useSimpleCartStore, useWishlistStore, useCartStore } from '@/lib/store';
import { getProductByHandle, normalizeProduct } from '@/lib/shopify';
import ImageLoader from '@/components/ui/ImageLoader';
import usePageLoading from '@/hooks/usePageLoading';

export default function ProductPage({ params }: { params: { handle: string } }) {
  const { handle } = params;
  const { addToCart } = useSimpleCartStore();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlistStore();
  const shopifyCart = useCartStore();
  
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  
  // Helper function to safely get metafields
  const getMetafield = (key: string, namespace?: string, defaultValue: string = ''): string => {
    try {
      if (!product || !product.metafields) return defaultValue;
      
      // Case 1: Metafields is an array
      if (Array.isArray(product.metafields)) {
        const metafield = namespace 
          ? product.metafields.find((m: any) => m.namespace === namespace && m.key === key)
          : product.metafields.find((m: any) => m.key === key);
        
        return metafield?.value || defaultValue;
      }
      
      // Case 2: Metafields is an object with keys in format "namespace_key"
      if (typeof product.metafields === 'object') {
        const metafieldKey = namespace ? `${namespace}_${key}` : key;
        return product.metafields[metafieldKey] || defaultValue;
      }
      
      return defaultValue;
    } catch (error) {
      console.error(`Error getting metafield ${namespace ? namespace + '_' : ''}${key}:`, error);
      return defaultValue;
    }
  };
  
  // Helper function to get feature metafields
  const getFeatureMetafields = (): Array<{value: string}> => {
    try {
      if (!product || !product.metafields) return [];
      
      // Case 1: Metafields is an array
      if (Array.isArray(product.metafields)) {
        return product.metafields.filter((m: any) => m && m.namespace === 'features');
      }
      
      // Case 2: Metafields is an object with keys in format "namespace_key"
      if (typeof product.metafields === 'object') {
        const features: Array<{value: string}> = [];
        
        // Extract features from object format
        Object.entries(product.metafields).forEach(([key, value]) => {
          if (key.startsWith('features_') && value) {
            features.push({ value: value as string });
          }
        });
        
        return features;
      }
      
      return [];
    } catch (error) {
      console.error('Error getting feature metafields:', error);
      return [];
    }
  };
  
  // Use the page loading hook
  usePageLoading(isLoading, 'thread');
  
  // Fetch product data from Shopify
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product with handle: ${handle}`);
        const productData = await getProductByHandle(handle);
        
        if (!productData) {
          console.error(`Product not found with handle: ${handle}`);
          setError('Product not found. Please check the URL and try again.');
          setIsLoading(false);
          return;
        }
        
        console.log('Product data received:', productData);
        const normalizedProduct = normalizeProduct(productData);
        setProduct(normalizedProduct);
        
        // Set default selected variant
        if (normalizedProduct && normalizedProduct.variants && normalizedProduct.variants.length > 0) {
          setSelectedVariant(normalizedProduct.variants[0]);
          
          // Set default selected options
          const defaultOptions: Record<string, string> = {};
          normalizedProduct.variants[0].selectedOptions.forEach((option: any) => {
            defaultOptions[option.name] = option.value;
          });
          setSelectedOptions(defaultOptions);
        }
        
        setIsLoading(false);
      } catch (error: any) {
        console.error('Error fetching product:', error);
        setError(error.message || 'Failed to load product. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [handle]);
  
  // If product is still loading, show a loading state
  if (isLoading) {
    return null; // The loading state is handled by the usePageLoading hook
  }
  
  // If there was an error, show an error message
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/collection" className="text-[#8a8778] hover:text-[#2c2c27] transition-colors text-sm">
            ← Back to Collection
          </Link>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertTriangle className="h-16 w-16 text-[#8a8778] mb-4" />
          <h1 className="text-2xl font-serif font-bold text-[#2c2c27] mb-4">Product Not Found</h1>
          <p className="text-[#5c5c52] mb-6 max-w-md">{error}</p>
          <Link 
            href="/collection" 
            className="px-6 py-3 bg-[#2c2c27] text-white font-medium rounded hover:bg-[#3d3d35] transition-colors"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }
  
  // If product is not available (but no error occurred), show a loading state
  if (!product) {
    return null;
  }
  
  const inWishlist = isInWishlist(product.id);
  
  const handleAddToCart = () => {
    // Use Shopify cart if enabled
    if (process.env.NEXT_PUBLIC_USE_SHOPIFY_CART === 'true' && shopifyCart) {
      shopifyCart.addItem({
        productId: product.id,
        variantId: selectedVariant.id,
        title: product.title,
        handle: product.handle,
        image: product.images[0]?.url || '',
        price: selectedVariant.price,
        quantity,
        currencyCode: selectedVariant.currencyCode || 'USD'
      });
    } else {
      // Use simple cart
      addToCart({
        id: product.id,
        name: product.title,
        price: selectedVariant.price,
        image: product.images[0]?.url || '',
        variantId: selectedVariant.id,
        quantity
      });
    }
  };
  
  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.title,
        price: selectedVariant.price,
        image: product.images[0]?.url || '',
        handle: product.handle,
        material: getMetafield('material', undefined, ''),
        variantId: selectedVariant.id
      });
    }
  };
  
  const handleOptionChange = (optionName: string, optionValue: string) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [optionName]: optionValue
    };
    
    setSelectedOptions(newSelectedOptions);
    
    // Find the variant that matches all selected options
    const matchingVariant = product.variants.find((variant: any) => {
      return variant.selectedOptions.every((option: any) => {
        return newSelectedOptions[option.name] === option.value;
      });
    });
    
    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
    }
  };
  
  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setZoomPosition({ x, y });
  };
  
  // Group variants by option
  const optionGroups: Record<string, string[]> = {};
  
  if (product.variants) {
    product.variants.forEach((variant: any) => {
      variant.selectedOptions.forEach((option: any) => {
        if (!optionGroups[option.name]) {
          optionGroups[option.name] = [];
        }
        
        if (!optionGroups[option.name].includes(option.value)) {
          optionGroups[option.name].push(option.value);
        }
      });
    });
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/collection" className="text-[#8a8778] hover:text-[#2c2c27] transition-colors text-sm">
          ← Back to Collection
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          {/* Main Image */}
          <div 
            className="relative aspect-[3/4] bg-[#f4f3f0] overflow-hidden mb-4 cursor-zoom-in"
            onClick={() => setIsZoomed(!isZoomed)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                <ImageLoader
                  src={product.images[currentImageIndex]?.url || ''}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  grayscale={false}
                  className={`h-full ${isZoomed ? 'scale-150' : ''}`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                        }
                      : {}
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image: any, index: number) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={`relative aspect-square bg-[#f4f3f0] overflow-hidden ${
                  currentImageIndex === index ? 'ring-2 ring-[#2c2c27]' : 'ring-1 ring-[#e5e2d9]'
                }`}
              >
                <ImageLoader
                  src={image.url}
                  alt={`${product.title} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 25vw, 12vw"
                  grayscale={currentImageIndex !== index}
                  className="h-full"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#2c2c27] mb-2">
            {product.title}
          </h1>
          
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating || 0) ? 'fill-[#8a8778] text-[#8a8778]' : 'text-[#e5e2d9]'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-[#8a8778]">
              {product.reviews || 0} reviews
            </span>
          </div>
          
          <div className="mb-6">
            <span className="text-2xl font-medium text-[#2c2c27]">
              ₹{selectedVariant?.price || product.price}
            </span>
          </div>
          
          <div className="prose prose-sm text-[#5c5c52] mb-8">
            <p>{product.description}</p>
          </div>
          
          {/* Product Options */}
          {Object.entries(optionGroups).map(([optionName, optionValues]) => (
            <div key={optionName} className="mb-6">
              <h3 className="text-sm font-medium text-[#2c2c27] mb-3">
                {optionName}
              </h3>
              <div className="flex flex-wrap gap-2">
                {optionValues.map((optionValue) => (
                  <button
                    key={optionValue}
                    onClick={() => handleOptionChange(optionName, optionValue)}
                    className={`px-4 py-2 border ${
                      selectedOptions[optionName] === optionValue
                        ? 'border-[#2c2c27] bg-[#2c2c27] text-white'
                        : 'border-[#e5e2d9] text-[#2c2c27] hover:bg-[#f4f3f0]'
                    } transition-colors`}
                  >
                    {optionValue}
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          {/* Quantity Selector */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-[#2c2c27] mb-3">
              Quantity
            </h3>
            <div className="flex items-center border border-[#e5e2d9] inline-block">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-[#2c2c27] hover:bg-[#f4f3f0] transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 text-[#2c2c27] min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-[#2c2c27] hover:bg-[#f4f3f0] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Add to Cart and Wishlist */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#2c2c27] text-[#f4f3f0] py-3 px-6 text-sm uppercase tracking-wider hover:bg-[#3d3d35] transition-colors flex items-center justify-center"
              disabled={!selectedVariant?.availableForSale}
            >
              {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            <button
              onClick={handleWishlist}
              className={`flex items-center justify-center py-3 px-6 border ${
                inWishlist
                  ? 'bg-[#2c2c27] text-[#f4f3f0] border-[#2c2c27]'
                  : 'bg-transparent text-[#2c2c27] border-[#2c2c27] hover:bg-[#f4f3f0]'
              } transition-colors`}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={inWishlist ? 'fill-[#f4f3f0]' : ''} />
            </button>
          </div>
          
          {/* Product Features */}
          <div className="border-t border-[#e5e2d9] pt-8 mb-8">
            <h3 className="font-serif text-lg text-[#2c2c27] mb-4">Features</h3>
            <ul className="space-y-2">
              {getFeatureMetafields().map((feature: any, index: number) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-[#8a8778] mr-2 shrink-0 mt-0.5" />
                  <span className="text-[#5c5c52]">{feature.value}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Product Details */}
          <div className="border-t border-[#e5e2d9] pt-8">
            <h3 className="font-serif text-lg text-[#2c2c27] mb-4">Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-[#2c2c27] mb-1">Material</h4>
                <p className="text-[#5c5c52]">
                  {getMetafield('material', undefined, 'Premium Fabric')}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#2c2c27] mb-1">Care</h4>
                <p className="text-[#5c5c52]">
                  {getMetafield('care', undefined, 'Dry clean only')}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#2c2c27] mb-1">Origin</h4>
                <p className="text-[#5c5c52]">
                  {getMetafield('origin', undefined, 'Imported')}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#2c2c27] mb-1">Style</h4>
                <p className="text-[#5c5c52]">
                  {getMetafield('style', undefined, 'Classic Fit')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-16 pt-12 border-t border-[#e5e2d9]">
        <h2 className="font-serif text-2xl text-[#2c2c27] mb-8 text-center">You May Also Like</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {product.relatedProducts?.slice(0, 4).map((relatedProduct: any) => (
            <div key={relatedProduct.id} className="group">
              <Link href={`/product/${relatedProduct.handle}`} className="block">
                <div className="relative aspect-[3/4] bg-[#f4f3f0] overflow-hidden mb-4">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h3 className="font-serif text-[#2c2c27] group-hover:text-[#8a8778] transition-colors">
                  {relatedProduct.name}
                </h3>
                <p className="text-[#8a8778] mt-1">₹{relatedProduct.price}</p>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            href="/collection"
            className="inline-flex items-center text-[#2c2c27] hover:text-[#8a8778] transition-colors"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
} 