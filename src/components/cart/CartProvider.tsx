'use client';

import React, { useEffect } from 'react';
import { useSimpleCartStore } from '@/lib/store';
import Cart from './Cart';

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const { itemCount, initializeCart } = useSimpleCartStore();
  
  // Initialize cart on first load
  useEffect(() => {
    // Check if this is the first load of the application
    const isFirstLoad = sessionStorage.getItem('cartInitialized') !== 'true';
    
    if (isFirstLoad) {
      // Initialize the cart to ensure it starts empty
      initializeCart();
      // Mark that the cart has been initialized
      sessionStorage.setItem('cartInitialized', 'true');
    }
  }, [initializeCart]);
  
  // Update page title with cart count
  useEffect(() => {
    if (itemCount > 0) {
      document.title = ` Ankkor (${itemCount}) | Timeless Menswear`;
    } else {
      document.title = ' Ankkor | Timeless Menswear';
    }
  }, [itemCount]);
  
  return (
    <>
      {children}
      <Cart />
    </>
  );
};

export default CartProvider; 