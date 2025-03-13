import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useSimpleCartStore, useWishlistStore } from '@/lib/store';
import ImageLoader from '@/components/ui/ImageLoader';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  handle: string;
  rating?: number;
  reviews?: number;
  material?: string;
  isNew?: boolean;
  variantId: string;
  currencySymbol?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  handle,
  rating = 0,
  reviews = 0,
  material,
  isNew = false,
  variantId,
  currencySymbol = '$'
}: ProductCardProps) => {
  const { addToCart } = useSimpleCartStore();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlistStore();
  
  const inWishlist = isInWishlist(id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id,
      name,
      price,
      image,
      variantId,
      quantity: 1
    });
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        name,
        price,
        image,
        handle,
        material: material || '',
        variantId
      });
    }
  };
  
  return (
    <motion.div 
      className="group relative"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/product/${handle}`} className="block">
        <div className="relative overflow-hidden mb-4">
          {/* Product Image */}
          <div className="aspect-[3/4] relative bg-[#f4f3f0] overflow-hidden">
            <ImageLoader
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              animate={true}
              className="h-full"
            />
          </div>
          
          {/* Quick Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={handleWishlist}
              className={`p-2 rounded-none ${inWishlist ? 'bg-[#2c2c27]' : 'bg-[#f8f8f5]'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-5 w-5 ${inWishlist ? 'text-[#f4f3f0] fill-current' : 'text-[#2c2c27]'}`} />
            </motion.button>
            
            <motion.button
              onClick={handleAddToCart}
              className="p-2 rounded-none bg-[#2c2c27] text-[#f4f3f0]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-5 w-5" />
            </motion.button>
          </div>
          
          {/* New Badge */}
          {isNew && (
            <div className="absolute top-0 left-0 bg-[#2c2c27] text-[#f4f3f0] py-1 px-3 text-xs uppercase tracking-wider">
              New
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <h3 className="font-serif text-lg text-[#2c2c27] mb-1">{name}</h3>
          
          {material && (
            <p className="text-[#8a8778] text-xs mb-2">{material}</p>
          )}
          
          <div className="flex justify-between items-center">
            <p className="text-[#2c2c27] font-medium">{currencySymbol}{price}</p>
            
            {rating > 0 && (
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xs ${i < rating ? 'text-[#8a8778]' : 'text-[#e5e2d9]'}`}>★</span>
                  ))}
                </div>
                {reviews > 0 && (
                  <span className="text-[#8a8778] text-xs ml-1">({reviews})</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard; 