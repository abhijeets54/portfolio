import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/cart/CartProvider";
import LoadingProvider from "@/components/providers/LoadingProvider";
import { CustomerProvider } from "@/components/providers/CustomerProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Serif font for headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Sans-serif font for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ankkor | Timeless Menswear",
  description: "Elevated essentials for the discerning gentleman. Impeccably tailored garments crafted from the finest materials.",
  keywords: ["menswear", "luxury clothing", "tailored", "shirts", "pants", "accessories"],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased min-h-screen bg-[#f8f8f5]`}
      >
        <CustomerProvider>
          <CartProvider>
            <LoadingProvider>
              <Navbar />
              <main className="pt-16">
                {children}
              </main>
              <Footer />
            </LoadingProvider>
          </CartProvider>
        </CustomerProvider>
      </body>
    </html>
  );
}
