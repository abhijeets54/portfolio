'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Shirt, ShoppingBag, Scissors, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/ProductCard';
import ImageLoader from '@/components/ui/ImageLoader';
import usePageLoading from '@/hooks/usePageLoading';
import { getAllProducts, normalizeProduct, getMetafield, normalizeProductImages } from '@/lib/shopify';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch products from Shopify
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products for homepage...');
        const products = await getAllProducts(8); // Fetch 8 products
        
        if (!products || products.length === 0) {
          console.warn('No products returned from Shopify');
          setError('No products found. Please check your Shopify store configuration.');
          setIsLoading(false);
          return;
        }
        
        console.log(`Fetched ${products.length} products from Shopify`);
        
        // Normalize the products
        const normalizedProducts = products
          .map((product: any) => normalizeProduct(product))
          .filter(Boolean);
        
        console.log('Normalized products:', normalizedProducts);
        setFeaturedProducts(normalizedProducts);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products from Shopify');
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Use the page loading hook
  usePageLoading(isLoading, 'thread');
  
  // Enhanced animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const slideIn = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: "easeOut" } }
  };

  // Fallback products in case Shopify API fails
  const fallbackProducts = [
    {
      id: 'prod_1',
      title: 'Oxford Dress Shirt',
      price: '4999.00',
      images: [{ url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80' }],
      handle: 'oxford-dress-shirt',
      rating: 5,
      reviews: 24,
      metafields: { custom_material: 'Egyptian Cotton' },
      isNew: true,
      variants: [{ id: 'var_1' }]
    },
    {
      id: 'prod_2',
      title: 'Italian Slim Chinos',
      price: '5999.00',
      images: [{ url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80' }],
      handle: 'italian-slim-chinos',
      rating: 4,
      reviews: 18,
      metafields: { custom_material: 'Cotton Twill' },
      isNew: true,
      variants: [{ id: 'var_2' }]
    },
    {
      id: 'prod_3',
      title: 'Premium Linen Shirt',
      price: '4499.00',
      images: [{ url: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?q=80' }],
      handle: 'premium-linen-shirt',
      rating: 5,
      reviews: 32,
      metafields: { custom_material: 'Irish Linen' },
      isNew: true,
      variants: [{ id: 'var_3' }]
    },
    {
      id: 'prod_4',
      title: 'Tailored Wool Pants',
      price: '6499.00',
      images: [{ url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80' }],
      handle: 'tailored-wool-pants',
      rating: 4,
      reviews: 21,
      metafields: { custom_material: 'Italian Wool' },
      isNew: true,
      variants: [{ id: 'var_4' }]
    }
  ];

  // Use real products if available, otherwise use fallback
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : fallbackProducts;

  return (
    <div className="min-h-screen bg-[#f8f8f5]">
      {/* Hero Section - Refined */}
      <section className="pt-36 pb-20 px-4 bg-gradient-to-b from-[#f4f3f0] to-[#f8f8f5]">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="lg:w-1/2"
            variants={slideIn}
            initial="initial"
            animate="animate"
          >
            <p className="text-[#8a8778] text-lg mb-5 font-light tracking-widest uppercase">
              Timeless Distinction
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-8 text-[#2c2c27]">
              Elevated essentials <br />for the discerning gentleman
            </h1>
            <p className="text-[#5c5c52] mb-8 leading-relaxed max-w-lg">
              Impeccably tailored garments crafted from the finest materials, designed to stand the test of time with understated elegance.
            </p>
            <motion.button 
              onClick={() => {}}
              className="bg-[#2c2c27] text-[#f4f3f0] px-10 py-4 hover:bg-[#3d3d35] transition-colors flex items-center gap-3 text-sm tracking-wider uppercase font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/collection">
                Explore Collection
                <span className="inline-block text-lg font-light">→</span>
              </Link>
            </motion.button>
          </motion.div>
          <motion.div 
            className="lg:w-1/2 mt-12 lg:mt-0 relative"
            variants={scaleIn}
            initial="initial"
            animate="animate"
          >
            <div className="absolute -z-10 top-0 right-0 w-80 h-80 bg-[#e0ddd3] rounded-full opacity-40 blur-3xl"></div>
            <div className="absolute -z-10 bottom-0 right-20 w-64 h-64 bg-[#d5d0c3] rounded-full opacity-30 blur-3xl"></div>
            <Image
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80"
              alt="Ankkor Classic Style"
              width={600}
              height={800}
              className="rounded-sm shadow-lg relative z-10 image-animate border border-[#e5e2d9]"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#2c2c27] text-[#f4f3f0] py-4 px-8 text-sm tracking-wider uppercase z-20 hidden md:block">
              Est. 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* Heritage Badge */}
      <motion.div 
        className="py-10 bg-[#2c2c27] text-center text-[#e5e2d9]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <p className="text-sm tracking-widest uppercase flex items-center justify-center gap-6">
            <span className="h-px w-8 bg-[#8a8778]"></span>
            Handcrafted with precision
            <span className="h-px w-8 bg-[#8a8778]"></span>
          </p>
        </div>
      </motion.div>

      {/* Category Feature - Enhanced */}
      <motion.section 
        className="py-24 bg-[#f0ede6]"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div className="max-w-xl mx-auto text-center mb-16" variants={fadeIn}>
            <h2 className="text-3xl font-serif font-bold mb-5 text-[#2c2c27]">
              Distinguished Collection
            </h2>
            <p className="text-[#5c5c52]">
              Curated ensembles that embody understated luxury and sophisticated style, 
              crafted for those who appreciate heritage and quality.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div 
              className="relative overflow-hidden group cursor-pointer h-[450px]"
              variants={fadeIn}
              whileHover={{ scale: 1.01 }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80" 
                alt="Ankkor Shirts" 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover image-animate group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-500 flex items-center justify-center">
                <div className="text-center bg-[#2c2c27] bg-opacity-90 py-6 px-10 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-[#f4f3f0] text-2xl font-serif mb-3">Fine Shirts</h3>
                  <p className="text-[#d5d0c3] text-sm mb-5">Expertly tailored, impeccable fit</p>
                  <Link 
                    href="/collection/shirts"
                    className="border border-[#8a8778] text-[#e5e2d9] px-6 py-2 text-sm tracking-wider uppercase hover:bg-[#3d3d35] transition-colors inline-block"
                  >
                    Discover
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative overflow-hidden group cursor-pointer h-[450px]"
              variants={fadeIn}
              whileHover={{ scale: 1.01 }}
        >
          <Image
                src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80" 
                alt="Ankkor Pants" 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover image-animate group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-500 flex items-center justify-center">
                <div className="text-center bg-[#2c2c27] bg-opacity-90 py-6 px-10 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-[#f4f3f0] text-2xl font-serif mb-3">Distinguished Pants</h3>
                  <p className="text-[#d5d0c3] text-sm mb-5">Precision cut for refined comfort</p>
                  <Link 
                    href="/collection/pants"
                    className="border border-[#8a8778] text-[#e5e2d9] px-6 py-2 text-sm tracking-wider uppercase hover:bg-[#3d3d35] transition-colors inline-block"
                  >
                    Discover
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative overflow-hidden group cursor-pointer h-[450px]"
              variants={fadeIn}
              whileHover={{ scale: 1.01 }}
        >
          <Image
                src="https://images.unsplash.com/photo-1627225924765-552d49cf47ad?q=80" 
                alt="Ankkor Accessories" 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover image-animate group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-500 flex items-center justify-center">
                <div className="text-center bg-[#2c2c27] bg-opacity-90 py-6 px-10 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-[#f4f3f0] text-2xl font-serif mb-3">Coming Soon</h3>
                  <p className="text-[#d5d0c3] text-sm mb-5">Refined polos for the modern gentleman</p>
                  <Link 
                    href="/collection/polos"
                    className="border border-[#8a8778] text-[#e5e2d9] px-6 py-2 text-sm tracking-wider uppercase hover:bg-[#3d3d35] transition-colors inline-block"
                  >
                    Preview
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Products - Now with real Shopify data */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-5 text-[#2c2c27]">Signature Pieces</h2>
            <p className="text-[#5c5c52] max-w-2xl mx-auto">
              Our most distinguished garments, selected for their exceptional quality and timeless appeal
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-8 rounded">
              <p>{error}</p>
              <p className="text-sm mt-2">Please check your Shopify configuration in the .env.local file.</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.title}
                price={product.price}
                image={product.images[0]?.url || ''}
                handle={product.handle}
                rating={product.rating || 4}
                reviews={product.reviews || Math.floor(Math.random() * 30) + 5}
                material={getMetafield(product, 'custom_material', undefined, product.vendor || 'Premium Fabric')}
                isNew={true}
                variantId={product.variants[0]?.id || ''}
                currencySymbol="₹"
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/collection"
              className="inline-flex items-center text-[#2c2c27] hover:text-[#8a8778] transition-colors"
            >
              View Full Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section - New */}
      <motion.section 
        className="py-20 px-4 bg-[#2c2c27] text-[#f4f3f0]"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <Star className="h-6 w-6 mx-auto mb-6 text-[#8a8778]" />
          <h2 className="text-2xl font-serif italic mb-10 leading-relaxed">
            "Ankkor represents the pinnacle of menswear craftsmanship. Their attention to detail
            and commitment to quality is unmatched in today's fast-fashion world."
          </h2>
          <p className="text-[#d5d0c3] text-sm uppercase tracking-widest">Gentleman's Quarterly, 2024</p>
        </div>
      </motion.section>

      {/* Brand Story Section - Enhanced */}
      <motion.section 
        className="py-24 px-4 bg-[#f4f3f0]"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            className="lg:w-1/2 relative"
            variants={fadeIn}
        >
          <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80"
              alt="Ankkor Philosophy"
              width={600}
              height={600}
              sizes="(max-width: 768px) 100vw, 600px"
              className="w-full h-[600px] object-cover image-animate border border-[#e5e2d9]"
            />
            <div className="absolute bottom-0 right-0 transform translate-x-8 translate-y-8 border border-[#8a8778] w-36 h-36 -z-10 hidden lg:block"></div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 space-y-8"
            variants={fadeIn}
          >
            <p className="text-[#8a8778] text-sm mb-3 tracking-widest uppercase">Our Heritage</p>
            <h2 className="text-4xl font-serif font-bold text-[#2c2c27]">The Ankkor Legacy</h2>
            <p className="text-[#5c5c52] leading-relaxed">
               Ankkor is synonymous with impeccable taste and understated luxury. 
              Our garments are crafted with meticulous attention to detail using time-honored techniques that 
              have been perfected over generations.
            </p>
            <p className="text-[#5c5c52] leading-relaxed">
              We believe that true elegance lies in simplicity, quality materials, and perfect fit. Each 
              piece is designed to transcend fleeting trends, becoming an enduring cornerstone of the 
              refined gentleman's wardrobe.
            </p>
            
            <div className="space-y-5 pt-4">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-none border border-[#8a8778] text-[#2c2c27] flex items-center justify-center text-sm mt-1">01</span>
                <div>
                  <h3 className="text-[#2c2c27] font-serif text-lg mb-2">Artisanal Craftsmanship</h3>
                  <p className="text-[#5c5c52] text-sm leading-relaxed">Honoring traditional techniques passed down through generations of master tailors</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-none border border-[#8a8778] text-[#2c2c27] flex items-center justify-center text-sm mt-1">02</span>
                <div>
                  <h3 className="text-[#2c2c27] font-serif text-lg mb-2">Exceptional Materials</h3>
                  <p className="text-[#5c5c52] text-sm leading-relaxed">Sourced from the world's finest mills and selected for durability and character</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-none border border-[#8a8778] text-[#2c2c27] flex items-center justify-center text-sm mt-1">03</span>
                <div>
                  <h3 className="text-[#2c2c27] font-serif text-lg mb-2">Timeless Design Philosophy</h3>
                  <p className="text-[#5c5c52] text-sm leading-relaxed">Creating enduring pieces that transcend trends and stand the test of time</p>
                </div>
              </div>
            </div>

            <Link href="/about">
              <motion.button 
                className="bg-[#2c2c27] text-[#f4f3f0] px-10 py-4 mt-8 hover:bg-[#3d3d35] transition-colors text-sm tracking-wider uppercase font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Discover Our Heritage
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section - Enhanced */}
      {/* <motion.section 
        className="py-20 px-4 bg-[#faf9f6] border-y border-[#e5e2d9]"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto max-w-xl text-center">
          <p className="text-[#8a8778] text-sm mb-3 tracking-widest uppercase">Stay Informed</p>
          <h2 className="text-3xl font-serif font-bold mb-4 text-[#2c2c27]">Join the Ankkor Circle</h2>
          <p className="text-[#5c5c52] mb-8">
            Subscribe to receive private collection previews, styling insights from our master tailors, 
            and exclusive invitations to Ankkor events.
          </p>
          
          <div className="flex gap-0 max-w-md mx-auto overflow-hidden border border-[#c5c2b9]">
            <Input 
              placeholder="Enter your email" 
              className="flex-1 border-none focus:ring-0 bg-transparent text-[#2c2c27] placeholder-[#8a8778]" 
            />
            <Button className="bg-[#2c2c27] hover:bg-[#3d3d35] rounded-none px-6">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[#8a8778] text-xs mt-4">
            By subscribing, you agree to receive Ankkor communications and accept our Privacy Policy
          </p>
        </div>
      </motion.section> */}

      {/* Shopping Experience - Enhanced */}
      <motion.section 
        className="py-24 px-4 bg-[#f0ede6]"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div className="text-center max-w-xl mx-auto mb-16" variants={fadeIn}>
            <p className="text-[#8a8778] text-sm mb-3 tracking-widest uppercase">Our Promise</p>
            <h2 className="text-3xl font-serif font-bold mb-4 text-[#2c2c27]">
              The Ankkor Distinction
            </h2>
            <p className="text-[#5c5c52]">
              We uphold the highest standards in every aspect of our craft, 
              ensuring an exceptional experience with every garment
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <motion.div 
              className="text-center space-y-5"
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-[#faf9f6] w-20 h-20 mx-auto rounded-none flex items-center justify-center shadow-sm border border-[#e5e2d9]">
                <ShoppingBag className="w-8 h-8 text-[#2c2c27]" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-[#2c2c27]">Curated Selection</h3>
              <p className="text-[#5c5c52] text-sm">
                Each piece is meticulously selected to ensure exceptional quality and enduring style
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center space-y-5"
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-[#faf9f6] w-20 h-20 mx-auto rounded-none flex items-center justify-center shadow-sm border border-[#e5e2d9]">
                <Shirt className="w-8 h-8 text-[#2c2c27]" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-[#2c2c27]">Master Tailoring</h3>
              <p className="text-[#5c5c52] text-sm">
                Precision craftsmanship ensuring impeccable fit, superior comfort, and distinctive character
              </p>
            </motion.div>

            <motion.div 
              className="text-center space-y-5"
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-[#faf9f6] w-20 h-20 mx-auto rounded-none flex items-center justify-center shadow-sm border border-[#e5e2d9]">
                <Scissors className="w-8 h-8 text-[#2c2c27]" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-[#2c2c27]">Exceptional Materials</h3>
              <p className="text-[#5c5c52] text-sm">
                Sourced from heritage mills with centuries of tradition and uncompromising standards
              </p>
            </motion.div>

            <motion.div 
              className="text-center space-y-5"
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-[#faf9f6] w-20 h-20 mx-auto rounded-none flex items-center justify-center shadow-sm border border-[#e5e2d9]">
                <Check className="w-8 h-8 text-[#2c2c27]" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-[#2c2c27]">Client Dedication</h3>
              <p className="text-[#5c5c52] text-sm">
                Personalized attention and service that honors the tradition of bespoke craftsmanship
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer Callout - New */}
      <motion.section
        className="py-24 px-4 bg-[#2c2c27] text-[#f4f3f0] relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#8a8778] to-transparent opacity-40"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl font-serif font-bold mb-6">Experience Ankkor</h2>
          <p className="text-[#d5d0c3] mb-10 max-w-2xl mx-auto">
            Visit our flagship boutique for a personalized styling consultation 
            with our master tailors, or explore our collection online.
          </p>
          <Link href="/collection">
            <motion.button 
              className="border border-[#8a8778] text-[#f4f3f0] px-10 py-4 hover:bg-[#3d3d35] transition-colors text-sm tracking-wider uppercase font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Shop the Collection
            </motion.button>
          </Link>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-[#8a8778] to-transparent opacity-40"></div>
      </motion.section>
    </div>
  );
}
