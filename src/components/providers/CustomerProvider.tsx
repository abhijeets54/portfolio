'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CustomerCredentials, 
  CustomerRegistration, 
  getCustomerSession, 
  getCurrentCustomer, 
  isCustomerLoggedIn, 
  loginCustomer, 
  logoutCustomer, 
  registerCustomer 
} from '@/lib/auth';
import { useToast } from '@/components/ui/toast';

// Customer context type
interface CustomerContextType {
  customer: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: CustomerCredentials) => Promise<void>;
  register: (registration: CustomerRegistration) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// Create the context
const CustomerContext = createContext<CustomerContextType>({
  customer: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null
});

// Custom hook to use the customer context
export const useCustomer = () => useContext(CustomerContext);

// Provider component
export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { addToast } = useToast();

  // Check if the customer is logged in on mount
  useEffect(() => {
    const checkCustomerSession = async () => {
      try {
        // Clear any test customer data that might be persisted
        const isFirstLoad = sessionStorage.getItem('customerChecked') !== 'true';
        
        if (isFirstLoad) {
          // Clear any existing customer session on first load
          logoutCustomer();
          sessionStorage.setItem('customerChecked', 'true');
          setIsLoading(false);
          return;
        }
        
        // Only check for customer session if not first load
        if (isCustomerLoggedIn()) {
          const customerData = await getCurrentCustomer();
          setCustomer(customerData);
        }
      } catch (err) {
        console.error('Error checking customer session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkCustomerSession();
  }, []);

  // Login function
  const login = async (credentials: CustomerCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await loginCustomer(credentials);
      setCustomer(result.customer);
      
      // Show success toast notification
      addToast(`Welcome back, ${result.customer?.firstName || 'there'}!`, 'success');
      
      // Redirect to homepage instead of account page
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      
      // Show error toast notification
      addToast(err instanceof Error ? err.message : 'An error occurred during login', 'error');
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (registration: CustomerRegistration) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await registerCustomer(registration);
      setCustomer(result.customer);
      
      // Show success toast notification
      addToast(`Welcome to Ankkor, ${result.customer?.firstName}!`, 'success');
      
      // Redirect to homepage instead of account page
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
      
      // Show error toast notification
      addToast(err instanceof Error ? err.message : 'An error occurred during registration', 'error');
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    logoutCustomer();
    setCustomer(null);
    
    // Show info toast notification
    addToast('You have been signed out successfully', 'info');
    
    router.push('/');
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        isLoading,
        isAuthenticated: !!customer,
        login,
        register,
        logout,
        error
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
} 