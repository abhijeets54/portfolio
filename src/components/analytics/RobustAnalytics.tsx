'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-3TYLFW9TQ8';
const CLARITY_PROJECT_ID = 'sfzmxu1l0l';

export default function RobustAnalytics() {
  useEffect(() => {
    // Fallback analytics implementation that works even with ad blockers
    const initFallbackAnalytics = () => {
      // Simple page view tracking
      const trackPageView = () => {
        if (typeof window !== 'undefined') {
          console.log('Page view tracked:', window.location.href);
          
          // You can send to your own analytics endpoint here
          // fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ page: window.location.href }) })
        }
      };

      // Track page view
      trackPageView();

      // Track user interactions
      const trackInteraction = (event: Event) => {
        console.log('User interaction:', event.type);
      };

      // Add event listeners for basic tracking
      ['click', 'scroll', 'keydown'].forEach(eventType => {
        document.addEventListener(eventType, trackInteraction, { passive: true, once: true });
      });
    };

    // Initialize fallback analytics
    initFallbackAnalytics();

    // Check if analytics scripts are blocked
    const checkAnalyticsBlocked = () => {
      setTimeout(() => {
        const gaBlocked = typeof (window as any).gtag === 'undefined';
        const clarityBlocked = typeof (window as any).clarity === 'undefined';
        
        if (gaBlocked || clarityBlocked) {
          console.log('Analytics blocked by ad blocker - using fallback tracking');
        }
      }, 3000);
    };

    checkAnalyticsBlocked();
  }, []);

  return (
    <>
      {/* Google Analytics with error handling */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
        onError={() => {
          console.log('Google Analytics blocked - using fallback');
        }}
      />
      <Script 
        id="google-analytics" 
        strategy="lazyOnload"
        onError={() => {
          console.log('Google Analytics config blocked - using fallback');
        }}
      >
        {`
          try {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          } catch (error) {
            console.log('Google Analytics initialization failed:', error);
          }
        `}
      </Script>

      {/* Microsoft Clarity with error handling */}
      <Script
        id="microsoft-clarity"
        strategy="lazyOnload"
        onError={() => {
          console.log('Microsoft Clarity blocked - using fallback');
        }}
      >
        {`
          try {
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          } catch (error) {
            console.log('Microsoft Clarity initialization failed:', error);
          }
        `}
      </Script>
    </>
  );
}

// Enhanced tracking functions with fallbacks
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'Portfolio Interaction',
        event_label: parameters?.label || '',
        value: parameters?.value || 0,
        ...parameters,
      });
    } else {
      // Fallback tracking
      console.log('Event tracked (fallback):', eventName, parameters);
    }
  } catch (error) {
    console.log('Event tracking failed:', error);
  }
};

export const trackPageView = (url: string, title: string) => {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: title,
      });
    } else {
      // Fallback tracking
      console.log('Page view tracked (fallback):', url, title);
    }
  } catch (error) {
    console.log('Page view tracking failed:', error);
  }
};
