import Head from 'next/head';

interface PageSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  jsonLd?: object;
}

export default function PageSEO({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/og-image.png',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author = 'Abhijeet Singh',
  section,
  tags = [],
  noindex = false,
  nofollow = false,
  jsonLd,
}: PageSEOProps) {
  const baseUrl = 'https://abhijeets-portfolio.vercel.app';
  const fullTitle = title 
    ? `${title} | Abhijeet Singh - Full Stack Developer`
    : 'Abhijeet Singh - Full Stack Developer | React, Next.js, AI/ML Expert';
  
  const metaDescription = description || 
    '🚀 Full Stack Developer & AI/ML Expert specializing in React, Next.js, TypeScript, and modern web technologies. 5+ projects delivered, 45% revenue increase for clients. Available for freelance & full-time opportunities in 2025.';

  const allKeywords = [
    'Abhijeet Singh',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'AI ML Developer',
    'Web Developer India',
    'Portfolio 2025',
    ...keywords,
    ...tags
  ].join(', ');

  const robotsContent = `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}, max-image-preview:large, max-snippet:-1, max-video-preview:-1`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={`${baseUrl}${canonical}`} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title || 'Abhijeet Singh Portfolio'} - Full Stack Developer`} />
      <meta property="og:url" content={`${baseUrl}${canonical || ''}`} />
      <meta property="og:site_name" content="Abhijeet Singh Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific meta tags */}
      {ogType === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@abhijeets09" />
      <meta name="twitter:creator" content="@abhijeets09" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      <meta name="twitter:image:alt" content={`${title || 'Abhijeet Singh Portfolio'} - Full Stack Developer`} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="application-name" content="Abhijeet Singh Portfolio" />
      <meta name="apple-mobile-web-app-title" content="Abhijeet Singh" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS Prefetch for better performance */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://vercel.com" />
      
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}
