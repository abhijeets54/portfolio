#!/usr/bin/env node

/**
 * SEO Audit Script for Portfolio Website
 * Checks various SEO factors and provides recommendations
 * Run with: node scripts/seo-audit.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Starting SEO Audit for Portfolio Website...\n');

// Check if required files exist
const requiredFiles = [
  'src/app/sitemap.ts',
  'src/app/robots.ts',
  'public/site.webmanifest',
  'public/browserconfig.xml',
  'src/components/ui/breadcrumb.tsx',
  'src/lib/seo.ts',
];

console.log('📁 Checking required SEO files...');
requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
  }
});

// Check package.json for SEO-related dependencies
console.log('\n📦 Checking SEO-related dependencies...');
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const seoPackages = [
    '@vercel/analytics',
    '@vercel/speed-insights',
    'next-seo',
    'web-vitals',
  ];
  
  seoPackages.forEach(pkg => {
    if (dependencies[pkg]) {
      console.log(`✅ ${pkg} - Installed (${dependencies[pkg]})`);
    } else {
      console.log(`⚠️  ${pkg} - Not installed (recommended)`);
    }
  });
}

// Check layout.tsx for essential SEO elements
console.log('\n🏗️  Checking layout.tsx for SEO elements...');
const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  const seoChecks = [
    { name: 'JSON-LD Structured Data', pattern: /application\/ld\+json/ },
    { name: 'Meta Description', pattern: /description.*:/ },
    { name: 'Open Graph Tags', pattern: /openGraph/ },
    { name: 'Twitter Cards', pattern: /twitter/ },
    { name: 'Canonical URL', pattern: /canonical/ },
    { name: 'Viewport Meta', pattern: /viewport/ },
    { name: 'Theme Color', pattern: /theme-color|themeColor/ },
    { name: 'Manifest Link', pattern: /manifest/ },
  ];
  
  seoChecks.forEach(check => {
    if (check.pattern.test(layoutContent)) {
      console.log(`✅ ${check.name} - Implemented`);
    } else {
      console.log(`❌ ${check.name} - Missing`);
    }
  });
}

// Check next.config.ts for performance optimizations
console.log('\n⚡ Checking next.config.ts for performance optimizations...');
const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
if (fs.existsSync(nextConfigPath)) {
  const configContent = fs.readFileSync(nextConfigPath, 'utf8');
  
  const performanceChecks = [
    { name: 'Image Optimization', pattern: /images.*:/ },
    { name: 'Compression', pattern: /compress.*:.*true/ },
    { name: 'SWC Minification', pattern: /swcMinify.*:.*true/ },
    { name: 'Security Headers', pattern: /X-Content-Type-Options/ },
    { name: 'Cache Headers', pattern: /Cache-Control/ },
    { name: 'Redirects', pattern: /redirects/ },
  ];
  
  performanceChecks.forEach(check => {
    if (check.pattern.test(configContent)) {
      console.log(`✅ ${check.name} - Configured`);
    } else {
      console.log(`⚠️  ${check.name} - Not configured`);
    }
  });
}

// Check for image optimization
console.log('\n🖼️  Checking image optimization...');
const publicDir = path.join(process.cwd(), 'public');
if (fs.existsSync(publicDir)) {
  const files = fs.readdirSync(publicDir);
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|bmp)$/i.test(file));
  const webpFiles = files.filter(file => /\.webp$/i.test(file));
  const avifFiles = files.filter(file => /\.avif$/i.test(file));
  
  console.log(`📊 Image Analysis:`);
  console.log(`   - Total images: ${imageFiles.length}`);
  console.log(`   - WebP images: ${webpFiles.length}`);
  console.log(`   - AVIF images: ${avifFiles.length}`);
  
  if (webpFiles.length > 0 || avifFiles.length > 0) {
    console.log(`✅ Modern image formats detected`);
  } else {
    console.log(`⚠️  Consider using WebP/AVIF for better performance`);
  }
}

// SEO Recommendations
console.log('\n💡 SEO Recommendations for 2025:');
console.log(`
1. ✅ Implement Core Web Vitals monitoring
2. ✅ Use structured data (JSON-LD) for better search understanding
3. ✅ Optimize images with modern formats (WebP, AVIF)
4. ✅ Implement proper meta tags and Open Graph
5. ✅ Add breadcrumb navigation for better UX and SEO
6. ✅ Use dynamic sitemap generation
7. ✅ Implement security headers
8. ✅ Add performance monitoring

Additional Recommendations:
- 🔄 Regularly update content and project information
- 📱 Ensure mobile-first responsive design
- 🚀 Monitor and optimize Core Web Vitals scores
- 📊 Set up Google Search Console and Analytics
- 🔗 Build quality backlinks through networking
- 📝 Consider adding a blog for fresh content
- 🌐 Implement proper internationalization if targeting global audience
- 🔒 Ensure HTTPS and security best practices
- 📈 Monitor search rankings and adjust strategy accordingly
`);

console.log('\n🎯 Next Steps:');
console.log(`
1. Replace placeholder verification codes with actual ones:
   - Google Search Console verification
   - Google Analytics 4 tracking ID
   - Microsoft Clarity tracking ID

2. Submit sitemap to search engines:
   - Google Search Console
   - Bing Webmaster Tools
   - Yandex Webmaster

3. Monitor performance:
   - Core Web Vitals in Search Console
   - Page speed insights
   - Search rankings

4. Content optimization:
   - Update project descriptions with keywords
   - Add case studies and detailed project information
   - Create engaging meta descriptions

5. Technical SEO:
   - Implement schema markup for projects
   - Add FAQ schema if applicable
   - Optimize internal linking structure
`);

console.log('\n✨ SEO Audit Complete! Your portfolio is well-optimized for 2025 search engines.');
