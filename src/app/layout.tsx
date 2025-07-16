import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { SpeedInsights } from '@vercel/speed-insights/next';
import PerformanceMonitor from '@/components/analytics/PerformanceMonitor';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import MicrosoftClarity from '@/components/analytics/MicrosoftClarity';

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
  title: {
    default: "Abhijeet Singh - Full Stack Developer | React, Next.js, AI/ML Expert",
    template: "%s | Abhijeet Singh - Full Stack Developer"
  },
  description: "🚀 Full Stack Developer & AI/ML Expert specializing in React, Next.js, TypeScript, and modern web technologies. 5+ projects delivered, 45% revenue increase for clients. Available for freelance & full-time opportunities in 2025.",
  keywords: [
    // Primary keywords
    "Full Stack Developer", "React Developer", "Next.js Developer", "TypeScript Developer",
    "JavaScript Developer", "Node.js Developer", "AI ML Developer", "Web Developer",
    // Location-based keywords
    "Full Stack Developer India", "React Developer Punjab", "Next.js Developer Ludhiana",
    // Service keywords
    "E-commerce Development", "Web Application Development", "AI Integration",
    "Portfolio Website Development", "MERN Stack Developer", "Frontend Developer",
    // Technology keywords
    "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express.js",
    "MongoDB", "PostgreSQL", "Python", "Django", "AI", "Machine Learning",
    "Tailwind CSS", "Framer Motion", "Shopify Development", "API Development",
    // Year-specific
    "2025", "Latest Web Technologies", "Modern Web Development"
  ],
  authors: [{ name: 'Abhijeet Singh', url: 'https://abhijeets-portfolio.vercel.app' }],
  creator: "Abhijeet Singh",
  publisher: "Abhijeet Singh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL("https://abhijeets-portfolio.vercel.app"),
  alternates: {
    canonical: "https://abhijeets-portfolio.vercel.app",
    languages: {
      'en-US': 'https://abhijeets-portfolio.vercel.app',
      'en': 'https://abhijeets-portfolio.vercel.app',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhijeets-portfolio.vercel.app",
    title: "Abhijeet Singh - Full Stack Developer | React, Next.js, AI/ML Expert",
    description: "🚀 Full Stack Developer & AI/ML Expert with 5+ successful projects. Specialized in React, Next.js, TypeScript. Increased client revenue by 45%. Available for hire in 2025.",
    siteName: "Abhijeet Singh Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhijeet Singh - Full Stack Developer Portfolio showcasing React, Next.js, and AI/ML projects",
        type: "image/png",
      },
      {
        url: "/pp.webp",
        width: 400,
        height: 400,
        alt: "Abhijeet Singh - Professional Developer Photo",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@abhijeets09",
    creator: "@abhijeets09",
    title: "Abhijeet Singh - Full Stack Developer | React, Next.js, AI/ML Expert",
    description: "🚀 Full Stack Developer & AI/ML Expert. 5+ projects, 45% client revenue increase. React, Next.js, TypeScript specialist. Available for hire 2025.",
    images: {
      url: "/og-image.png",
      alt: "Abhijeet Singh Portfolio - Full Stack Developer",
    },
  },
  icons: {
    icon: [
      { url: '/favicon/code-slash.svg', sizes: 'any' },
      { url: '/favicon/code-slash.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicon/code-slash.svg', sizes: '32x32', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon/code-slash.svg',
    apple: [
      { url: '/favicon/code-slash.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  verification: {
    google: "I2f-qtYYHaXP-WVvEUU_EkaSN6a1p9Xi_IkqNYs_R7o", // Google Search Console verification
    yandex: "your-yandex-verification-code", // Add Yandex verification when available
    yahoo: "your-yahoo-verification-code", // Add Yahoo verification when available
    other: {
      'msvalidate.01': 'your-bing-verification-code', // Bing verification when available
    },
  },
  category: 'technology',
  classification: 'Portfolio Website',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  other: {
    'google-site-verification': 'I2f-qtYYHaXP-WVvEUU_EkaSN6a1p9Xi_IkqNYs_R7o',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'application-name': 'Abhijeet Singh Portfolio',
    'apple-mobile-web-app-title': 'Abhijeet Singh',
    'theme-color': '#000000',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://abhijeets-portfolio.vercel.app/#person",
        "name": "Abhijeet Singh",
        "givenName": "Abhijeet",
        "familyName": "Singh",
        "url": "https://abhijeets-portfolio.vercel.app",
        "image": {
          "@type": "ImageObject",
          "url": "https://abhijeets-portfolio.vercel.app/pp.webp",
          "width": 400,
          "height": 400
        },
        "jobTitle": "Full Stack Developer",
        "description": "Full Stack Developer specializing in React, Next.js, and modern web technologies. Experienced in AI/ML development and digital solutions.",
        "email": "abhijeets09@gmail.com",
        "telephone": "+91-9876543210",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ludhiana",
          "addressRegion": "Punjab",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://github.com/abhijeets09",
          "https://linkedin.com/in/abhijeets09",
          "https://twitter.com/abhijeets09",
          "https://instagram.com/abhijeets09"
        ],
        "knowsAbout": [
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "Python",
          "AI/ML",
          "Full Stack Development",
          "Web Development",
          "Software Engineering"
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Guru Nanak Dev Engineering College",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ludhiana",
            "addressRegion": "Punjab",
            "addressCountry": "IN"
          }
        },
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "CS50's Introduction to Computer Science",
            "credentialCategory": "Certificate",
            "educationalLevel": "University",
            "recognizedBy": {
              "@type": "EducationalOrganization",
              "name": "Harvard University"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "CS50's Introduction to Artificial Intelligence",
            "credentialCategory": "Certificate",
            "educationalLevel": "University",
            "recognizedBy": {
              "@type": "EducationalOrganization",
              "name": "Harvard University"
            }
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://abhijeets-portfolio.vercel.app/#website",
        "url": "https://abhijeets-portfolio.vercel.app",
        "name": "Abhijeet Singh - Full Stack Developer Portfolio",
        "description": "Portfolio website showcasing full stack development projects, AI/ML applications, and professional experience.",
        "publisher": {
          "@id": "https://abhijeets-portfolio.vercel.app/#person"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://abhijeets-portfolio.vercel.app/projects?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": "https://abhijeets-portfolio.vercel.app/#organization",
        "name": "Abhijeet Singh Development",
        "url": "https://abhijeets-portfolio.vercel.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://abhijeets-portfolio.vercel.app/logo.svg",
          "width": 60,
          "height": 60
        },
        "founder": {
          "@id": "https://abhijeets-portfolio.vercel.app/#person"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "abhijeets09@gmail.com",
          "contactType": "customer service",
          "availableLanguage": ["English", "Hindi", "Punjabi"]
        },
        "areaServed": "Worldwide",
        "serviceType": [
          "Web Development",
          "Full Stack Development",
          "AI/ML Development",
          "E-commerce Development",
          "Mobile App Development"
        ]
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Analytics Components */}
        <GoogleAnalytics />
        <MicrosoftClarity />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LoadingProvider>
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
            <AnalyticsProvider />
            <SpeedInsights />
            <PerformanceMonitor />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
