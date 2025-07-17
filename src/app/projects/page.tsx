'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import ProjectCard from '@/components/project/ProjectCard';
import usePageLoading from '@/hooks/usePageLoading';
import Breadcrumb from '@/components/ui/breadcrumb';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const FadeInWhenVisible = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Extended projects data (includes all projects from home page plus more)
const allProjects = [
  {
    id: 'ootd',
    title: 'OOTD – AI Fashion Stylist',
    description: 'A comprehensive AI-powered fashion platform that analyzes outfits, generates style recommendations, and creates personalized fashion advice using Google Gemini AI. Features include advanced outfit image analysis with style scoring, AI image generation with multiple service fallbacks, secure user authentication with Clerk, professional image management via Cloudinary, interactive questionnaires with dynamic AI-generated questions, PDF export capabilities, and responsive design with dark/light mode support.',
    image: '/ootd.png',
    tags: ['Next.js 15', 'Google Gemini AI', 'Clerk', 'Supabase', 'Cloudinary', 'Hugging Face', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://ootd.vercel.app/',
    featured: true,
    category: 'AI',
  },
  {
    id: 'homely',
    title: 'Homely – Full-Stack Food Delivery Platform',
    description: 'A comprehensive full-stack food delivery platform enabling customers to order from local sellers, track deliveries, and analyze nutrition, with robust admin and seller dashboards. Features include customer, seller, and delivery partner roles with secure authentication, real-time order tracking and chat using WebSockets, seller dashboard for menu, order, and payment management, Cloudinary integration for image uploads and optimization, advanced Nutrition Analyzer powered by Google Gemini AI, interactive, animated UI with Framer Motion and Shadcn UI, mobile responsive and accessible design, RESTful API for robust backend operations, payment and refund management for sellers and customers, and admin analytics and reporting dashboard.',
    image: '/homely.png',
    tags: ['Next.js', 'TypeScript', 'Express.js', 'MongoDB', 'Cloudinary', 'WebSockets', 'Framer Motion', 'Shadcn UI', 'Google Gemini AI'],
    liveUrl: 'https://homely-frontend-opal.vercel.app',
    featured: true,
    category: 'Full Stack',
  },
  {
    id: 'studybuddy',
    title: 'StudyBuddy – AI-Powered Study Management',
    description: 'A comprehensive AI-powered study management application that helps students organize their learning with intelligent flashcards, adaptive quizzes, smart notes, and comprehensive analytics using Google Gemini AI. Features include smart notes management with rich text editing, interactive flashcards with spaced repetition algorithms, adaptive quizzes with AI-generated questions and multiple model fallbacks, real-time analytics dashboard with study streak tracking, modern responsive design with dark/light mode toggle, RESTful API architecture with Django REST Framework, JWT authentication with automatic token refresh, and production deployment on Vercel and Render.',
    image: '/sb.png',
    tags: ['Django 5.0.1', 'React 18', 'Google Gemini AI', 'PostgreSQL', 'JWT', 'Tailwind CSS', 'Recharts', 'Vite'],
    liveUrl: 'https://studybuddy-frontend-plum.vercel.app/',
    featured: true,
    category: 'AI',
  },
  {
    id: 'ankkor',
    title: 'Ankkor – E-commerce Clothing Store',
    description: 'A real-world e-commerce clothing store with a seamless user experience, built with Next.js frontend and Shopify backend, featuring everything from checkout to delivery. Features include Shopify-powered backend for product & order management, optimized checkout, payment, and delivery tracking system, aesthetic, clean UI with subtle but professional animations, contact form integrated with EmailJS for customer inquiries, and fully mobile-responsive design for a smooth shopping experience.',
    image: '/ankkor.png',
    tags: ['Next.js', 'Shopify', 'Tailwind CSS', 'EmailJS'],
    liveUrl: 'https://ankkor.in/',
    featured: true,
    category: 'E-commerce',
  },
  {
    id: 'initiators-of-change',
    title: 'Initiators of Change – NGO Website',
    description: 'A full-stack web application developed for an NGO to manage operations, track events, and process donations. The website significantly improved volunteer engagement and streamlined fundraising efforts. Features include online event tracking and volunteer registrations, integrated donation system processing 200+ donations monthly, improved user engagement by 40% through real-time updates, responsive UI ensuring accessibility across devices, and optimized performance reducing load times by 35%.',
    image: '/ioc.png',
    tags: ['MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS'],
    liveUrl: 'https://www.initiatorsofchange.com',
    featured: true,
    category: 'Web App',
  },
  {
    id: 'd2-global-immigration',
    title: 'D2 Global Immigration – Visa & Immigration Consultancy',
    description: 'A professional website for an immigration consultancy, handling visa-related inquiries and services with a user-friendly interface and SEO-optimized content. Features include interactive UI with smooth animations using Framer Motion, multi-step form for visa inquiries (handling 500+ inquiries/month), SEO-optimized content boosting traffic by 50%, mobile-responsive design for better accessibility, and secure authentication & data handling.',
    image: '/d2global.png',
    tags: ['MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://www.d2global.in',
    featured: true,
    category: 'Web App',
  },
  // {
  //   id: 'globalconnect',
  //   title: 'GlobalConnect – AI-Powered Bidding Platform',
  //   description: 'A platform for streamlining communication and bidding for cross-border exports, improving efficiency in international trade. Features include real-time chat & bidding functionality for exporters, secure authentication and user role-based access control, AI-driven analytics for predicting competitive bids, scalable infrastructure supporting 1,000+ concurrent users, and was a hackathon finalist project, improving transaction speeds by 60%.',
  //   image: '/gc.png',
  //   tags: ['MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'WebSockets', 'REST APIs'],
  //   liveUrl: 'https://drive.google.com/file/d/1YAFBVTdQV9nDkzl7UNoeN7qasIqdfZ7-/view',
  //   featured: true,
  //   category: 'AI',
  // },
  {
    id: 'portfolio',
    title: 'Portfolio Website – Next.js Animated Portfolio',
    description: 'A modern, fully animated portfolio built using Next.js, showcasing projects, skills, and contact info, with smooth transitions and a professional UI. Features include fully responsive and modern UI, smooth animations using Framer Motion, integrated contact form with EmailJS, projects section with live links, and optimization for fast performance & SEO.',
    image: '/portfolio.png',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'EmailJS'],
    liveUrl: 'https://abhijeets-portfolio.vercel.app',
    featured: false,
    category: 'Web App',
  },
  {
    id: 'digital-evidence-viewer',
    title: 'Digital Evidence Metadata Viewer',
    description: 'A client-side digital forensics tool for securely analyzing files, extracting metadata, generating cryptographic hashes, and creating forensic reports - all without sending any data to a server. Features include secure client-side processing with no data uploads to servers, user authentication with Clerk, comprehensive file analysis (metadata, hashes, file signatures), case management for organizing multiple analyses, professional PDF report generation, and local browser storage using IndexedDB.',
    image: '/df.png',
    tags: ['Next.js', 'Clerk', 'TailwindCSS', 'Web Crypto API', 'ExifReader', 'jsPDF', 'IndexedDB'],
    liveUrl: 'https://df-project-nine.vercel.app',
    featured: true,
    category: 'Digital Forensics',
  }
];

// Extract unique categories and tags
const categories = ['All', ...Array.from(new Set(allProjects.map(project => project.category)))];
const allTags = Array.from(new Set(allProjects.flatMap(project => project.tags)));

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Use the page loading hook
  usePageLoading(isLoading, 'binary');
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <Breadcrumb />

        {/* Header */}
        <FadeInWhenVisible>
          <div className="mb-12">
            <Link
              href="/"
              className="project-link flex items-center text-accent mb-6 text-sm hover:text-accent-foreground"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              My Projects
            </h1>
            
            <p className="text-muted-foreground max-w-2xl">
              Explore my full portfolio of projects spanning web applications, mobile development, 
              AI integrations, and more. Each project represents a unique challenge and solution.
            </p>
          </div>
        </FadeInWhenVisible>
        
        {/* Projects Display */}
        <FadeInWhenVisible>
          <div className="relative py-10">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/5 to-accent/5 z-0 rounded-xl"></div>
            
            <div className="relative z-10">
              <motion.div 
                className="flex flex-wrap gap-8 items-start justify-center"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {allProjects.map((project, index) => (
                  <motion.div 
                    key={project.id}
                    className="project-card-wrapper w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: index * 0.1,
                        duration: 0.5
                      }
                    }}
                    whileHover={{ 
                      scale: 1.03, 
                      transition: { duration: 0.2 } 
                    }}
                  >
                    <ProjectCard
                      id={project.id}
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      tags={project.tags}
                      liveUrl={project.liveUrl}
                      featured={project.featured}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </FadeInWhenVisible>
        
        {/* Back to Top */}
        <div className="text-center mt-16">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-3 text-sm tracking-wider uppercase font-medium hover:bg-primary/5 transition-colors"
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
} 