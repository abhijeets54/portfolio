'use client';

import Script from 'next/script';

const CLARITY_PROJECT_ID = 'sfzmxu1l0l';

export default function MicrosoftClarity() {
  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        `,
      }}
    />
  );
}

// Helper function to track custom Clarity events
export const trackClarityEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('event', eventName, data);
  }
};

// Helper function to identify users (for better session tracking)
export const identifyUser = (userId: string, sessionData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('identify', userId, sessionData);
  }
};

// Helper function to set custom tags
export const setClarityTag = (key: string, value: string) => {
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('set', key, value);
  }
};
