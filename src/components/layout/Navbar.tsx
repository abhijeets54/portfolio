"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, User, Heart, Menu, X, Search, LogOut } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from '@/components/ui/sheet';
import { useSimpleCartStore } from '@/lib/store';
import { useCustomer } from '@/components/providers/CustomerProvider';
import SearchBar from '@/components/search/SearchBar';

const Navbar = () => {
  const { toggleCart, itemCount, isOpen } = useSimpleCartStore();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { customer, isAuthenticated, logout } = useCustomer();

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const navbarClasses = `fixed top-0 left-0 right-0 z-[99] transition-all duration-300 ${
    isScrolled 
      ? 'bg-[#f8f8f5] h-16 shadow-sm' 
      : 'bg-transparent h-24 py-4'
  }`;

  // Handle cart click - FIXED: Now prevents default and properly toggles cart
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCart();
  };

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-bold text-[#2c2c27] relative z-10">
            <Image src="/logo.png" alt="Ankkor" width={160} height={50} priority className={`${isScrolled ? 'h-10' : 'h-14'} w-auto transition-all duration-300`} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12 relative z-10">
            {/* Collections Dropdown - IMPROVED: Smoother animation */}
            <div className="group relative">
              <button className="text-[#2c2c27] text-sm uppercase tracking-wider hover:text-[#8a8778] transition-colors py-2 px-1 flex items-center">
                Collections
              </button>
              <div className="absolute left-1/2 transform -translate-x-1/2 pt-2 w-[220px] opacity-0 invisible translate-y-1 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                <div className="bg-[#f8f8f5] border border-[#e5e2d9] rounded-md shadow-md p-2">
                  <Link href="/collection/shirts" className="block text-[#2c2c27] hover:bg-[#f4f3f0] cursor-pointer py-2 px-4 rounded">
                    Shirts
                  </Link>
                  <Link href="/collection/pants" className="block text-[#2c2c27] hover:bg-[#f4f3f0] cursor-pointer py-2 px-4 rounded">
                    Pants
                  </Link>
                  <Link href="/collection/polos" className="block text-[#2c2c27] hover:bg-[#f4f3f0] cursor-pointer py-2 px-4 rounded">
                    Polos (Coming Soon)
                  </Link>
                  <div className="h-px bg-[#e5e2d9] my-2"></div>
                  <Link href="/collection" className="block text-[#2c2c27] hover:bg-[#f4f3f0] cursor-pointer py-2 px-4 rounded">
                    View All Collections
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/about" className="text-[#2c2c27] text-sm uppercase tracking-wider hover:text-[#8a8778] transition-colors py-2 px-1">
              Heritage
            </Link>

            <Link href="/customer-service" className="text-[#2c2c27] text-sm uppercase tracking-wider hover:text-[#8a8778] transition-colors py-2 px-1">
              Customer Service
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6 relative z-10">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-[#2c2c27] hover:text-[#8a8778] transition-colors p-2"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Account Dropdown - IMPROVED: Smoother animation */}
            <div className="group relative">
              <button className="text-[#2c2c27] hover:text-[#8a8778] transition-colors p-2">
                <User className="h-5 w-5" />
              </button>
              <div className="absolute right-0 pt-2 w-[220px] opacity-0 invisible translate-y-1 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                <div className="bg-[#f8f8f5] border border-[#e5e2d9] rounded-md shadow-md p-2">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-1.5 text-sm text-[#5c5c52]">
                        Hello, {customer?.firstName || 'there'}
                      </div>
                      <div className="h-px bg-[#e5e2d9] my-2"></div>
                      <Link href="/account" className="block text-[#2c2c27] hover:bg-[#f4f3f0] cursor-pointer py-2 px-4 rounded">
                        My Account
                      </Link>
                      <Link href="/account?tab=orders" className="block text-[#2c2c27] hover:bg-[#f4f3f0] cursor-pointer py-2 px-4 rounded">
                        Order History
                      </Link>
                      <Link href="/wishlist" className="block text-[#2c2c27] hover:bg-[#f4f3f0] cursor-pointer py-2 px-4 rounded">
                        Wishlist
                      </Link>
                      <div className="h-px bg-[#e5e2d9] my-2"></div>
                      <button 
                        onClick={logout}
                        className="flex items-center text-[#2c2c27] hover:bg-[#f4f3f0] cursor-pointer w-full py-2 px-4 rounded"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/sign-in" className="block text-[#2c2c27] hover:bg-[#f4f3f0] cursor-pointer py-2 px-4 rounded">
                        Sign In
                      </Link>
                      <Link href="/sign-up" className="block text-[#2c2c27] hover:bg-[#f4f3f0] cursor-pointer py-2 px-4 rounded">
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <Link href="/wishlist" className="text-[#2c2c27] hover:text-[#8a8778] transition-colors p-2">
              <Heart className="h-5 w-5" />
            </Link>
            
            {/* Cart Button - FIXED: Now properly toggles cart */}
            <button 
              onClick={handleCartClick}
              className="text-[#2c2c27] hover:text-[#8a8778] transition-colors relative p-2"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2c2c27] text-[#f4f3f0] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden text-[#2c2c27] hover:text-[#8a8778] transition-colors" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#f8f8f5] w-[300px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-[#e5e2d9]">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xl font-bold text-[#2c2c27]">
                        <Image src="/logo.png" alt="Ankkor" width={120} height={40} className="h-10 w-auto" />
                      </span>
                      <SheetClose asChild>
                        <button className="text-[#2c2c27]" aria-label="Close menu">
                          <X className="h-5 w-5" />
                        </button>
                      </SheetClose>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-auto py-6 px-6">
                    <div className="flex flex-col space-y-6">
                      {isAuthenticated && (
                        <div className="text-[#5c5c52] mb-2">
                          Hello, {customer?.firstName || 'there'}
                        </div>
                      )}
                      
                      <SheetClose asChild>
                        <button 
                          onClick={() => {
                            setIsSearchOpen(true);
                          }}
                          className="text-[#2c2c27] hover:text-[#8a8778] transition-colors flex items-center"
                        >
                          <Search className="h-4 w-4 mr-2" />
                          Search
                        </button>
                      </SheetClose>
                      
                      <div className="space-y-3">
                        <h3 className="text-[#8a8778] text-xs uppercase tracking-wider">Collections</h3>
                        <div className="flex flex-col space-y-3 pl-2">
                          <SheetClose asChild>
                            <Link href="/collection/shirts" className="text-[#2c2c27] hover:text-[#8a8778] transition-colors">
                              Shirts
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href="/collection/pants" className="text-[#2c2c27] hover:text-[#8a8778] transition-colors">
                              Pants
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href="/collection/polos" className="text-[#2c2c27] hover:text-[#8a8778] transition-colors">
                              Polos (Coming Soon)
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href="/collection" className="text-[#2c2c27] hover:text-[#8a8778] transition-colors">
                              View All Collections
                            </Link>
                          </SheetClose>
                        </div>
                      </div>
                      
                      <SheetClose asChild>
                        <Link href="/about" className="text-[#2c2c27] hover:text-[#8a8778] transition-colors">
                          Heritage
                        </Link>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Link href="/customer-service" className="text-[#2c2c27] hover:text-[#8a8778] transition-colors">
                          Customer Service
                        </Link>
                      </SheetClose>
                      
                      {isAuthenticated ? (
                        <>
                          <SheetClose asChild>
                            <Link href="/account" className="text-[#2c2c27] hover:text-[#8a8778] transition-colors">
                              My Account
                            </Link>
                          </SheetClose>
                          
                          <SheetClose asChild>
                            <Link href="/account?tab=orders" className="text-[#2c2c27] hover:text-[#8a8778] transition-colors">
                              Order History
                            </Link>
                          </SheetClose>
                          
                          <SheetClose asChild>
                            <Link href="/wishlist" className="text-[#2c2c27] hover:text-[#8a8778] transition-colors">
                              Wishlist
                            </Link>
                          </SheetClose>
                          
                          <button 
                            onClick={logout}
                            className="text-[#2c2c27] hover:text-[#8a8778] transition-colors flex items-center"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <SheetClose asChild>
                            <Link href="/sign-in" className="text-[#2c2c27] hover:text-[#8a8778] transition-colors">
                              Sign In
                            </Link>
                          </SheetClose>
                          
                          <SheetClose asChild>
                            <Link href="/sign-up" className="text-[#2c2c27] hover:text-[#8a8778] transition-colors">
                              Create Account
                            </Link>
                          </SheetClose>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 border-t border-[#e5e2d9]">
                    <SheetClose asChild>
                      <button 
                        onClick={handleCartClick}
                        className="w-full bg-[#2c2c27] text-[#f4f3f0] py-3 text-sm uppercase tracking-wider hover:bg-[#3d3d35] transition-colors"
                      >
                        View Cart ({itemCount})
                      </button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      
      {/* Add a spacer to prevent content from jumping */}
      <div className={isScrolled ? 'h-16' : 'h-20'} />
      
      {/* Search Bar */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* FIXED: Ensure your Cart Component is displayed when isOpen is true */}
      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-[100] flex justify-end">
          <div className="bg-[#f8f8f5] w-full max-w-md h-full flex flex-col">
            <div className="p-6 border-b border-[#e5e2d9] flex justify-between items-center">
              <h2 className="font-serif text-xl font-bold text-[#2c2c27]">Your Cart</h2>
              <button onClick={toggleCart} className="text-[#2c2c27]">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              {itemCount > 0 ? (
                <div>
                  {/* Your cart items would render here */}
                  <p>Cart items go here</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 mx-auto text-[#8a8778] mb-4" />
                  <p className="text-[#5c5c52]">Your cart is empty</p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-[#e5e2d9]">
              <button 
                disabled={itemCount === 0}
                className={`w-full py-3 text-sm uppercase tracking-wider transition-colors ${
                  itemCount > 0 
                    ? 'bg-[#2c2c27] text-[#f4f3f0] hover:bg-[#3d3d35]' 
                    : 'bg-[#e5e2d9] text-[#8a8778] cursor-not-allowed'
                }`}
              >
                {itemCount > 0 ? 'Checkout' : 'Your Cart Is Empty'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;