'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Truck, CreditCard } from 'lucide-react';
import { useSimpleCartStore, useCartStore } from '@/lib/store';
import { redirectToCheckout, validateCartForCheckout } from '@/lib/checkout';
import Loader from '@/components/ui/loader';

// Type for combined cart item (supports both simple cart and Shopify cart)
type CombinedCartItem = {
  id: string;
  name?: string;
  title?: string;
  price: string;
  image: string;
  handle?: string;
  variantId: string;
  quantity: number;
  currencyCode?: string;
};

// Shipping options with delivery estimates
const shippingOptions = [
  { 
    id: 'free', 
    name: 'Standard Shipping', 
    price: 0, 
    description: 'Delivery in 5-7 business days', 
    estimatedDays: '5-7',
    estimatedDelivery: () => {
      const now = new Date();
      const min = new Date(now);
      min.setDate(min.getDate() + 5);
      const max = new Date(now);
      max.setDate(max.getDate() + 7);
      return `${min.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${max.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
  },
  { 
    id: 'express', 
    name: 'Express Shipping', 
    price: 15, 
    description: 'Delivery in 2-3 business days', 
    estimatedDays: '2-3',
    estimatedDelivery: () => {
      const now = new Date();
      const min = new Date(now);
      min.setDate(min.getDate() + 2);
      const max = new Date(now);
      max.setDate(max.getDate() + 3);
      return `${min.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${max.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
  },
  { 
    id: 'overnight', 
    name: 'Overnight Shipping', 
    price: 30, 
    description: 'Next business day delivery', 
    estimatedDays: '1',
    estimatedDelivery: () => {
      const now = new Date();
      const delivery = new Date(now);
      delivery.setDate(delivery.getDate() + 1);
      return delivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  },
];

const Cart = () => {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  
  // Use the full Shopify cart store if available, otherwise use the simple cart store
  const useShopifyCart = process.env.NEXT_PUBLIC_USE_SHOPIFY_CART === 'true';
  
  // Get cart data from the appropriate store
  const simpleCart = useSimpleCartStore();
  const shopifyCart = useCartStore();
  
  // Combine items from both stores with type safety
  const items: CombinedCartItem[] = useShopifyCart 
    ? shopifyCart.items.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        handle: item.handle,
        variantId: item.variantId,
        quantity: item.quantity,
        currencyCode: item.currencyCode
      }))
    : simpleCart.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        variantId: item.variantId,
        quantity: item.quantity
      }));
  
  const isOpen = useShopifyCart ? shopifyCart.isOpen : simpleCart.isOpen;
  const toggleCart = useShopifyCart ? shopifyCart.toggleCart : simpleCart.toggleCart;
  const itemCount = useShopifyCart ? shopifyCart.itemCount : simpleCart.itemCount;
  
  const removeFromCart = useShopifyCart 
    ? shopifyCart.removeItem 
    : simpleCart.removeFromCart;
    
  const updateQuantity = useShopifyCart 
    ? (id: string, quantity: number) => shopifyCart.updateItem(id, quantity) 
    : simpleCart.updateQuantity;
    
  const clearCart = useShopifyCart 
    ? shopifyCart.clearCart 
    : simpleCart.clearCart;
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => {
    return total + (parseFloat(item.price) * item.quantity);
  }, 0).toFixed(2);
  
  const currencyCode = useShopifyCart ? shopifyCart.currencyCode : 'INR';
  const currencySymbol = '₹';
  
  // Calculate shipping based on selected option
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0].id);
  const shipping = shippingOptions.find(option => option.id === selectedShipping)?.price || 0;
  
  // Calculate estimated tax (for demonstration - typically calculated by the server)
  const [estimatedTax, setEstimatedTax] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);
  
  // Calculate total
  const total = (parseFloat(subtotal) + shipping + estimatedTax - promoDiscount).toFixed(2);
  
  // Handle shipping option change
  const handleShippingChange = (shippingId: string) => {
    setSelectedShipping(shippingId);
  };
  
  // Handle promo code application
  const applyPromoCode = () => {
    setPromoError('');
    
    // Demo promo codes
    if (promoCode.toUpperCase() === 'LOGO20') {
      // 20% off
      setPromoDiscount(parseFloat(subtotal) * 0.2);
    } else if (promoCode.toUpperCase() === 'FREESHIP') {
      // Free shipping
      setSelectedShipping('free');
    } else {
      setPromoError('Invalid promo code');
      setPromoDiscount(0);
    }
  };
  
  // Handle checkout
  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    
    try {
      if (useShopifyCart && shopifyCart.cartId) {
        // Validate cart before checkout
        const isValid = await validateCartForCheckout(shopifyCart.cartId);
        if (!isValid) {
          setCheckoutError('Some items in your cart are unavailable. Please remove them before proceeding.');
          setCheckoutLoading(false);
          return;
        }
        
        // Use Shopify checkout
        await redirectToCheckout(shopifyCart.cartId);
      } else {
        // For demo purposes, just show an alert
        alert('In a production app, this would redirect to Shopify checkout.');
        toggleCart();
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      setCheckoutError(error.message || 'There was an error processing your checkout. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };
  
  // Calculate estimated tax
  useEffect(() => {
    // Simulate tax calculation (e.g., 8% of subtotal)
    const taxRate = 0.08;
    setEstimatedTax(parseFloat(subtotal) * taxRate);
  }, [subtotal]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#2c2c27]/50 z-[100]"
            onClick={toggleCart}
          />
          
          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#f8f8f5] z-[101] flex flex-col"
          >
            {/* Cart Header */}
            <div className="p-6 border-b border-[#e5e2d9] flex items-center justify-between">
              <h2 className="font-serif text-xl text-[#2c2c27] flex items-center">
                <Image src="/logo.png" alt="Ankkor" width={100} height={35} className="h-8 w-auto mr-2" />
                <span>Shopping Cart</span>
              </h2>
              <button 
                onClick={toggleCart}
                className="text-[#2c2c27] hover:text-[#8a8778] transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Cart Content */}
            <div className="flex-1 overflow-auto py-6 px-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-16 w-16 text-[#e5e2d9] mb-6" />
                  <h3 className="font-serif text-xl text-[#2c2c27] mb-2">Your cart is empty</h3>
                  <p className="text-[#8a8778] mb-8">Browse our collections and add your favorite items to your cart.</p>
                  <button
                    onClick={toggleCart}
                    className="border border-[#2c2c27] px-6 py-3 text-sm uppercase tracking-wider text-[#2c2c27] transition-colors hover:bg-[#f4f3f0]"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex border-b border-[#e5e2d9] pb-6">
                      {/* Product Image */}
                      <div className="relative h-24 w-20 bg-[#f4f3f0] overflow-hidden">
                        <Link href={`/product/${item.handle || item.id}`} onClick={toggleCart}>
                          <Image
                            src={item.image}
                            alt={item.name || item.title || 'Product'}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </Link>
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 ml-4">
                        <div className="flex justify-between">
                          <Link 
                            href={`/product/${item.handle || item.id}`}
                            className="font-serif text-[#2c2c27] hover:text-[#8a8778] transition-colors"
                            onClick={toggleCart}
                          >
                            {item.name || item.title || 'Product'}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#8a8778] hover:text-[#2c2c27] transition-colors"
                            aria-label={`Remove ${item.name || item.title || 'product'} from cart`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="mt-2 flex justify-between items-end">
                          <div className="flex items-center border border-[#e5e2d9]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-[#2c2c27] hover:bg-[#f4f3f0] transition-colors"
                              aria-label="Decrease quantity"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 py-1 text-sm text-[#2c2c27]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-[#2c2c27] hover:bg-[#f4f3f0] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-medium text-[#2c2c27]">
                            {currencySymbol}{(parseFloat(item.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Clear Cart Button */}
                  <div className="text-right">
                    <button
                      onClick={clearCart}
                      className="text-sm text-[#8a8778] hover:text-[#2c2c27] underline transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                  
                  {/* Shipping Options */}
                  <div className="border-t border-[#e5e2d9] pt-6">
                    <h3 className="font-serif text-lg text-[#2c2c27] mb-4 flex items-center">
                      <Truck className="h-4 w-4 mr-2" />
                      Shipping Options
                    </h3>
                    <div className="space-y-3">
                      {shippingOptions.map((option) => (
                        <label key={option.id} className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={selectedShipping === option.id}
                            onChange={() => handleShippingChange(option.id)}
                            className="mt-1 mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className="font-medium text-[#2c2c27]">{option.name}</span>
                              <span className="text-[#2c2c27]">
                                {option.price === 0 ? 'Free' : `${currencySymbol}${option.price.toFixed(2)}`}
                              </span>
                            </div>
                            <p className="text-sm text-[#8a8778]">{option.description}</p>
                            <p className="text-xs text-[#8a8778] mt-1">
                              Estimated delivery: {option.estimatedDelivery()}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Promo Code */}
                  <div className="border-t border-[#e5e2d9] pt-6">
                    {showPromoInput ? (
                      <div className="space-y-2">
                        <div className="flex">
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Enter promo code"
                            className="flex-1 border border-[#e5e2d9] px-3 py-2 text-sm focus:outline-none focus:border-[#8a8778]"
                          />
                          <button
                            onClick={applyPromoCode}
                            className="bg-[#2c2c27] text-[#f4f3f0] px-4 py-2 text-sm"
                          >
                            Apply
                          </button>
                        </div>
                        {promoError && (
                          <p className="text-red-500 text-xs">{promoError}</p>
                        )}
                        {promoDiscount > 0 && (
                          <p className="text-green-600 text-xs">Promo code applied successfully!</p>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowPromoInput(true)}
                        className="text-sm text-[#8a8778] hover:text-[#2c2c27] underline transition-colors"
                      >
                        Add promo code
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Cart Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#e5e2d9]">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[#5c5c52]">
                    <span>Subtotal</span>
                    <span>{currencySymbol}{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#5c5c52]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `${currencySymbol}${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-[#5c5c52]">
                    <span>Estimated Tax</span>
                    <span>{currencySymbol}{estimatedTax.toFixed(2)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{currencySymbol}{promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium text-[#2c2c27] pt-3 border-t border-[#e5e2d9]">
                    <span>Total</span>
                    <span>{currencySymbol}{total}</span>
                  </div>
                </div>
                
                {checkoutError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
                    <p>{checkoutError}</p>
                  </div>
                )}
                
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading || items.length === 0}
                  className="w-full bg-[#2c2c27] text-[#f4f3f0] py-3 text-sm uppercase tracking-wider hover:bg-[#3d3d35] transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkoutLoading ? (
                    <>
                      <Loader size="sm" color="#f4f3f0" className="mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Checkout
                    </>
                  )}
                </button>
                
                <button
                  onClick={toggleCart}
                  className="w-full mt-3 border border-[#2c2c27] text-[#2c2c27] py-3 text-sm uppercase tracking-wider hover:bg-[#f4f3f0] transition-colors"
                >
                  Continue Shopping
                </button>
                
                <p className="text-xs text-[#8a8778] text-center mt-4">
                  By proceeding to checkout, you agree to our <Link href="/terms-of-service" onClick={toggleCart} className="underline hover:text-[#2c2c27]">Terms of Service</Link> and <Link href="/privacy-policy" onClick={toggleCart} className="underline hover:text-[#2c2c27]">Privacy Policy</Link>.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart; 