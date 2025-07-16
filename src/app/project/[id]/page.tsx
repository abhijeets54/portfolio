'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import usePageLoading from '@/hooks/usePageLoading';
import ImageContainer from '@/components/ui/ImageContainer';
import Breadcrumb from '@/components/ui/breadcrumb';

// Extended project data with additional details
const projectsData = [
  {
    id: 'initiators-of-change',
    title: 'Initiators of Change – NGO Website',
    description: 'A full-stack web application developed for an NGO to manage operations, track events, and process donations.',
    fullDescription: `
      A full-stack web application developed for an NGO to manage operations, track events, and process donations. The website significantly improved volunteer engagement and streamlined fundraising efforts.
      
      The system includes online event tracking and volunteer registrations, integrated donation processing that handles 200+ donations monthly, and real-time updates that improved user engagement by 40%. With a responsive UI ensuring accessibility across devices and optimized performance that reduced load times by 35%, the platform has transformed how the organization operates.
      
      This project demonstrates my ability to create full-featured web applications that solve real organizational challenges while providing an excellent user experience.
    `,
    image: '/ioc.png',
    tags: ['MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS'],
    liveUrl: 'https://www.initiatorsofchange.com',
    featured: true,
    category: 'Web App',
    goals: [
      'Create a centralized platform for NGO operations management',
      'Develop an online event tracking and volunteer registration system',
      'Implement a secure donation processing system',
      'Optimize user engagement through real-time updates',
      'Ensure cross-device accessibility with responsive design'
    ],
    technologies: {
      frontend: ['React.js', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Express.js', 'MongoDB'],
      deployment: ['Vercel', 'GitHub Actions'],
      other: ['Payment Gateway Integration', 'Real-time Updates'],
    },
    challenges: [
      'Creating a secure donation system that could handle high transaction volumes',
      'Developing a responsive UI that worked across all device sizes',
      'Implementing real-time event updates without performance degradation',
      'Ensuring data privacy for volunteer and donor information'
    ],
    results: [
      'Processing of 200+ donations monthly',
      '40% increase in user engagement through real-time updates',
      '35% reduction in page load times through performance optimization',
      'Significant improvement in volunteer registration and retention'
    ],
    date: 'January 2023',
    duration: '3 months',
  },
  {
    id: 'ankkor',
    title: 'Ankkor – E-commerce Clothing Store',
    description: 'A real-world e-commerce clothing store with a seamless user experience, built with Next.js frontend and Shopify backend.',
    fullDescription: `
      A real-world e-commerce clothing store with a seamless user experience, built with Next.js frontend and Shopify backend, featuring everything from checkout to delivery.
      
      The site features a Shopify-powered backend for robust product & order management, an optimized checkout and payment system, and a delivery tracking system. The aesthetic, clean UI includes subtle but professional animations that enhance the shopping experience, while the contact form is integrated with EmailJS for customer inquiries. The fully mobile-responsive design ensures a smooth shopping experience across all devices.
      
      This project demonstrates my ability to create professional e-commerce solutions with a focus on both aesthetics and functionality.
    `,
    image: '/ankkor.png',
    tags: ['Next.js', 'Shopify', 'Tailwind CSS', 'EmailJS'],
    liveUrl: 'https://ankkor.in/',
    featured: true,
    category: 'E-commerce',
    goals: [
      'Create a premium e-commerce experience with Next.js and Shopify',
      'Develop a seamless checkout and payment flow',
      'Implement an aesthetically pleasing UI with subtle animations',
      'Ensure complete mobile responsiveness',
      'Create effective customer communication channels'
    ],
    technologies: {
      frontend: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Shopify Storefront API', 'EmailJS'],
      deployment: ['Vercel'],
      other: ['Responsive Design', 'Payment Processing Integration'],
    },
    challenges: [
      'Integrating Shopify backend with a custom Next.js frontend',
      'Optimizing the checkout flow for maximum conversion',
      'Creating animations that enhanced UX without being distracting',
      'Ensuring a consistent experience across all device sizes'
    ],
    results: [
      'Seamless shopping experience from browsing to delivery tracking',
      'Professional animations that enhance brand perception',
      'Fully responsive design providing a consistent experience across devices',
      'Effective customer communication through EmailJS integration'
    ],
    date: 'March 2023',
    duration: '2 months',
  },
  {
    id: 'homely',
    title: 'Homely – Full-Stack Food Delivery Platform',
    description: 'A comprehensive full-stack food delivery platform enabling customers to order from local sellers, track deliveries, and analyze nutrition.',
    fullDescription: `
      A comprehensive full-stack food delivery platform enabling customers to order from local sellers, track deliveries, and analyze nutrition, with robust admin and seller dashboards.
      
      The application features multiple user roles (customer, seller, delivery partner) with secure authentication, real-time order tracking and chat using WebSockets, and a comprehensive seller dashboard for menu, order, and payment management. It integrates Cloudinary for image uploads and optimization, and includes an advanced Nutrition Analyzer powered by Google Gemini AI that provides detailed nutritional information for dishes. The UI is interactive and animated using Framer Motion and Shadcn UI components, ensuring a mobile-responsive and accessible design. The backend provides RESTful APIs for robust operations, including payment and refund management, while an admin dashboard offers analytics and reporting.
      
      This project demonstrates my ability to create complex, full-stack applications with multiple user roles, real-time features, and AI integrations.
    `,
    image: '/homely.png',
    tags: ['Next.js', 'TypeScript', 'Express.js', 'MongoDB', 'Cloudinary', 'WebSockets', 'Framer Motion', 'Shadcn UI', 'Google Gemini AI'],
    liveUrl: 'https://homely-frontend-opal.vercel.app',
    featured: true,
    category: 'Full Stack',
    goals: [
      'Create a comprehensive food delivery platform with multiple user roles',
      'Implement real-time order tracking and communication',
      'Develop robust seller and admin dashboards',
      'Integrate AI-powered nutrition analysis',
      'Ensure secure payment and refund processing'
    ],
    technologies: {
      frontend: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Shadcn UI'],
      backend: ['Express.js', 'MongoDB', 'WebSockets', 'REST APIs'],
      deployment: ['Vercel', 'Render'],
      other: ['Cloudinary', 'Google Gemini AI', 'Payment Processing', 'Authentication'],
    },
    challenges: [
      'Managing complex state across multiple user roles and permissions',
      'Implementing real-time communication and order tracking',
      'Creating an AI-powered nutrition analyzer with conversational capabilities',
      'Ensuring secure image uploads and optimization',
      'Building a comprehensive seller dashboard with analytics'
    ],
    results: [
      'Multi-role platform supporting customers, sellers, and delivery partners',
      'Real-time order tracking and communication using WebSockets',
      'AI-powered nutrition analysis with Google Gemini integration',
      'Comprehensive seller dashboard for menu and order management',
      'Secure payment processing and refund management'
    ],
    date: 'April 2024',
    duration: '3 months',
  },
  {
    id: 'd2-global-immigration',
    title: 'D2 Global Immigration – Visa & Immigration Consultancy',
    description: 'A professional website for an immigration consultancy, handling visa-related inquiries and services.',
    fullDescription: `
      A professional website for an immigration consultancy, handling visa-related inquiries and services with a user-friendly interface and SEO-optimized content.
      
      The site features an interactive UI with smooth animations using Framer Motion, a multi-step form for visa inquiries that handles 500+ inquiries monthly, and SEO-optimized content that boosted traffic by 50%. The mobile-responsive design ensures better accessibility, while secure authentication and data handling protect sensitive client information.
      
      This project demonstrates my ability to create websites that not only look professional but also drive business results through effective SEO and user experience design.
    `,
    image: '/d2global.png',
    tags: ['MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://www.d2global.in',
    featured: true,
    category: 'Web App',
    goals: [
      'Create a professional web presence for an immigration consultancy',
      'Develop an interactive UI with smooth animations',
      'Implement a multi-step form for visa inquiries',
      'Optimize content for search engines',
      'Ensure mobile responsiveness and data security'
    ],
    technologies: {
      frontend: ['React.js', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Express.js', 'MongoDB'],
      deployment: ['AWS'],
      other: ['SEO Optimization', 'Multi-step Forms', 'Authentication'],
    },
    challenges: [
      'Creating a multi-step form that balanced comprehensiveness with usability',
      'Implementing smooth animations that enhanced UX without impacting performance',
      'Optimizing content for SEO while maintaining professional tone',
      'Ensuring secure handling of sensitive immigration-related data'
    ],
    results: [
      'Processing of 500+ inquiries monthly through the multi-step form',
      '50% increase in traffic through SEO-optimized content',
      'Improved user engagement through interactive UI with smooth animations',
      'Secure handling of sensitive client information'
    ],
    date: 'June 2023',
    duration: '2 months',
  },
  {
    id: 'ootd',
    title: 'OOTD – AI Powered Fashion Stylist',
    description: 'A comprehensive AI-powered fashion platform that analyzes outfits, generates style recommendations, and creates personalized fashion advice.',
    fullDescription: `
      A comprehensive AI-powered fashion platform that analyzes outfits, generates style recommendations, and creates personalized fashion advice using cutting-edge technologies including Google Gemini AI, Next.js 15, and modern UI components.

      The platform features advanced AI image analysis using Google Gemini Vision API for detailed outfit feedback with numerical style scores (1-10) and improvement suggestions. It includes culturally-aware fashion advice, color palette analysis, and occasion-based recommendations for work, casual, formal, and special events.

      The AI image generation system integrates with multiple services (Hugging Face and Pollinations.ai) with automatic fallback systems, fashion-specific prompts optimized for outfit generation, and high-quality 512x768 resolution images. User management is powered by Clerk with secure authentication, social logins, and comprehensive profile management with style preference learning.

      Advanced image management through Cloudinary provides professional-grade storage and optimization, multiple upload methods (drag & drop, click, camera), automatic format validation and compression. Interactive features include AI-generated dynamic questionnaires, 5-star rating systems, favorites management, and PDF export capabilities.

      The modern UI/UX features responsive design optimized for all devices, dark/light mode with system awareness, fashion-themed loading animations, animated 3D gradient backgrounds, and Framer Motion animations for enhanced user experience.

      This project demonstrates my ability to create sophisticated full-stack applications that leverage cutting-edge AI technologies to provide personalized, professional-grade user experiences while maintaining high performance and security standards.
    `,
    image: '/ootd.png',
    tags: ['Next.js 15', 'Google Gemini AI', 'Clerk', 'Supabase', 'Cloudinary', 'Hugging Face', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://ootd.vercel.app/',
    featured: true,
    category: 'AI',
    goals: [
      'Create a comprehensive AI-powered fashion analysis platform',
      'Implement advanced outfit image analysis with Google Gemini Vision API',
      'Develop AI image generation with multiple service integrations',
      'Build secure user authentication and profile management system',
      'Create professional-grade image storage and optimization',
      'Design responsive UI with modern animations and theming'
    ],
    technologies: {
      frontend: ['Next.js 15', 'React 19', 'TypeScript 5.2', 'Tailwind CSS 3.3', 'Shadcn/ui', 'Framer Motion'],
      backend: ['Google Gemini 2.5 Flash', 'Supabase PostgreSQL', 'Hugging Face API', 'Pollinations.ai'],
      authentication: ['Clerk', 'JWT Integration', 'Social Logins'],
      storage: ['Cloudinary', 'Supabase Storage'],
      deployment: ['Vercel', 'Edge Network'],
      other: ['LangChain', 'Row Level Security', 'Formspree', 'PDF Generation'],
    },
    challenges: [
      'Integrating Google Gemini Vision API for accurate fashion analysis',
      'Creating fallback systems for AI image generation services',
      'Implementing Row Level Security for multi-user data protection',
      'Optimizing image processing and storage for performance',
      'Designing culturally-aware AI recommendations',
      'Building responsive UI that works across all device types'
    ],
    results: [
      'Advanced AI outfit analysis with numerical style scoring',
      'Reliable AI image generation with 99.9% uptime through fallbacks',
      'Secure multi-user platform with comprehensive authentication',
      'Professional image management with automatic optimization',
      'Responsive design with excellent user experience across devices',
      'Production-ready deployment with global edge network'
    ],
    date: 'July 2025',
    duration: '4 months',
  },
  // {
  //   id: 'globalconnect',
  //   title: 'GlobalConnect – AI-Powered Bidding Platform',
  //   description: 'A platform for streamlining communication and bidding for cross-border exports.',
  //   fullDescription: `
  //     A platform for streamlining communication and bidding for cross-border exports, improving efficiency in international trade.
  //
  //     The system includes real-time chat & bidding functionality for exporters, secure authentication and user role-based access control, and AI-driven analytics for predicting competitive bids. The scalable infrastructure supports 1,000+ concurrent users, and as a hackathon finalist project, it demonstrated a 60% improvement in transaction speeds.
  //
  //     This project showcases my ability to create complex real-time systems with AI integration that can handle high user loads while providing valuable business insights.
  //   `,
  //   image: '/gc.png',
  //   tags: ['MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'WebSockets', 'REST APIs'],
  //   liveUrl: 'https://drive.google.com/file/d/1YAFBVTdQV9nDkzl7UNoeN7qasIqdfZ7-/view',
  //   featured: true,
  //   category: 'AI',
  //   goals: [
  //     'Create a platform for cross-border export bidding',
  //     'Implement real-time chat and bidding functionality',
  //     'Develop AI-driven analytics for competitive bid prediction',
  //     'Build a scalable infrastructure for high user loads',
  //     'Improve transaction speeds in international trade'
  //   ],
  //   technologies: {
  //     frontend: ['React.js', 'Redux', 'CSS3', 'Socket.io Client'],
  //     backend: ['Node.js', 'Express.js', 'MongoDB', 'WebSockets'],
  //     deployment: ['AWS'],
  //     other: ['AI Analytics', 'Real-time Communication', 'Role-based Access'],
  //   },
  //   challenges: [
  //     'Creating a scalable WebSocket architecture for real-time bidding',
  //     'Implementing AI algorithms for competitive bid prediction',
  //     'Ensuring secure authentication for international users',
  //     'Building a system that could handle high concurrent usage'
  //   ],
  //   results: [
  //     'Support for 1,000+ concurrent users',
  //     '60% improvement in transaction speeds',
  //     'Real-time communication and bidding functionality',
  //     'Accurate bid predictions through AI-driven analytics'
  //   ],
  //   date: 'November 2023',
  //   duration: '1 month',
  // },
  {
    id: 'digital-evidence-viewer',
    title: 'Digital Evidence Metadata Viewer',
    description: 'A client-side digital forensics tool for securely analyzing files, extracting metadata, and creating reports.',
    fullDescription: `
      A client-side digital forensics tool for securely analyzing files, extracting metadata, generating cryptographic hashes, and creating forensic reports - all without sending any data to a server.

      The application performs all file analysis entirely in the browser, meaning sensitive evidence files never leave the user's device. It provides comprehensive metadata extraction for various file types, cryptographic hash generation (MD5, SHA-256), file signature verification, case management capabilities, and professional PDF report generation. All analysis results are stored securely in the browser using IndexedDB.
      
      This project demonstrates my ability to create secure, privacy-focused applications with advanced client-side processing capabilities for specialized domains like digital forensics.
    `,
    image: '/df.png',
    tags: ['Next.js', 'Clerk', 'TailwindCSS', 'Web Crypto API', 'ExifReader', 'jsPDF', 'IndexedDB'],
    liveUrl: 'https://df-project-nine.vercel.app',
    featured: true,
    category: 'Digital Forensics',
    goals: [
      'Create a secure digital forensics tool with complete client-side processing',
      'Implement comprehensive file metadata extraction and analysis',
      'Develop cryptographic hash generation and file signature verification',
      'Build case management and organization capabilities',
      'Create professional forensic report generation'
    ],
    technologies: {
      frontend: ['Next.js 14 (App Router)', 'TypeScript', 'TailwindCSS', 'React'],
      other: ['Web Crypto API', 'ExifReader', 'jsPDF', 'IndexedDB', 'Clerk Authentication'],
      deployment: ['Vercel'],
    },
    challenges: [
      'Processing large files entirely client-side without performance issues',
      'Implementing complex cryptographic operations in the browser',
      'Creating a secure storage mechanism for forensic data',
      'Generating professional PDF reports with consistent formatting',
      'Ensuring compliance with digital forensics best practices'
    ],
    results: [
      'Secure, privacy-focused file analysis with no server uploads',
      'Comprehensive metadata extraction for various file types',
      'Professional PDF reports for forensic documentation',
      'Case management system for organizing multiple analyses',
      'Secure local storage of analysis results'
    ],
    date: 'February 2024',
    duration: '2 months',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website – Next.js Animated Portfolio',
    description: 'A modern, fully animated portfolio built using Next.js, showcasing projects, skills, and contact info.',
    fullDescription: `
      A modern, fully animated portfolio built using Next.js, showcasing projects, skills, and contact info, with smooth transitions and a professional UI.
      
      The site features a fully responsive and modern UI, smooth animations using Framer Motion, an integrated contact form with EmailJS, a comprehensive projects section with live links, and optimization for fast performance & SEO.
      
      This project demonstrates my frontend development skills, particularly in creating engaging, animated interfaces that provide a professional presentation of work and capabilities.
    `,
    image: '/portfolio.png',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'EmailJS'],
    liveUrl: 'https://abhijeet-portfolio.vercel.app',
    featured: false,
    category: 'Web App',
    goals: [
      'Create a professional portfolio to showcase projects and skills',
      'Implement smooth animations and transitions',
      'Develop a responsive design for all device sizes',
      'Integrate a contact form for communication',
      'Optimize for performance and SEO'
    ],
    technologies: {
      frontend: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
      deployment: ['Vercel'],
      other: ['EmailJS', 'Responsive Design', 'SEO Optimization'],
    },
    challenges: [
      'Creating smooth animations that enhanced the user experience',
      'Implementing a responsive design that looked professional on all devices',
      'Optimizing image loading for performance',
      'Integrating contact functionality securely'
    ],
    results: [
      'Professional presentation of projects and skills',
      'Smooth animations and transitions that enhance user engagement',
      'Fully responsive design that works across all devices',
      'Secure contact functionality through EmailJS integration'
    ],
    date: 'January 2024',
    duration: '2 weeks',
  },
];

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  
  // Find the project by id
  useEffect(() => {
    const projectData = projectsData.find(p => p.id === params.id);
    
    if (projectData) {
      setProject(projectData);
    }
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [params.id]);
  
  // Use the page loading hook
  usePageLoading(isLoading);
  
  if (!project && !isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4 text-foreground">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/projects"
            className="inline-flex items-center text-accent hover:underline"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {!isLoading && project && (
          <>
            {/* Breadcrumb Navigation */}
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Projects', href: '/projects' },
                { label: project.title, href: `/project/${project.id}`, current: true }
              ]}
            />

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Link 
                href="/projects"
                className="project-link flex items-center text-accent text-sm hover:text-accent-foreground"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Projects
              </Link>
            </motion.div>
            
            {/* Project Header */}
            <div className="mb-12">
              <motion.h1 
                className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {project.title}
              </motion.h1>
              
              <motion.div 
                className="flex flex-wrap gap-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {project.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-4 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-muted-foreground">
                  <strong>Completed:</strong> {project.date}
                </span>
                <span className="text-muted-foreground">
                  <strong>Duration:</strong> {project.duration}
                </span>
                <span className="text-muted-foreground">
                  <strong>Category:</strong> {project.category}
                </span>
              </motion.div>
            </div>
            
            {/* Project Image */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ImageContainer
                src={project.image}
                alt={project.title}
                aspectRatio="16/9"
                className="rounded-md mb-4 bg-muted glow-effect"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              />
            </motion.div>
            
            {/* Project Links */}
            <motion.div 
              className="mb-16 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-md transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Live Site
                </a>
              )}
            </motion.div>
            
            {/* Project Description */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-serif mb-6 text-foreground">About the Project</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="whitespace-pre-line text-muted-foreground">
                    {project.fullDescription}
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-serif mb-6 text-foreground">Project Details</h2>
                
                <div className="space-y-8">
                  {/* Goals */}
                  <div>
                    <h3 className="text-xl font-serif mb-4 text-foreground">Goals</h3>
                    <ul className="space-y-2">
                      {project.goals.map((goal: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="h-5 w-5 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies */}
                  <div>
                    <h3 className="text-xl font-serif mb-4 text-foreground">Technologies</h3>
                    
                    {project.technologies.frontend && (
                      <div className="mb-4">
                        <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Frontend</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.frontend.map((tech: string, index: number) => (
                            <span key={index} className="text-xs px-2 py-1 bg-card text-card-foreground rounded-sm border border-border">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {project.technologies.backend && (
                      <div className="mb-4">
                        <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Backend</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.backend.map((tech: string, index: number) => (
                            <span key={index} className="text-xs px-2 py-1 bg-card text-card-foreground rounded-sm border border-border">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {project.technologies.deployment && (
                      <div className="mb-4">
                        <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Deployment</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.deployment.map((tech: string, index: number) => (
                            <span key={index} className="text-xs px-2 py-1 bg-card text-card-foreground rounded-sm border border-border">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {project.technologies.other && (
                      <div>
                        <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Other</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.other.map((tech: string, index: number) => (
                            <span key={index} className="text-xs px-2 py-1 bg-card text-card-foreground rounded-sm border border-border">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Results */}
                  <div>
                    <h3 className="text-xl font-serif mb-4 text-foreground">Results</h3>
                    <ul className="space-y-2">
                      {project.results.map((result: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Challenges */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h2 className="text-2xl font-serif mb-6 text-foreground">Challenges & Solutions</h2>
              <div className="bg-card p-6 rounded-lg border border-border">
                <ul className="space-y-4">
                  {project.challenges.map((challenge: string, index: number) => (
                    <li key={index} className="text-muted-foreground">
                      <span className="font-medium text-foreground">Challenge {index + 1}: </span> 
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            {/* Navigation Links */}
            <motion.div 
              className="flex justify-between pt-8 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link 
                href="/projects"
                className="project-link flex items-center text-accent hover:text-accent-foreground"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to All Projects
              </Link>
              
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link flex items-center text-accent hover:text-accent-foreground"
                >
                  Visit Live Site
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
} 