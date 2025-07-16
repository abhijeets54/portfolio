// SEO Configuration and Utilities for Portfolio Website
// Updated for 2025 SEO Best Practices

export const seoConfig = {
  baseUrl: 'https://abhijeets-portfolio.vercel.app',
  siteName: 'Abhijeet Singh Portfolio',
  defaultTitle: 'Abhijeet Singh - Full Stack Developer | React, Next.js, AI/ML Expert',
  defaultDescription: '🚀 Full Stack Developer & AI/ML Expert specializing in React, Next.js, TypeScript, and modern web technologies. 5+ projects delivered, 45% revenue increase for clients. Available for freelance & full-time opportunities in 2025.',
  author: {
    name: 'Abhijeet Singh',
    email: 'abhijeets09@gmail.com',
    twitter: '@abhijeets09',
    linkedin: 'https://linkedin.com/in/abhijeets09',
    github: 'https://github.com/abhijeets09',
  },
  social: {
    twitter: '@abhijeets09',
    linkedin: 'abhijeets09',
    github: 'abhijeets09',
    instagram: 'abhijeets09',
  },
  keywords: [
    // Primary keywords
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'JavaScript Developer',
    'Node.js Developer',
    'AI ML Developer',
    'Web Developer',
    
    // Location-based keywords
    'Full Stack Developer India',
    'React Developer Punjab',
    'Next.js Developer Ludhiana',
    'Web Developer India',
    
    // Service keywords
    'E-commerce Development',
    'Web Application Development',
    'AI Integration',
    'Portfolio Website Development',
    'MERN Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    
    // Technology keywords
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Express.js',
    'MongoDB',
    'PostgreSQL',
    'Python',
    'Django',
    'AI',
    'Machine Learning',
    'Tailwind CSS',
    'Framer Motion',
    'Shopify Development',
    'API Development',
    
    // Year-specific and trending
    '2025',
    'Latest Web Technologies',
    'Modern Web Development',
    'Responsive Design',
    'PWA Development',
    'Performance Optimization',
    'SEO Optimization',
  ],
  images: {
    default: '/og-image.png',
    profile: '/pp.webp',
    logo: '/logo.svg',
  },
};

// Generate page-specific SEO data
export function generatePageSEO(page: {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
}) {
  const {
    title,
    description,
    keywords = [],
    path = '',
    image,
    type = 'website',
    publishedTime,
    modifiedTime,
  } = page;

  const fullTitle = title 
    ? `${title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle;

  const fullDescription = description || seoConfig.defaultDescription;
  
  const allKeywords = [...seoConfig.keywords, ...keywords];
  
  const canonical = `${seoConfig.baseUrl}${path}`;
  
  const ogImage = image ? `${seoConfig.baseUrl}${image}` : `${seoConfig.baseUrl}${seoConfig.images.default}`;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    canonical,
    openGraph: {
      type,
      title: fullTitle,
      description: fullDescription,
      url: canonical,
      siteName: seoConfig.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title || 'Abhijeet Singh Portfolio'} - Full Stack Developer`,
        },
      ],
      locale: 'en_US',
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.social.twitter,
      creator: seoConfig.social.twitter,
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
    },
  };
}

// Generate JSON-LD structured data for projects
export function generateProjectJsonLd(project: {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${seoConfig.baseUrl}/project/${project.id}`,
    name: project.title,
    description: project.description,
    url: project.liveUrl,
    image: `${seoConfig.baseUrl}${project.image}`,
    author: {
      '@type': 'Person',
      '@id': `${seoConfig.baseUrl}/#person`,
      name: seoConfig.author.name,
      url: seoConfig.baseUrl,
    },
    creator: {
      '@type': 'Person',
      '@id': `${seoConfig.baseUrl}/#person`,
    },
    keywords: project.tags.join(', '),
    genre: project.category || 'Web Development',
    dateCreated: '2024-01-01', // Update with actual dates
    dateModified: '2025-07-16',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by/4.0/',
  };
}

// Generate JSON-LD for blog posts (if you add a blog)
export function generateBlogPostJsonLd(post: {
  title: string;
  description: string;
  content: string;
  publishedTime: string;
  modifiedTime?: string;
  tags: string[];
  slug: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${seoConfig.baseUrl}/blog/${post.slug}`,
    headline: post.title,
    description: post.description,
    articleBody: post.content,
    url: `${seoConfig.baseUrl}/blog/${post.slug}`,
    image: post.image ? `${seoConfig.baseUrl}${post.image}` : `${seoConfig.baseUrl}${seoConfig.images.default}`,
    datePublished: post.publishedTime,
    dateModified: post.modifiedTime || post.publishedTime,
    author: {
      '@type': 'Person',
      '@id': `${seoConfig.baseUrl}/#person`,
      name: seoConfig.author.name,
      url: seoConfig.baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${seoConfig.baseUrl}/#organization`,
      name: seoConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.baseUrl}${seoConfig.images.logo}`,
      },
    },
    keywords: post.tags.join(', '),
    articleSection: 'Technology',
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${seoConfig.baseUrl}/blog/${post.slug}`,
    },
  };
}

// Generate FAQ JSON-LD (useful for contact/about pages)
export function generateFAQJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
