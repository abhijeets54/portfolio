'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCustomer } from '@/components/providers/CustomerProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';

export default function SignUpPage() {
  const { register, isLoading, error } = useCustomer();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Simple validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setFormError('Password must be at least 8 characters long');
      return;
    }

    try {
      await register({
        firstName,
        lastName,
        email,
        password,
        acceptsMarketing
      });
    } catch (err) {
      // Error is handled by the customer provider
      console.error('Registration error:', err);
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
        <h1 className="font-serif text-3xl text-[#2c2c27] mb-6 text-center">Create Account</h1>
        
        {(error || formError) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error || formError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#5c5c52] mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border-[#e5e2d9] focus:border-[#8a8778] focus:ring-[#8a8778]"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[#5c5c52] mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border-[#e5e2d9] focus:border-[#8a8778] focus:ring-[#8a8778]"
                required
              />
            </div>
          </div>
          
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
            <p className="mt-1 text-xs text-[#8a8778]">
              Password must be at least 8 characters long
            </p>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#5c5c52] mb-1">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-[#e5e2d9] focus:border-[#8a8778] focus:ring-[#8a8778]"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="acceptsMarketing"
              name="acceptsMarketing"
              type="checkbox"
              checked={acceptsMarketing}
              onChange={(e) => setAcceptsMarketing(e.target.checked)}
              className="h-4 w-4 text-[#2c2c27] border-[#e5e2d9] rounded"
            />
            <label htmlFor="acceptsMarketing" className="ml-2 block text-sm text-[#5c5c52]">
              Subscribe to our newsletter for exclusive offers and updates
            </label>
          </div>
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2c2c27] text-[#f4f3f0] py-3 text-sm uppercase tracking-wider hover:bg-[#3d3d35] transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader size="sm" color="#f4f3f0" className="mr-2" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-[#5c5c52]">
              Already have an account?{' '}
              <Link href="/sign-in" className="text-[#8a8778] hover:text-[#2c2c27]">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 