'use client';

import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import PageLoading from '@/components/ui/PageLoading';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  variant: 'thread' | 'fabric' | 'button';
  setVariant: (variant: 'thread' | 'fabric' | 'button') => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setLoading: () => {},
  variant: 'thread',
  setVariant: () => {},
});

export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: React.ReactNode;
}

// Map paths to specific loader variants for a more tailored experience
const pathVariantMap: Record<string, 'thread' | 'fabric' | 'button'> = {
  '/collection': 'fabric',
  '/collection/shirts': 'fabric',
  '/collection/pants': 'fabric',
  '/collection/polos': 'fabric',
  '/product': 'thread',
  '/about': 'button',
  '/customer-service': 'button',
  '/account': 'thread',
  '/wishlist': 'thread',
};

// Separate component that uses useSearchParams
const RouteChangeHandler = ({ setIsLoading, setVariant }: { 
  setIsLoading: (loading: boolean) => void;
  setVariant: (variant: 'thread' | 'fabric' | 'button') => void;
}) => {
  const pathname = usePathname();
  
  // Import useSearchParams inside the component that's wrapped with Suspense
  const { useSearchParams } = require('next/navigation');
  const searchParams = useSearchParams();

  // Set loading state and variant when route changes
  useEffect(() => {
    // Start loading
    setIsLoading(true);
    
    // Determine the appropriate variant based on the path
    const basePathname = '/' + pathname.split('/')[1];
    const newVariant = pathVariantMap[basePathname] || 
                       pathVariantMap[pathname] || 
                       'thread';
    setVariant(newVariant);
    
    // Simulate loading delay (remove in production and rely on actual loading time)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [pathname, searchParams, setIsLoading, setVariant]);

  return null;
};

// Loading fallback component
const LoadingFallback = () => <div className="hidden">Loading route...</div>;

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [variant, setVariant] = useState<'thread' | 'fabric' | 'button'>('thread');

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading, variant, setVariant }}>
      <Suspense fallback={<LoadingFallback />}>
        <RouteChangeHandler setIsLoading={setIsLoading} setVariant={setVariant} />
      </Suspense>
      {children}
      <PageLoading isLoading={isLoading} variant={variant} />
    </LoadingContext.Provider>
  );
};

export default LoadingProvider; 