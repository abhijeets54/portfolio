'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/loader';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when search bar opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Navigate to search results page
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    
    // Reset state
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 500);
  };

  // Handle escape key to close search
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[102] flex items-start justify-center bg-[#2c2c27]/90 pt-24 px-4">
      <div className="w-full max-w-2xl bg-[#f8f8f5] rounded-lg shadow-xl overflow-hidden">
        <div className="p-4 border-b border-[#e5e2d9]">
          <form onSubmit={handleSearch} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for products..."
              className="w-full pl-10 pr-10 py-3 border-none bg-transparent text-[#2c2c27] placeholder-[#8a8778] focus:outline-none focus:ring-0"
            />
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8a8778]" />
            
            <button
              type="button"
              onClick={onClose}
              className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center text-[#8a8778] hover:text-[#2c2c27] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </form>
        </div>
        
        <div className="p-4 text-[#5c5c52] text-sm">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader size="md" color="#8a8778" />
            </div>
          ) : (
            <div className="space-y-2">
              <p className="font-medium">Popular Searches:</p>
              <div className="flex flex-wrap gap-2">
                {['Shirts', 'Pants', 'Polos', 'Linen', 'Cotton', 'Wool'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      if (inputRef.current) {
                        inputRef.current.focus();
                      }
                    }}
                    className="px-3 py-1 bg-[#f4f3f0] rounded-full text-[#5c5c52] hover:bg-[#e5e2d9] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 