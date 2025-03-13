'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { Filter, X, ChevronDown, Search as SearchIcon } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import Loader from '@/components/ui/loader';
import { searchProducts, getMetafield } from '@/lib/shopify';
import { motion } from 'framer-motion';
import usePageLoading from '@/hooks/usePageLoading';
import { normalizeProductImages } from '@/lib/shopify';

// Loading component for Suspense
const SearchLoading = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="h-8 w-48 bg-[#e5e2d9] animate-pulse mb-4"></div>
    <div className="h-4 w-64 bg-[#e5e2d9] animate-pulse mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-[#f4f3f0] p-4 h-80 animate-pulse"></div>
      ))}
    </div>
  </div>
);

// Separate component that uses useSearchParams
const SearchContent = () => {
  // Import useSearchParams inside the component
  const { useSearchParams } = require('next/navigation');
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Search products using Shopify API
  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      
      try {
        if (!query) {
          setResults([]);
          setIsLoading(false);
          return;
        }
        
        // Search products from Shopify
        const products = await searchProducts(query);
        
        // Transform products to match the expected format
        const formattedProducts = products.map(product => {
          const firstVariant = product.variants?.edges?.[0]?.node || null;
          
          // Use the utility function to safely extract the first image
          const productImages = normalizeProductImages(product.images, product.title);
          const productImage = productImages.length > 0 ? productImages[0].url : '';
          
          // Extract material from tags or metafields if available
          let material = 'Premium Fabric';
          
          try {
            if (Array.isArray(product.tags)) {
              const materialTag = product.tags.find((tag: string) => 
                tag.toLowerCase().includes('material:')
              );
              
              if (materialTag) {
                material = materialTag.split(':')[1].trim();
              }
            }
          } catch (error) {
            console.error(`Error processing material for product ${product.title}:`, error);
          }
          
          // Extract category from collections
          let category = 'clothing';
          try {
            if (product.collections?.edges && product.collections.edges.length > 0) {
              category = product.collections.edges[0].node.handle || 'clothing';
            }
          } catch (error) {
            console.error(`Error processing category for product ${product.title}:`, error);
          }
          
          return {
            id: product.id || '',
            name: product.title || 'Untitled Product',
            price: firstVariant?.price?.amount || 
                   product.priceRange?.minVariantPrice?.amount || 
                   '0.00',
            image: productImage,
            handle: product.handle || '',
            rating: 5, // Default rating since Shopify doesn't have built-in ratings
            reviews: 0, // Default reviews count
            material,
            isNew: product.createdAt ? 
                   (new Date(product.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) : 
                   false, // New if created in last 30 days
            variantId: firstVariant?.id || '',
            category
          };
        });
        
        setResults(formattedProducts);
      } catch (error) {
        console.error('Error searching products:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Debounce search to avoid too many API calls
    const timer = setTimeout(() => {
      fetchSearchResults();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  // Get unique categories and materials for filters
  const categories = Array.from(new Set(results.map(product => product.category)));
  const materials = Array.from(new Set(results.map(product => product.material)));
  
  // Toggle category filter
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  // Toggle material filter
  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };
  
  // Apply filters to results
  const filteredResults = results.filter(product => {
    // If no categories selected, show all
    const categoryMatch = selectedCategories.length === 0 || 
      selectedCategories.includes(product.category);
    
    // If no materials selected, show all
    const materialMatch = selectedMaterials.length === 0 || 
      selectedMaterials.includes(product.material);
    
    return categoryMatch && materialMatch;
  });
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-2 font-serif text-3xl font-bold text-[#2c2c27]">
        Search Results
      </h1>
      
      {query ? (
        <p className="mb-8 text-[#5c5c52]">
          Showing results for "{query}"
        </p>
      ) : (
        <p className="mb-8 text-[#5c5c52]">
          Enter a search term to find products
        </p>
      )}
      
      {/* Mobile filter button */}
      <div className="mb-6 flex md:hidden">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center border border-[#e5e2d9] px-4 py-2 text-[#2c2c27]"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {(selectedCategories.length > 0 || selectedMaterials.length > 0) && (
            <span className="ml-2 rounded-full bg-[#2c2c27] px-2 py-0.5 text-xs text-white">
              {selectedCategories.length + selectedMaterials.length}
            </span>
          )}
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Filters - Mobile (Slide in) */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-80 transform bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
            isFilterOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#2c2c27]">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-[#2c2c27]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Category filter */}
          {categories.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-medium uppercase text-[#8a8778]">
                Category
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center text-[#2c2c27]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="mr-2 h-4 w-4 border-[#e5e2d9]"
                    />
                    <span className="capitalize">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          {/* Material filter */}
          {materials.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-medium uppercase text-[#8a8778]">
                Material
              </h3>
              <div className="space-y-2">
                {materials.map((material) => (
                  <label
                    key={material}
                    className="flex items-center text-[#2c2c27]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(material)}
                      onChange={() => toggleMaterial(material)}
                      className="mr-2 h-4 w-4 border-[#e5e2d9]"
                    />
                    <span>{material}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          {/* Reset filters button */}
          {(selectedCategories.length > 0 || selectedMaterials.length > 0) && (
            <button
              onClick={resetFilters}
              className="w-full border border-[#2c2c27] py-2 text-[#2c2c27] hover:bg-[#2c2c27] hover:text-white"
            >
              Reset Filters
            </button>
          )}
        </div>
        
        {/* Filters - Desktop (Sidebar) */}
        <div className="hidden md:block md:w-64 md:pr-8">
          <h2 className="mb-6 text-xl font-bold text-[#2c2c27]">Filters</h2>
          
          {/* Category filter */}
          {categories.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-medium uppercase text-[#8a8778]">
                Category
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center text-[#2c2c27]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="mr-2 h-4 w-4 border-[#e5e2d9]"
                    />
                    <span className="capitalize">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          {/* Material filter */}
          {materials.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-medium uppercase text-[#8a8778]">
                Material
              </h3>
              <div className="space-y-2">
                {materials.map((material) => (
                  <label
                    key={material}
                    className="flex items-center text-[#2c2c27]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(material)}
                      onChange={() => toggleMaterial(material)}
                      className="mr-2 h-4 w-4 border-[#e5e2d9]"
                    />
                    <span>{material}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          {/* Reset filters button */}
          {(selectedCategories.length > 0 || selectedMaterials.length > 0) && (
            <button
              onClick={resetFilters}
              className="w-full border border-[#2c2c27] py-2 text-[#2c2c27] hover:bg-[#2c2c27] hover:text-white"
            >
              Reset Filters
            </button>
          )}
        </div>
        
        {/* Search Results */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#f4f3f0] p-4 h-80 animate-pulse"></div>
              ))}
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  handle={product.handle}
                  rating={product.rating}
                  reviews={product.reviews}
                  material={product.material}
                  isNew={product.isNew}
                  variantId={product.variantId}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              {query ? (
                <div>
                  <SearchIcon className="mx-auto h-12 w-12 text-[#8a8778] mb-4" />
                  <h3 className="text-xl font-bold text-[#2c2c27] mb-2">
                    No products found
                  </h3>
                  <p className="text-[#5c5c52]">
                    We couldn't find any products matching "{query}".
                    <br />
                    Try using different keywords or browse our collections.
                  </p>
                </div>
              ) : (
                <div>
                  <SearchIcon className="mx-auto h-12 w-12 text-[#8a8778] mb-4" />
                  <h3 className="text-xl font-bold text-[#2c2c27] mb-2">
                    Enter a search term
                  </h3>
                  <p className="text-[#5c5c52]">
                    Type in the search box above to find products.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
} 