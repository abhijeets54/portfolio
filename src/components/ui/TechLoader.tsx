'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TechLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circuit' | 'code' | 'binary';
  className?: string;
}

const TechLoader = ({ 
  size = 'md', 
  variant = 'circuit', 
  className = '' 
}: TechLoaderProps) => {
  // Size mappings
  const sizeMap = {
    sm: {
      container: 'w-16 h-16',
      text: 'text-xs',
    },
    md: {
      container: 'w-24 h-24',
      text: 'text-sm',
    },
    lg: {
      container: 'w-32 h-32',
      text: 'text-base',
    },
  };

  // Circuit Loader - Inspired by circuit boards
  if (variant === 'circuit') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className={`relative ${sizeMap[size].container}`}>
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-800"
            style={{ borderTopColor: 'var(--accent)', borderRightColor: 'var(--accent)' }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.div 
            className="absolute inset-3 rounded-full border-2 border-gray-200 dark:border-gray-800"
            style={{ borderBottomColor: 'var(--accent)', borderLeftColor: 'var(--accent)' }}
            animate={{ rotate: -360 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.div 
            className="absolute inset-6 rounded-sm border-2 border-gray-200 dark:border-gray-800"
            style={{ borderTopColor: 'var(--accent)', borderRightColor: 'var(--accent)' }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent pulse-animation" />
          </div>
        </div>
        <p className={`mt-4 font-mono text-foreground ${sizeMap[size].text}`}>Loading System</p>
      </div>
    );
  }

  // Code Loader - Inspired by coding brackets
  if (variant === 'code') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className={`relative ${sizeMap[size].container} flex items-center justify-center`}>
          <div className="flex items-center space-x-1">
            <motion.div 
              className="text-2xl font-mono text-accent"
              animate={{ 
                opacity: [0, 1, 0],
                x: [-10, 0, -10]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {'{'}
            </motion.div>
            <motion.div 
              className="text-2xl font-mono text-foreground"
              animate={{ 
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.3
              }}
            >
              {'//'}
            </motion.div>
            <motion.div 
              className="text-2xl font-mono text-accent"
              animate={{ 
                opacity: [0, 1, 0],
                x: [10, 0, 10]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.6
              }}
            >
              {'}'}
            </motion.div>
          </div>
        </div>
        <p className={`mt-4 font-mono text-foreground ${sizeMap[size].text}`}>Compiling Code</p>
      </div>
    );
  }

  // Binary Loader - Inspired by binary code
  if (variant === 'binary') {
    const digits = ['0', '1'];
    
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className={`relative ${sizeMap[size].container} flex items-center justify-center`}>
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 16 }).map((_, index) => (
              <motion.div 
                key={index}
                className="w-5 h-5 flex items-center justify-center"
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.1 % 1
                }}
              >
                <span className="font-mono text-sm text-accent">
                  {digits[Math.floor(Math.random() * digits.length)]}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
        <p className={`mt-4 font-mono text-foreground ${sizeMap[size].text}`}>Processing Data</p>
      </div>
    );
  }

  // Default fallback
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`relative ${sizeMap[size].container}`}>
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-800"
          style={{ borderTopColor: 'var(--accent)' }}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>
      <p className={`mt-4 font-mono text-foreground ${sizeMap[size].text}`}>Loading</p>
    </div>
  );
};

export default TechLoader; 