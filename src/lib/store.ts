import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Theme state
type ThemeState = {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Simple form state for contact form
type FormState = {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  submitStatus: 'idle' | 'success' | 'error';
  setSubmitStatus: (status: 'idle' | 'success' | 'error') => void;
};

export const useFormStore = create<FormState>((set) => ({
  isSubmitting: false,
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  submitStatus: 'idle',
  setSubmitStatus: (submitStatus) => set({ submitStatus }),
}));

// Portfolio viewing state (for mobile navigation, etc.)
type PortfolioState = {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
};

export const usePortfolioStore = create<PortfolioState>((set) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  activeSection: 'home',
  setActiveSection: (activeSection) => set({ activeSection }),
})); 