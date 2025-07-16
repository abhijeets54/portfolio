'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Simple loading component for Suspense
const Loading = () => (
  <div className="animate-pulse flex space-x-4">
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-[#e5e2d9] rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-[#e5e2d9] rounded col-span-2"></div>
          <div className="h-2 bg-[#e5e2d9] rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-[#e5e2d9] rounded"></div>
      </div>
    </div>
  </div>
);

// Dynamically import the component that uses useSearchParams with no SSR
const DynamicNotFoundContent = dynamic(() => import('./not-found-content'), { 
  ssr: false,
  loading: () => <Loading />
});

// Root component with proper handling for client-side navigation
export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found | Abhijeet Singh - Full Stack Developer</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore Abhijeet Singh's portfolio of full stack development projects and get in touch." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://abhijeets-portfolio.vercel.app/404" />
      </Head>
      <div className="container mx-auto py-20">
        <DynamicNotFoundContent />
      </div>
    </>
  );
}