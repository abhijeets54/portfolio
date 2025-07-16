'use client';

import { useEffect } from 'react';

// Core Web Vitals monitoring for SEO
export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Monitor Core Web Vitals
    const reportWebVitals = (metric: any) => {
      // Send to Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }

      // Send to console for debugging
      console.log('Web Vital:', metric);

      // You can also send to other analytics services here
      // Example: Vercel Analytics, Mixpanel, etc.
    };

    // Import and use web-vitals library
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(reportWebVitals);
      onFID(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
      onINP(reportWebVitals);
    });

    // Monitor page load performance
    const measurePageLoad = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const metrics = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            request: navigation.responseStart - navigation.requestStart,
            response: navigation.responseEnd - navigation.responseStart,
            dom: navigation.domContentLoadedEventEnd - navigation.responseEnd,
            load: navigation.loadEventEnd - navigation.loadEventStart,
            total: navigation.loadEventEnd - navigation.navigationStart,
          };

          // Send to analytics
          if ((window as any).gtag) {
            Object.entries(metrics).forEach(([key, value]) => {
              (window as any).gtag('event', 'page_load_timing', {
                event_category: 'Performance',
                event_label: key,
                value: Math.round(value),
                non_interaction: true,
              });
            });
          }

          console.log('Page Load Metrics:', metrics);
        }
      }
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePageLoad();
    } else {
      window.addEventListener('load', measurePageLoad);
    }

    // Monitor resource loading
    const observeResources = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'resource') {
              const resource = entry as PerformanceResourceTiming;
              
              // Track slow resources
              if (resource.duration > 1000) {
                console.warn('Slow resource:', resource.name, resource.duration);
                
                if ((window as any).gtag) {
                  (window as any).gtag('event', 'slow_resource', {
                    event_category: 'Performance',
                    event_label: resource.name,
                    value: Math.round(resource.duration),
                    non_interaction: true,
                  });
                }
              }
            }
          });
        });

        observer.observe({ entryTypes: ['resource'] });

        return () => observer.disconnect();
      }
    };

    const cleanup = observeResources();

    // Monitor memory usage (if available)
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const memoryInfo = {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
        };

        // Log memory usage periodically
        console.log('Memory Usage:', memoryInfo);

        // Alert if memory usage is high
        const usagePercent = (memoryInfo.used / memoryInfo.limit) * 100;
        if (usagePercent > 80) {
          console.warn('High memory usage detected:', usagePercent.toFixed(2) + '%');
        }
      }
    };

    // Monitor memory every 30 seconds
    const memoryInterval = setInterval(monitorMemory, 30000);

    // Cleanup
    return () => {
      if (cleanup) cleanup();
      clearInterval(memoryInterval);
      window.removeEventListener('load', measurePageLoad);
    };
  }, []);

  // Monitor user interactions for better UX insights
  useEffect(() => {
    const trackInteraction = (event: Event) => {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'user_interaction', {
          event_category: 'Engagement',
          event_label: event.type,
          non_interaction: false,
        });
      }
    };

    // Track important interactions
    const events = ['click', 'scroll', 'keydown'];
    events.forEach(eventType => {
      document.addEventListener(eventType, trackInteraction, { passive: true });
    });

    return () => {
      events.forEach(eventType => {
        document.removeEventListener(eventType, trackInteraction);
      });
    };
  }, []);

  return null; // This component doesn't render anything
}
