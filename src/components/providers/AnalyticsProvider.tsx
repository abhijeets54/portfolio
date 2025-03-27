'use client';

import { Analytics } from '@vercel/analytics/react';

export function AnalyticsProvider() {
  return (
    <Analytics 
      mode="production"
      debug={process.env.NODE_ENV === 'development'}
    />
  );
} 