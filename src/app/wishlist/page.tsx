'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, X, ShoppingBag, Check } from 'lucide-react';
import { useSimpleCartStore, useWishlistStore } from '@/lib/store';
import { useCustomer } from '@/components/providers/CustomerProvider';
import Loader from '@/components/ui/loader';
import { motion } from 'framer-motion';

// Sample wishlist data (would normally be stored in a database or localStorage)
const sampleWishlistItems = [
  {
    id: 'prod_1',
    name: 'Oxford Dress Shirt',
    price: '4999.00',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80',
    handle: 'oxford-dress-shirt',
    material: 'Egyptian Cotton',
    variantId: 'var_1',
  },
  {
    id: 'prod_7',
    name: 'Wool Dress Pants',
    price: '5999.00',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80',
    handle: 'wool-dress-pants',
    material: 'Italian Wool',
    variantId: 'var_7',
  },
  {
    id: 'prod_13',
    name: 'Pima Cotton Polo',
    price: '3499.00',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80',
    handle: 'pima-cotton-polo',
    material: 'Pima Cotton',
    variantId: 'var_13',
  },
];

export default function WishlistPage() {
  const { addToCart, toggleCart } = useSimpleCartStore();
  const { items: wishlistItems, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { isAuthenticated, isLoading: customerLoading } = useCustomer();
  const [isLoading, setIsLoading] = useState(true);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  
  // Simulate loading delay
  useEffect(() => {
    if (!customerLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [customerLoading]);
  
  // Add item to cart and optionally remove from wishlist
  const handleAddToCart = (item: typeof wishlistItems[0], removeAfterAdd: boolean = false) => {
    // Map wishlist item properties to cart item properties according to useSimpleCartStore interface
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      variantId: item.variantId,
      quantity: 1
    });
    
    // Show visual feedback
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    
    // Reset visual feedback after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
    
    if (removeAfterAdd) {
      removeFromWishlist(item.id);
    }
  };
  
  // Add all items to cart
  const addAllToCart = () => {
    wishlistItems.forEach(item => {
      handleAddToCart(item);
    });
    
    // Open cart after adding all items
    setTimeout(() => {
      toggleCart();
    }, 500);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 font-serif text-3xl font-bold text-[#2c2c27]">
        My Wishlist
      </h1>
      
      {isAuthenticated ? (
        isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader size="lg" color="#8a8778" />
          </div>
        ) : (
          <>
            {wishlistItems.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mb-6 flex justify-center">
                  <Heart className="h-16 w-16 text-[#e5e2d9]" />
                </div>
                <h2 className="mb-4 font-serif text-2xl font-bold text-[#2c2c27]">
                  Your Wishlist is Empty
                </h2>
                <p className="mb-8 text-[#5c5c52]">
                  Browse our collections and add your favorite items to your wishlist.
                </p>
                <Link
                  href="/collection"
                  className="inline-block border border-[#2c2c27] px-6 py-3 text-sm uppercase tracking-wider text-[#2c2c27] transition-colors hover:bg-[#f4f3f0]"
                >
                  Browse Collections
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[#5c5c52]">
                    {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={addAllToCart}
                      className="flex items-center bg-[#2c2c27] px-6 py-3 text-sm uppercase tracking-wider text-[#f4f3f0] transition-colors hover:bg-[#3d3d35]"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Add All to Cart
                    </button>
                    <button
                      onClick={clearWishlist}
                      className="border border-[#2c2c27] px-6 py-3 text-sm uppercase tracking-wider text-[#2c2c27] transition-colors hover:bg-[#f4f3f0]"
                    >
                      Clear Wishlist
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="border-b border-[#e5e2d9]">
                      <tr>
                        <th className="py-4 text-left font-serif text-[#2c2c27]">Product</th>
                        <th className="py-4 text-left font-serif text-[#2c2c27]">Price</th>
                        <th className="py-4 text-center font-serif text-[#2c2c27]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5e2d9]">
                      {wishlistItems.map((item) => (
                        <tr key={item.id} className="group">
                          <td className="py-6">
                            <div className="flex items-center">
                              <div className="relative mr-4 h-24 w-20 overflow-hidden bg-[#f4f3f0]">
                                <Link href={`/product/${item.handle}`}>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    sizes="(max-width: 768px) 80px, 120px"
                                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                  />
                                </Link>
                              </div>
                              <div>
                                <Link 
                                  href={`/product/${item.handle}`}
                                  className="font-serif text-lg text-[#2c2c27] hover:text-[#8a8778] transition-colors"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-sm text-[#8a8778]">{item.material}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-6 font-medium text-[#2c2c27]">
                            ₹{item.price}
                          </td>
                          <td className="py-6">
                            <div className="flex items-center justify-center space-x-4">
                              <motion.button
                                onClick={() => handleAddToCart(item)}
                                className={`${addedItems[item.id] ? 'bg-[#2c2c27] text-[#f4f3f0]' : 'text-[#2c2c27]'} p-2 rounded-full transition-colors hover:text-[#8a8778]`}
                                aria-label="Add to cart"
                                whileTap={{ scale: 0.95 }}
                              >
                                {addedItems[item.id] ? (
                                  <Check className="h-5 w-5" />
                                ) : (
                                  <ShoppingBag className="h-5 w-5" />
                                )}
                              </motion.button>
                              <motion.button
                                onClick={() => removeFromWishlist(item.id)}
                                className="text-[#2c2c27] p-2 rounded-full hover:text-[#8a8778] transition-colors"
                                aria-label="Remove from wishlist"
                                whileTap={{ scale: 0.95 }}
                              >
                                <X className="h-5 w-5" />
                              </motion.button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )
      ) : (
        <div className="py-16 text-center">
          <div className="mb-6 flex justify-center">
            <Heart className="h-16 w-16 text-[#e5e2d9]" />
          </div>
          <h2 className="mb-4 font-serif text-2xl font-bold text-[#2c2c27]">
            Sign In to View Your Wishlist
          </h2>
          <p className="mb-8 text-[#5c5c52]">
            Please sign in to save and view your wishlist items.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sign-in"
              className="inline-block bg-[#2c2c27] px-6 py-3 text-sm uppercase tracking-wider text-[#f4f3f0] transition-colors hover:bg-[#3d3d35]"
            >
              Sign In
            </Link>
            <Link
              href="/collection"
              className="inline-block border border-[#2c2c27] px-6 py-3 text-sm uppercase tracking-wider text-[#2c2c27] transition-colors hover:bg-[#f4f3f0]"
            >
              Browse Collections
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 