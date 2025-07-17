'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Download, ArrowRight, ExternalLink } from 'lucide-react';
import { SocialLinks } from '@/components/ui/social-links';
import ContactForm from '@/components/contact/ContactForm';
import ProjectCard from '@/components/project/ProjectCard';
import usePageLoading from '@/hooks/usePageLoading';
import { ResumeButton } from '@/components/ui/resume-button';
import ImageContainer from '@/components/ui/ImageContainer';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
      transition: {
      staggerChildren: 0.2
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

// Projects data
const projects = [
  {
    id: 'ootd',
    title: 'OOTD – AI-Powered Fashion Stylist',
    description: 'A comprehensive AI-powered fashion platform that analyzes outfits, generates style recommendations, and creates personalized fashion advice using Google Gemini AI, with advanced image analysis, AI outfit generation, and professional PDF reports.',
    image: '/ootd.png',
    tags: ['Next.js 15', 'Google Gemini AI', 'Clerk', 'Supabase', 'Cloudinary', 'Hugging Face', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://ootd.vercel.app/',
    featured: true,
  },
  {
    id: 'homely',
    title: 'Homely – Full-Stack Food Delivery Platform',
    description: 'A comprehensive full-stack food delivery platform enabling customers to order from local sellers, track deliveries, and analyze nutrition, with robust admin and seller dashboards.',
    image: '/homely.png',
    tags: ['Next.js', 'TypeScript', 'Express.js', 'MongoDB', 'Cloudinary', 'WebSockets', 'Framer Motion', 'Shadcn UI', 'Google Gemini AI'],
    liveUrl: 'https://homely-frontend-opal.vercel.app',
    featured: true,
    category: 'Full Stack',
  },
  {
    id: 'studybuddy',
    title: 'StudyBuddy – AI-Powered Study Management',
    description: 'A comprehensive AI-powered study management application that helps students organize their learning with intelligent flashcards, adaptive quizzes, smart notes, and comprehensive analytics using Google Gemini AI with multiple model fallbacks for reliability.',
    image: '/sb.png',
    tags: ['Django 5.0.1', 'React 18', 'Google Gemini AI', 'PostgreSQL', 'JWT', 'Tailwind CSS', 'Recharts', 'Vite'],
    liveUrl: 'https://studybuddy-frontend-plum.vercel.app/',
    featured: true,
    category: 'AI',
  },
  {
    id: 'ankkor',
    title: 'Ankkor – E-commerce Clothing Store',
    description: 'A real-world e-commerce clothing store with a seamless user experience, built with Next.js frontend and Shopify backend, featuring everything from checkout to delivery.',
    image: '/ankkor.png',
    tags: ['Next.js', 'Shopify', 'Tailwind CSS', 'EmailJS'],
    liveUrl: 'https://ankkorformals.vercel.app/',
    featured: true,
  },
  {
    id: 'initiators-of-change',
    title: 'Initiators of Change – NGO Website',
    description: 'A full-stack web application developed for an NGO to manage operations, track events, and process donations. The website significantly improved volunteer engagement and streamlined fundraising efforts.',
    image: '/ioc.png',
    tags: ['MERN Stack', 'MongoDB', 'Express', 'React', 'Node.js', 'Tailwind CSS'],
    liveUrl: 'https://www.initiatorsofchange.com',
    featured: true,
    category: 'Web App',
  },
  {
    id: 'd2-global-immigration',
    title: 'D2 Global Immigration – Visa & Immigration Consultancy',
    description: 'A professional website for an immigration consultancy, handling visa-related inquiries and services with a user-friendly interface and SEO-optimized content.',
    image: '/d2global.png',
    tags: ['MERN Stack', 'MongoDB', 'Express', 'React', 'Node.js', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://www.d2global.in',
    featured: true,
    category: 'Web App',
  },
  {
    id: 'digital-evidence-viewer',
    title: 'Digital Evidence Metadata Viewer',
    description: 'A client-side digital forensics tool for securely analyzing files, extracting metadata, generating cryptographic hashes, and creating forensic reports - all without sending any data to a server.',
    image: '/df.png',
    tags: ['Next.js', 'Clerk', 'TailwindCSS', 'Web Crypto API', 'jsPDF', 'IndexedDB'],
    liveUrl: 'https://df-project-nine.vercel.app',
    featured: true,
    category: 'Digital Forensics',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'A personal portfolio website showcasing my projects and skills.',
    image: '/portfolio.png',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'EmailJS'],
    liveUrl: 'https://abhijeet-portfolio.vercel.app',
    featured: true,
  },
  // {
  //   id: 'globalconnect',
  //   title: 'GlobalConnect – AI-Powered Bidding Platform',
  //   description: 'A platform for streamlining communication and bidding for cross-border exports, improving efficiency in international trade.',
  //   image: '/gc.png',
  //   tags: ['MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'WebSockets', 'REST APIs'],
  //   liveUrl: 'https://drive.google.com/file/d/1YAFBVTdQV9nDkzl7UNoeN7qasIqdfZ7-/view',
  //   featured: true,
  // },
];

// Skill categories
const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Framer Motion']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'Django', 'GraphQL', 'REST API']
  },
  {
    category: 'Database',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis']
  },
  {
    category: 'DevOps & Tools',
    items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Vercel', 'Netlify']
  },
];

// Developer roles for animation
const roles = [
  "Full Stack Developer",
  "Software Engineer",
  "AI/ML Developer"
];

export default function Home() {
  // Use the loading hook for page transitions
  usePageLoading(false);
  
  // State for cycling through developer roles
  const [roleIndex, setRoleIndex] = useState(0);
  
  // Effect to cycle through roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4 bg-background relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute -z-10 top-20 left-[5%] w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -z-10 bottom-20 left-[20%] w-60 h-60 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -z-10 top-40 right-[10%] w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -z-10 bottom-40 right-[15%] w-48 h-48 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="text-lg mb-5 font-light tracking-widest uppercase">
              <span className="text-gradient-blue">Problem Solver</span> | <span className="text-gradient-pink">Tech Enthusiast</span>
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-8 text-foreground">
              Hi! I'm <span className="text-gradient">Abhijeet</span>
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-lg">
              As a <span className="highlight-box text-gradient-blue font-medium">B.Tech student</span>, I craft digital experiences where creativity meets functionality. My expertise spans <span className="text-gradient-pink font-medium">website development</span> and <span className="text-gradient-amber font-medium">AI/ML innovations</span> — all powered by a strong foundation in <span className="text-gradient font-medium">data structures and algorithms</span>.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-lg">
              I transform complex challenges into elegant solutions with a keen eye for detail and user experience. Whether it's building immersive interfaces or developing intelligent systems, I'm committed to excellence and continuous learning in this ever-evolving tech landscape.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="contact-button-wrapper">
                <a href="#contact" className="btn">
                  CONTACT ME
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 mt-12 lg:mt-0 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="absolute -z-10 top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 bottom-0 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <ImageContainer
              src="/pp.webp"
              alt="Abhijeet - Developer"
              aspectRatio="1/1"
              className="w-80 h-80 mx-auto rounded-full border-4 border-accent/20"
              imageClassName="relative z-10"
              objectPosition="center top"
            />
            <motion.div 
              className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 z-20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="role-badge-container">
                <motion.span 
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="role-badge"
                >
                  {roles[roleIndex]}
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Links Bar */}
      <div className="py-10 bg-accent/10 dark:bg-accent/5 text-center">
        <div className="container mx-auto px-4">
          <SocialLinks />
        </div>
      </div>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-serif font-bold mb-16 text-foreground text-center">
              Experience
            </h2>
          </FadeInWhenVisible>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <FadeInWhenVisible>
              <div className="certification-card bg-card p-6 rounded-sm border border-border hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-foreground">Full Stack Developer Intern</h3>
                    <p className="certification-issuer text-sm text-muted-foreground mt-1">Prof. Prabhat Barnwal (Michigan State University)</p>
                    <div className="mt-4 text-foreground">
                      <ul className="space-y-3 list-disc pl-5">
                        <li>Led development of Peer Knowledge Exchange Platform serving Punjab government officers, improving platform speed and accessibility score <a href="https://pkep.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gradient-blue font-medium hover:underline">pkep</a></li>
                        <li>Launched "Sewa Assist" WhatsApp chatbot that reduced officer response time, enabling instant access to program resources</li>
                        <li>Implemented AI-powered on-site chatbot that decreased support tickets and increased self-service resolution rate</li>
                        <li>Architected scalable infrastructure using TypeScript/Next.js frontend and Node.js/Express backend</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="certification-date">Apr. 2025 - Present</span>
                    <div className="text-sm text-muted-foreground mt-2 text-right">
                      Remote
                    </div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible>
              <div className="certification-card bg-card p-6 rounded-sm border border-border hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-foreground">Freelance Web Developer</h3>
                    <p className="certification-issuer text-sm text-muted-foreground mt-1">Self-Employed</p>
                    <div className="mt-4 text-foreground">
                      <ul className="space-y-3 list-disc pl-5">
                        <li>Increased Ankkor e-commerce revenue by <span className="text-gradient-blue font-medium">45%</span> through Next.js/TypeScript platform with Redis-powered inventory system serving 2000+ monthly customers <a href="https://ankkorformals.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gradient-blue font-medium hover:underline">ankkor.in</a></li>
                        <li>Boosted D2 Global Immigration client conversion via MERN stack platform, reducing onboarding time <a href="https://www.d2global.in" target="_blank" rel="noopener noreferrer" className="text-gradient-blue font-medium hover:underline">d2global.in</a></li>
                        <li>Scaled Initiators of Change NGO impact through a MERN stack platform managing volunteers and donations annually <a href="https://www.initiatorsofchange.com" target="_blank" rel="noopener noreferrer" className="text-gradient-blue font-medium hover:underline">initiatorsofchange.com</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="certification-date">Jan. 2024 - Present</span>
                    <div className="text-sm text-muted-foreground mt-2 text-right">
                      Remote
                    </div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-serif font-bold mb-16 text-foreground text-center">
              Skills & Technologies
            </h2>
          </FadeInWhenVisible>
          
          <div className="max-w-5xl mx-auto">
            <FadeInWhenVisible>
              <div className="flex flex-col space-y-12">
                {/* Languages */}
                <div>
                  <h3 className="text-xl font-serif mb-6 text-gradient-blue skills-category">Languages:</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-8 place-items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">JavaScript</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">TypeScript</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">Python</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">C</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">C++</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">HTML5</span>
                    </div>
                  </div>
                </div>
                
                {/* Frameworks/Libraries */}
                <div>
                  <h3 className="text-xl font-serif mb-6 text-gradient-pink skills-category">Frameworks/Libraries:</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-8 place-items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">React</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="max-h-full dark:invert" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">Next.js</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">Node.js</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" className="max-h-full dark:invert" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">Express</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">Bootstrap</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg" alt="Tailwind" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">Tailwind</span>
                </div>
              </div>
                </div>
                
                {/* Tools and Software */}
                <div>
                  <h3 className="text-xl font-serif mb-6 text-gradient-amber skills-category">Tools and Software:</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-8 place-items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">Git</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="max-h-full dark:invert" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">GitHub</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">VS Code</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">Docker</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">MongoDB</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-card p-3 rounded-lg shadow-sm skills-icon-wrapper">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" className="max-h-full" />
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground">MySQL</span>
                </div>
              </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/5 to-accent/5 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-serif font-bold mb-4 text-foreground text-center">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
              A collection of projects that showcase my skills and experience in building modern web applications.
            </p>
          </FadeInWhenVisible>
          
          <div className="relative">
            <FadeInWhenVisible>
              <motion.div 
                className="flex gap-8 project-slider"
                initial={{ x: 0 }}
                animate={{ 
                  x: [0, -2000],
                  transition: {
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 60,
                      ease: "linear",
                    }
                  }
                }}
                whileHover={{
                  animationPlayState: "paused"
                }}
              >
                {/* Projects for infinite scroll */}
                {[...projects, ...projects, ...projects].map((project, index) => (
                  <motion.div 
                    key={`project-${index}-${project.id}`}
                    className="min-w-[300px] md:min-w-[400px] lg:min-w-[500px] project-card-wrapper"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
                      transition: { duration: 0.3 }
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
            </FadeInWhenVisible>
            
            <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-card via-card/80 to-transparent w-[100px] h-full z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-card via-card/80 to-transparent w-[100px] h-full z-20 pointer-events-none"></div>
          </div>
          
          <FadeInWhenVisible className="mt-16 text-center">
            <Link 
              href="/projects"
              className="project-link inline-flex items-center gap-2 border border-primary text-primary px-8 py-3 text-sm tracking-wider uppercase font-medium hover:bg-primary/5 transition-colors"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-serif font-bold mb-16 text-foreground text-center">
              Certifications
            </h2>
          </FadeInWhenVisible>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <FadeInWhenVisible>
              <div className="certification-card bg-card p-6 rounded-sm border border-border hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-foreground">CS50's Introduction to Computer Science</h3>
                    <p className="certification-issuer text-sm text-muted-foreground mt-1">Harvard University (edX)</p>
                    <div className="mt-4 text-foreground">
                      <p>Gained a strong foundation in computer science, mastering topics like algorithms, data structures, and web development. Completed Python and C projects, applying problem-solving skills to real-world scenarios.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="certification-date">July 2023</span>
                    <Link 
                      href="#" 
                      className="text-accent hover:underline text-sm whitespace-nowrap flex items-center mt-2"
                    >
                      View project <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible>
              <div className="certification-card bg-card p-6 rounded-sm border border-border hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-foreground">CS50's Introduction to Artificial Intelligence</h3>
                    <p className="certification-issuer text-sm text-muted-foreground mt-1">Harvard University (edX)</p>
                    <div className="mt-4 text-foreground">
                      <p>Explored core AI concepts including knowledge representation, neural networks, and machine learning models. Developed practical applications using Python for natural language processing and computer vision.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="certification-date">January 2024</span>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Extracurricular Section */}
      <section id="extracurricular" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-serif font-bold mb-16 text-foreground text-center">
              Leadership / Extracurricular
          </h2>
          </FadeInWhenVisible>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <FadeInWhenVisible>
              <div className="certification-card bg-card p-6 rounded-sm border border-border hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                    <h3 className="text-xl font-serif font-bold text-foreground">Initiators of Change</h3>
                    <p className="certification-issuer text-sm text-muted-foreground mt-1">Volunteer Project Manager</p>
                    <div className="mt-4 text-foreground">
                      <ul className="space-y-3 list-disc pl-5">
                        <li>Led multiple initiatives aimed at youth engagement and community development, resulting in a 30% increase in volunteer participation.</li>
                        <li>Organized educational workshops and fundraising events, raising awareness on issues like education, sanitation, and women's rights.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="certification-date">Sep. 2023 - Present</span>
                    <div className="text-sm text-muted-foreground mt-2 text-right">
                      Ludhiana, Punjab
                    </div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
            
            {/* <FadeInWhenVisible>
              <div className="certification-card bg-card p-6 rounded-sm border border-border hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                    <h3 className="text-xl font-serif font-bold text-foreground">Technical Workshop Facilitator</h3>
                    <p className="certification-issuer text-sm text-muted-foreground mt-1">Computer Science Department</p>
                    <div className="mt-4 text-foreground">
                      <ul className="space-y-3 list-disc pl-5">
                        <li>Conducted hands-on workshops on web development technologies for undergraduate students.</li>
                        <li>Created comprehensive learning materials and interactive exercises to enhance student engagement.</li>
                        <li>Mentored junior students in developing their first web applications, receiving consistently positive feedback.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="certification-date">Jan. 2023 - Dec. 2023</span>
                    <div className="text-sm text-muted-foreground mt-2 text-right">
                      GNDEC, Ludhiana
                    </div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible>
              <div className="certification-card bg-card p-6 rounded-sm border border-border hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                    <h3 className="text-xl font-serif font-bold text-foreground">Hackathon Team Lead</h3>
                    <p className="certification-issuer text-sm text-muted-foreground mt-1">Regional Tech Competitions</p>
                    <div className="mt-4 text-foreground">
                      <ul className="space-y-3 list-disc pl-5">
                        <li>Led a team of 4 developers to secure 2nd place in the state-level hackathon focused on sustainable solutions.</li>
                        <li>Coordinated development tasks, ensuring efficient workflow and timely delivery under tight deadlines.</li>
                        <li>Pitched technical solutions to a panel of industry experts, developing strong presentation skills.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="certification-date">Oct. 2022 - May 2023</span>
                    <div className="text-sm text-muted-foreground mt-2 text-right">
                      Various Locations
                    </div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible> */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-serif font-bold mb-4 text-foreground text-center">
              Let's Connect
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
              Have a project in mind or want to discuss a potential collaboration? Feel free to reach out.
            </p>
          </FadeInWhenVisible>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeInWhenVisible>
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-2xl font-serif font-semibold mb-6 text-foreground">
                  Contact Information
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm currently available for freelance work and full-time positions. If you have a project that needs coding skills, I'm your developer!
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-foreground font-medium mb-2">Follow Me</h4>
                    <div className="flex gap-4">
                      <SocialLinks />
                    </div>
              </div>
                  
                  <div>
                    <h4 className="text-foreground font-medium mb-2">Resume</h4>
                    <ResumeButton href="/Abhijeet's Resume.pdf" text="Download Resume" />
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible>
              <ContactForm />
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
    </div>
  );
}
