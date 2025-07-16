'use client';

import { Analytics } from '@vercel/analytics/react';
import { useEffect, useState } from 'react';

export function AnalyticsProvider() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only render in production and if not likely to be blocked
    if (process.env.NODE_ENV === 'production') {
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  try {
    return (
      <Analytics
        mode="production"
        debug={false}
      />
    );
  } catch (error) {
    console.log('Vercel Analytics failed to load:', error);
    return null;
  }
}