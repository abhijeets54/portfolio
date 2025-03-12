import { 
  createCustomer, 
  customerLogin, 
  getCustomer 
} from './shopify';

// Types for customer authentication
export interface CustomerCredentials {
  email: string;
  password: string;
}

export interface CustomerRegistration extends CustomerCredentials {
  firstName: string;
  lastName: string;
  acceptsMarketing?: boolean;
}

export interface CustomerSession {
  accessToken: string;
  expiresAt: string;
}

// Local storage keys
const CUSTOMER_TOKEN_KEY = 'ankkor-customer-token';

/**
 * Register a new customer with Shopify
 * @param registration Customer registration data
 * @returns Customer data and access token if successful
 */
export async function registerCustomer(registration: CustomerRegistration) {
  try {
    const { email, password, firstName, lastName, acceptsMarketing = false } = registration;
    
    const result = await createCustomer({
      email,
      password,
      firstName,
      lastName,
      acceptsMarketing
    });
    
    if (result.customerUserErrors && result.customerUserErrors.length > 0) {
      throw new Error(result.customerUserErrors[0].message);
    }
    
    // After registration, log the customer in
    return await loginCustomer({ email, password });
  } catch (error) {
    console.error('Error registering customer:', error);
    throw error;
  }
}

/**
 * Log in a customer with Shopify
 * @param credentials Customer credentials
 * @returns Customer data and access token if successful
 */
export async function loginCustomer(credentials: CustomerCredentials) {
  try {
    const { email, password } = credentials;
    
    const result = await customerLogin(email, password);
    
    if (result.customerUserErrors && result.customerUserErrors.length > 0) {
      throw new Error(result.customerUserErrors[0].message);
    }
    
    const { accessToken, expiresAt } = result.customerAccessToken;
    
    // Store the token in localStorage
    saveCustomerToken({ accessToken, expiresAt });
    
    // Get customer data
    const customer = await getCustomer(accessToken);
    
    return {
      customer,
      accessToken,
      expiresAt
    };
  } catch (error) {
    console.error('Error logging in customer:', error);
    throw error;
  }
}

/**
 * Log out the current customer
 */
export function logoutCustomer() {
  localStorage.removeItem(CUSTOMER_TOKEN_KEY);
}

/**
 * Get the current customer session from localStorage
 * @returns Customer session if available and not expired
 */
export function getCustomerSession(): CustomerSession | null {
  try {
    const sessionData = localStorage.getItem(CUSTOMER_TOKEN_KEY);
    
    if (!sessionData) {
      return null;
    }
    
    const session = JSON.parse(sessionData) as CustomerSession;
    
    // Check if the token is expired
    if (new Date(session.expiresAt) < new Date()) {
      localStorage.removeItem(CUSTOMER_TOKEN_KEY);
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Error getting customer session:', error);
    return null;
  }
}

/**
 * Save the customer token to localStorage
 * @param session Customer session data
 */
function saveCustomerToken(session: CustomerSession) {
  localStorage.setItem(CUSTOMER_TOKEN_KEY, JSON.stringify(session));
}

/**
 * Check if a customer is logged in
 * @returns True if a customer is logged in
 */
export function isCustomerLoggedIn(): boolean {
  return getCustomerSession() !== null;
}

/**
 * Get the current customer data
 * @returns Customer data if logged in
 */
export async function getCurrentCustomer() {
  try {
    const session = getCustomerSession();
    
    if (!session) {
      return null;
    }
    
    const customer = await getCustomer(session.accessToken);
    return customer;
  } catch (error) {
    console.error('Error getting current customer:', error);
    return null;
  }
} 