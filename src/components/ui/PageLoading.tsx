'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TechLoader from './TechLoader';

interface PageLoadingProps {
  isLoading: boolean;
  variant?: 'circuit' | 'code' | 'binary';
}

const PageLoading = ({ isLoading, variant = 'circuit' }: PageLoadingProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-sm dark:bg-background/95"
        >
          <TechLoader variant={variant} size="lg" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoading; 