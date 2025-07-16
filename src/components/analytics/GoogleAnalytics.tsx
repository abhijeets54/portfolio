'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-3TYLFW9TQ8';

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            // Enhanced ecommerce and user engagement
            custom_map: {
              'custom_parameter_1': 'portfolio_section'
            },
            // Privacy settings
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
          
          // Track custom events for portfolio
          gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            content_group1: 'Portfolio'
          });
        `}
      </Script>
    </>
  );
}

// Helper function to track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      event_category: 'Portfolio Interaction',
      event_label: parameters?.label || '',
      value: parameters?.value || 0,
      ...parameters,
    });
  }
};

// Helper function to track page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    });
  }
};

// Helper function to track contact form submissions
export const trackContactForm = (method: string) => {
  trackEvent('contact_form_submit', {
    event_category: 'Lead Generation',
    event_label: method,
    value: 1,
  });
};

// Helper function to track project views
export const trackProjectView = (projectId: string, projectTitle: string) => {
  trackEvent('project_view', {
    event_category: 'Portfolio Engagement',
    event_label: projectId,
    custom_parameter_1: projectTitle,
  });
};

// Helper function to track resume downloads
export const trackResumeDownload = () => {
  trackEvent('resume_download', {
    event_category: 'Lead Generation',
    event_label: 'PDF Download',
    value: 1,
  });
};
