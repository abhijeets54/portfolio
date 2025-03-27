import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";

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
  title: "Abhijeet Singh",
  description: "Full Stack Developer specializing in React, Next.js, and modern web technologies. View my projects and get in touch.",
  keywords: ["Full Stack Developer", "Web Developer", "React", "Next.js", "Frontend Developer", "JavaScript", "TypeScript", "Node.js", "Portfolio"],
  authors: [{ name: 'Abhijeet Singh' }],
  creator: "Abhijeet Singh",
  publisher: "Abhijeet Singh",
  robots: "index, follow",
  metadataBase: new URL("https://abhijeets-portfolio.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhijeets-portfolio.vercel.app",
    title: "Abhijeet Singh",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies. View my projects and get in touch.",
    siteName: "Abhijeet Singh Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhijeet Singh Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijeet Singh",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies. View my projects and get in touch.",
    creator: "@abhijeets09",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: '/favicon/code-slash.svg' },
    ],
    shortcut: '/favicon/code-slash.svg',
    apple: '/favicon/code-slash.svg',
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: "your-google-verification-code", // Add this when you have it
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LoadingProvider>
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
            <AnalyticsProvider />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
