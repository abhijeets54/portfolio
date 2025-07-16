'use client';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { useEffect, useState } from 'react';

export default function ConditionalSpeedInsights() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Only load in production and if not blocked
    if (process.env.NODE_ENV === 'production') {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined') {
        // Simple check to see if analytics are likely to be blocked
        const userAgent = navigator.userAgent.toLowerCase();
        const hasAdBlocker = userAgent.includes('adblock') || 
                           userAgent.includes('ublock') || 
                           userAgent.includes('ghostery');
        
        if (!hasAdBlocker) {
          setShouldLoad(true);
        }
      }
    }
  }, []);

  // Only render SpeedInsights if conditions are met
  if (!shouldLoad) {
    return null;
  }

  return (
    <SpeedInsights />
  );
}
