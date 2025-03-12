'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, X } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import ImageLoader from '@/components/ui/ImageLoader';
import usePageLoading from '@/hooks/usePageLoading';
import { getAllProducts, normalizeProductImages, getMetafield } from '@/lib/shopify';

// Define product type
interface ProductImage {
  url: string;
}

interface ProductVariant {
  id: string;
}

interface Product {
  id: string;
  title: string;
  handle: string;
  price: string;
  images: ProductImage[];
  variants: ProductVariant[];
  metafields: Record<string, string>;
  rating?: number;
  reviews?: number;
  productType?: string;
  tags?: string[];
  vendor?: string;
  material?: string;
}

export default function ShirtsCollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [sortOption, setSortOption] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use the page loading hook
  usePageLoading(isLoading, 'fabric');
  
  // Fetch products from Shopify
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const allProducts = await getAllProducts();
        
        if (!allProducts || allProducts.length === 0) {
          setError('No products found. Please check your Shopify store configuration.');
          setIsLoading(false);
          return;
        }
        
        // Transform products to match our interface and filter for shirts only
        const transformedProducts = allProducts
          .map((product: any) => {
            // Use the utility function to safely extract images
            const productImages = normalizeProductImages(product.images, product.title);
            
            return {
              id: product.id,
              title: product.title || "Untitled Product",
              handle: product.handle || "",
              price: product.priceRange?.minVariantPrice?.amount || 
                     (product.variants && product.variants[0]?.price) || 
                     "0.00",
              images: productImages,
              variants: Array.isArray(product.variants) ? product.variants : [],
              metafields: product.metafields || {},
              rating: 4.5, // Default rating since we don't have real ratings
              reviews: Math.floor(Math.random() * 30) + 5, // Random number of reviews for demo
              productType: product.productType || '',
              tags: Array.isArray(product.tags) ? product.tags : [],
              vendor: product.vendor || '',
              // Extract material from metafields or use vendor as fallback
              material: getMetafield(product, 'custom_material', undefined, product.vendor || 'Premium Fabric')
            };
          })
          .filter((product: Product) => {
            const productType = product.productType?.toLowerCase() || '';
            const tags = product.tags?.map(tag => tag.toLowerCase()) || [];
            const title = product.title.toLowerCase();
            
            // Filter for shirts
            return productType.includes('shirt') || 
                   tags.some(tag => tag.includes('shirt')) ||
                   title.includes('shirt');
          });
        
        setProducts(transformedProducts);
        console.log(`Successfully fetched ${transformedProducts.length} shirt products from Shopify`);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('Failed to load products from Shopify');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Toggle filter drawer
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  // Handle material filter toggle
  const handleMaterialToggle = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };
  
  // Get unique materials from products
  const uniqueMaterials = Array.from(new Set(products.map(product => product.material || 'Unknown')));
  
  // Filter products by selected materials and price range
  const filteredProducts = products.filter(product => {
    const price = parseFloat(product.price);
    const materialMatch = selectedMaterials.length === 0 || 
                         selectedMaterials.includes(product.material || 'Unknown');
    const priceMatch = price >= priceRange[0] && price <= priceRange[1];
    
    return materialMatch && priceMatch;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-desc':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'rating':
        return ((b.rating || 0) * 1000 + (b.reviews || 0)) - ((a.rating || 0) * 1000 + (a.reviews || 0));
      case 'newest':
        // Sort by ID as a proxy for newness (higher IDs are typically newer)
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });
  
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
  };
  
  return (
    <div className="min-h-screen bg-[#f8f8f5] pt-8 pb-24">
      {/* Collection Header */}
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-4 text-[#2c2c27]">
            Shirts Collection
          </h1>
          <p className="text-[#5c5c52] mb-8">
            Discover our meticulously crafted shirts, designed with premium fabrics and impeccable attention to detail.
          </p>
        </div>
      </div>
      
      {/* Collection Banner */}
      <div className="relative h-[300px] mb-16 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80"
          alt="Ankkor Shirts Collection"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-[#2c2c27] bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-serif font-bold mb-4">Signature Shirts</h2>
            <p className="text-lg max-w-xl mx-auto">Impeccably tailored for the perfect fit</p>
          </div>
        </div>
      </div>
      
      {/* Filters and Products */}
      <div className="container mx-auto px-4">
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-8 rounded">
            <p>{error}</p>
            <p className="text-sm mt-2">Please check your Shopify configuration in the .env.local file.</p>
          </div>
        )}
        
        {/* Mobile Filter Button */}
        <div className="flex justify-between items-center mb-8 md:hidden">
          <button
            onClick={toggleFilter}
            className="flex items-center gap-2 text-[#2c2c27] border border-[#e5e2d9] px-4 py-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filter & Sort</span>
          </button>
          <div className="text-[#5c5c52] text-sm">
            {sortedProducts.length} products
          </div>
        </div>
        
        {/* Mobile Filter Drawer */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleFilter}></div>
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#f8f8f5] p-6 overflow-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-lg text-[#2c2c27]">Filter & Sort</h3>
                <button onClick={toggleFilter}>
                  <X className="h-5 w-5 text-[#2c2c27]" />
                </button>
              </div>
              
              <div className="mb-8">
                <h4 className="text-[#8a8778] text-xs uppercase tracking-wider mb-4">Materials</h4>
                <div className="space-y-3">
                  {uniqueMaterials.map(material => (
                    <div key={material} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`mobile-material-${material}`}
                        checked={selectedMaterials.includes(material)}
                        onChange={() => handleMaterialToggle(material)}
                        className="mr-3 h-4 w-4 rounded border-[#e5e2d9] text-[#2c2c27] focus:ring-[#8a8778]"
                      />
                      <label htmlFor={`mobile-material-${material}`} className="text-[#5c5c52]">
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-[#8a8778] text-xs uppercase tracking-wider mb-4">Price Range</h4>
                <div className="px-2">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#5c5c52] text-sm">₹{priceRange[0]}</span>
                    <span className="text-[#5c5c52] text-sm">₹{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-[#e5e2d9] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <div>
                <h4 className="text-[#8a8778] text-xs uppercase tracking-wider mb-4">Sort By</h4>
                <div className="space-y-3">
                  {[
                    { id: 'featured', name: 'Featured' },
                    { id: 'price-asc', name: 'Price: Low to High' },
                    { id: 'price-desc', name: 'Price: High to Low' },
                    { id: 'rating', name: 'Highest Rated' },
                    { id: 'newest', name: 'Newest' }
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => setSortOption(option.id)}
                      className={`block w-full text-left py-1 ${
                        sortOption === option.id
                          ? 'text-[#2c2c27] font-medium'
                          : 'text-[#5c5c52]'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={toggleFilter}
                className="w-full bg-[#2c2c27] text-[#f4f3f0] py-3 mt-8 text-sm uppercase tracking-wider"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-10">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24">
              <div className="mb-10">
                <h3 className="text-[#2c2c27] font-serif text-lg mb-6">Materials</h3>
                <div className="space-y-3">
                  {uniqueMaterials.map(material => (
                    <div key={material} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`desktop-material-${material}`}
                        checked={selectedMaterials.includes(material)}
                        onChange={() => handleMaterialToggle(material)}
                        className="mr-3 h-4 w-4 rounded border-[#e5e2d9] text-[#2c2c27] focus:ring-[#8a8778]"
                      />
                      <label htmlFor={`desktop-material-${material}`} className="text-[#5c5c52]">
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-10">
                <h3 className="text-[#2c2c27] font-serif text-lg mb-6">Price Range</h3>
                <div className="px-2">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#5c5c52]">₹{priceRange[0]}</span>
                    <span className="text-[#5c5c52]">₹{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-[#e5e2d9] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-[#2c2c27] font-serif text-lg mb-6">Sort By</h3>
                <div className="space-y-3">
                  {[
                    { id: 'featured', name: 'Featured' },
                    { id: 'price-asc', name: 'Price: Low to High' },
                    { id: 'price-desc', name: 'Price: High to Low' },
                    { id: 'rating', name: 'Highest Rated' },
                    { id: 'newest', name: 'Newest' }
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => setSortOption(option.id)}
                      className={`block w-full text-left py-1 ${
                        sortOption === option.id
                          ? 'text-[#2c2c27] font-medium'
                          : 'text-[#5c5c52] hover:text-[#2c2c27] transition-colors'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="hidden md:flex justify-between items-center mb-8">
              <h2 className="text-[#2c2c27] font-serif text-xl">
                Shirts Collection
              </h2>
              <div className="text-[#5c5c52]">
                {sortedProducts.length} products
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map(product => (
                <motion.div
                  key={product.id}
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                >
                  <ProductCard
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
                </motion.div>
              ))}
            </div>
            
            {sortedProducts.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <p className="text-[#5c5c52] mb-4">No products found with the selected filters.</p>
                <button
                  onClick={() => {
                    setSelectedMaterials([]);
                    setPriceRange([0, 25000]);
                  }}
                  className="text-[#2c2c27] underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 