'use client';

export function Analytics() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      {/* Add your analytics scripts here */}
      {/* Example for Google Analytics: */}
      {/* <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      /> */}
    </>
  );
} 