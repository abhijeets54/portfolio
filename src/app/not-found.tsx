'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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

// Main content component
const NotFoundContent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-9xl font-serif font-bold text-[#2c2c27]">404</h1>
      <h2 className="text-2xl md:text-3xl font-serif mt-6 mb-8 text-[#5c5c52]">
        Page Not Found
      </h2>
      <p className="max-w-md mb-10 text-[#8a8778]">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 bg-[#2c2c27] text-white hover:bg-[#3d3d35] transition-colors"
      >
        <ArrowLeft size={16} />
        Return to Homepage
      </Link>
    </div>
  );
};

// Root component with Suspense boundary
export default function NotFound() {
  return (
    <div className="container mx-auto py-20">
      <Suspense fallback={<Loading />}>
        <NotFoundContent />
      </Suspense>
    </div>
  );
} 