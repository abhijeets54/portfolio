'use client';

import React, { useEffect } from 'react';
import { useSimpleCartStore } from '@/lib/store';
import Cart from './Cart';

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const { itemCount } = useSimpleCartStore();
  
  // Update page title with cart count
  useEffect(() => {
    if (itemCount > 0) {
      document.title = `👔 Ankkor (${itemCount}) | Timeless Menswear`;
    } else {
      document.title = '👔 Ankkor | Timeless Menswear';
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