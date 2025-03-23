"use client";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { LoadingProvider } from "@/components/providers/LoadingProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ToastProvider>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </ToastProvider>
    </ThemeProvider>
  );
} 