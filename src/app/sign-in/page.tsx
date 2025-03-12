'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCustomer } from '@/components/providers/CustomerProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';

export default function SignInPage() {
  const { login, isLoading, error } = useCustomer();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Simple validation
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      await login({ email, password });
    } catch (err) {
      // Error is handled by the customer provider
      console.error('Login error:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-[#f8f8f5] p-8 border border-[#e5e2d9]"
      >
        <h1 className="font-serif text-3xl text-[#2c2c27] mb-6 text-center">Sign In</h1>
        
        {(error || formError) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error || formError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#5c5c52] mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-[#e5e2d9] focus:border-[#8a8778] focus:ring-[#8a8778]"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#5c5c52] mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-[#e5e2d9] focus:border-[#8a8778] focus:ring-[#8a8778]"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#2c2c27] border-[#e5e2d9] rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#5c5c52]">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <Link href="/forgot-password" className="text-[#8a8778] hover:text-[#2c2c27]">
                Forgot your password?
              </Link>
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2c2c27] text-[#f4f3f0] py-3 text-sm uppercase tracking-wider hover:bg-[#3d3d35] transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader size="sm" color="#f4f3f0" className="mr-2" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-[#5c5c52]">
              Don't have an account?{' '}
              <Link href="/sign-up" className="text-[#8a8778] hover:text-[#2c2c27]">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 