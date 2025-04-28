'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import usePageLoading from '@/hooks/usePageLoading';
import ImageContainer from '@/components/ui/ImageContainer';

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
    title: '#OOTD – AI-Powered Fashion Stylist',
    description: 'A fashion AI assistant that generates personalized outfit recommendations based on user responses.',
    fullDescription: `
      A fashion AI assistant that generates personalized outfit recommendations based on user responses, leveraging AI-generated questions for better styling accuracy.
      
      The application features secure user authentication with Clerk.js, AI-generated fashion questions using Llama3 based on user preferences, and AI-powered outfit suggestions considering culture, style, and trends. Users can save reports as images or PDFs, and the platform integrates with Grok for AI-powered outfit visualization.
      
      This project demonstrates my ability to leverage cutting-edge AI technologies to create practical applications that provide personalized experiences to users.
    `,
    image: '/ootd.png',
    tags: ['Next.js', 'Clerk.js', 'Local Llama3 AI', 'Grok'],
    liveUrl: 'https://drive.google.com/file/d/1fyKHfkOQ0WFD82ONJZRgNJ-EFmCeRfbW/view?usp=drive_link',
    featured: true,
    category: 'AI',
    goals: [
      'Create an AI-powered fashion recommendation system',
      'Implement secure user authentication',
      'Develop AI-generated questions that adapt to user preferences',
      'Enable report generation in multiple formats',
      'Integrate with AI visualization tools'
    ],
    technologies: {
      frontend: ['Next.js', 'React', 'Tailwind CSS'],
      backend: ['Local Llama3 AI', 'Grok API'],
      deployment: ['Vercel'],
      other: ['Clerk.js Authentication', 'PDF/Image Generation'],
    },
    challenges: [
      'Training the AI to generate fashion-specific questions',
      'Creating an outfit recommendation engine that considers multiple factors',
      'Implementing secure authentication without reducing usability',
      'Developing visualization capabilities for recommended outfits'
    ],
    results: [
      'Personalized fashion recommendations based on user preferences',
      'Dynamic question generation that adapts to user responses',
      'Secure user authentication with Clerk.js',
      'Effective outfit visualization through Grok integration'
    ],
    date: 'September 2023',
    duration: '3 months',
  },
  {
    id: 'globalconnect',
    title: 'GlobalConnect – AI-Powered Bidding Platform',
    description: 'A platform for streamlining communication and bidding for cross-border exports.',
    fullDescription: `
      A platform for streamlining communication and bidding for cross-border exports, improving efficiency in international trade.
      
      The system includes real-time chat & bidding functionality for exporters, secure authentication and user role-based access control, and AI-driven analytics for predicting competitive bids. The scalable infrastructure supports 1,000+ concurrent users, and as a hackathon finalist project, it demonstrated a 60% improvement in transaction speeds.
      
      This project showcases my ability to create complex real-time systems with AI integration that can handle high user loads while providing valuable business insights.
    `,
    image: '/gc.png',
    tags: ['MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'WebSockets', 'REST APIs'],
    liveUrl: 'https://drive.google.com/file/d/1YAFBVTdQV9nDkzl7UNoeN7qasIqdfZ7-/view',
    featured: true,
    category: 'AI',
    goals: [
      'Create a platform for cross-border export bidding',
      'Implement real-time chat and bidding functionality',
      'Develop AI-driven analytics for competitive bid prediction',
      'Build a scalable infrastructure for high user loads',
      'Improve transaction speeds in international trade'
    ],
    technologies: {
      frontend: ['React.js', 'Redux', 'CSS3', 'Socket.io Client'],
      backend: ['Node.js', 'Express.js', 'MongoDB', 'WebSockets'],
      deployment: ['AWS'],
      other: ['AI Analytics', 'Real-time Communication', 'Role-based Access'],
    },
    challenges: [
      'Creating a scalable WebSocket architecture for real-time bidding',
      'Implementing AI algorithms for competitive bid prediction',
      'Ensuring secure authentication for international users',
      'Building a system that could handle high concurrent usage'
    ],
    results: [
      'Support for 1,000+ concurrent users',
      '60% improvement in transaction speeds',
      'Real-time communication and bidding functionality',
      'Accurate bid predictions through AI-driven analytics'
    ],
    date: 'November 2023',
    duration: '1 month',
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