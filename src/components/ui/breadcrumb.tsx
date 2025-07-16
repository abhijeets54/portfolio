'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const pathname = usePathname();
  
  // Generate breadcrumb items from pathname if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Convert segment to readable label
      let label = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      // Special cases for better labels
      if (segment === 'project') label = 'Projects';
      if (segment === 'extracurricular') label = 'Leadership';
      
      breadcrumbs.push({
        label,
        href: currentPath,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (pathname === '/') return null;

  // Generate JSON-LD structured data for breadcrumbs
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://abhijeets-portfolio.vercel.app${item.href}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center space-x-1 text-sm text-muted-foreground mb-6 ${className}`}
      >
        <ol className="flex items-center space-x-1">
          {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/60" />
              )}
              {item.current ? (
                <span 
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1 inline" />}
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1 inline" />}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumb;
