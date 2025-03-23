'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, Download, ArrowRight, Check, Coffee, BookOpen, Code, Palette, Globe } from 'lucide-react';
import { SocialLinks } from '@/components/ui/social-links';
import usePageLoading from '@/hooks/usePageLoading';
import { ResumeButton } from '@/components/ui/resume-button';

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Use the page loading hook
  usePageLoading(isLoading);
  
  // Timeline data
  const timelineEvents = [
    {
      year: '2023',
      title: 'Senior Frontend Developer',
      company: 'Tech Innovators Inc.',
      description: 'Led frontend development for enterprise SaaS products. Implemented modern React architecture and mentored junior developers.',
      technologies: ['React', 'TypeScript', 'GraphQL', 'AWS'],
    },
    {
      year: '2021',
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      description: 'Developed full-stack web applications for various clients. Collaborated with designers and product managers to deliver high-quality products.',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'TailwindCSS'],
    },
    {
      year: '2019',
      title: 'Frontend Developer',
      company: 'Creative Web Agency',
      description: 'Created responsive and interactive web interfaces. Worked with cross-functional teams to deliver client projects on time.',
      technologies: ['JavaScript', 'Vue.js', 'SCSS', 'Webpack'],
    },
    {
      year: '2018',
      title: 'Computer Science Degree',
      company: 'University XYZ',
      description: 'Graduated with honors in Computer Science. Focused on web technologies and software engineering principles.',
      technologies: ['Algorithms', 'Data Structures', 'Software Engineering', 'Web Development'],
    },
  ];
  
  // Education data
  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University XYZ',
      period: '2014 - 2018',
      description: 'Graduated with honors. Specialized in web technologies and software engineering.',
    },
    {
      degree: 'Web Development Certification',
      institution: 'Tech Academy',
      period: '2018',
      description: 'Intensive bootcamp focused on modern web development technologies and best practices.',
    },
  ];
  
  // Skills data
  const skills = {
    technical: [
      { name: 'JavaScript/TypeScript', level: 95 },
      { name: 'React & Next.js', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'TailwindCSS', level: 85 },
      { name: 'Database Design', level: 80 },
      { name: 'RESTful APIs', level: 90 },
      { name: 'GraphQL', level: 75 },
      { name: 'AWS/Vercel', level: 70 },
    ],
    soft: [
      'Team Leadership',
      'Project Management',
      'Communication',
      'Problem Solving',
      'Mentoring',
      'Time Management',
      'Attention to Detail',
      'Adaptability',
    ],
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'Spanish', level: 'Conversational' },
      { name: 'French', level: 'Basic' },
    ],
  };
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/"
            className="flex items-center text-accent text-sm hover:underline"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
        
        {/* Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            About Me
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl">
            I'm a passionate full-stack developer with 5+ years of experience building web applications 
            that solve real-world problems. My journey in tech is driven by a love for creating elegant, 
            user-centric solutions and continuously learning new technologies.
          </p>
        </motion.div>
        
        {/* Profile Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl font-serif font-semibold mb-6 text-foreground">
              Who I Am
            </h2>
            
            <div className="prose prose-lg text-muted-foreground dark:prose-invert prose-headings:text-foreground max-w-none">
              <p>
                With a background in Computer Science and a passion for web technologies, I've dedicated my career to creating exceptional digital experiences. I thrive in collaborative environments where I can contribute my technical expertise while learning from others.
              </p>
              
              <p>
                My approach to development centers on writing clean, maintainable code and prioritizing user experience. I believe great software balances technical excellence with intuitive design, and I consistently aim to achieve this balance in my work.
              </p>
              
              <p>
                When not coding, I enjoy hiking, reading science fiction, and contributing to open-source projects. I'm also an avid learner, constantly expanding my skill set through courses, technical blogs, and hands-on experimentation with new technologies.
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <ResumeButton href="/Abhijeet's Resume.pdf" text="Download Resume" />
              
              <Link
                href="/contact"
                className="border border-primary text-primary px-6 py-3 flex items-center gap-2 text-sm tracking-wider uppercase"
              >
                <ArrowRight className="h-4 w-4" />
                Contact Me
              </Link>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="w-full h-[500px] relative rounded-sm overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80"
                alt="About Me"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-card p-6 border border-border shadow-lg">
              <h3 className="text-xl font-serif mb-3 text-foreground">Connect With Me</h3>
              <SocialLinks />
            </div>
          </div>
        </motion.div>
        
        {/* Experience Timeline */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-serif font-semibold mb-12 text-foreground">
            My Journey
          </h2>
          
          <div className="relative border-l border-border ml-4 md:ml-8 pl-8 md:pl-16 space-y-16">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-12 md:-left-16 top-0 w-8 h-8 bg-card border border-border rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                </div>
                
                <div className="absolute -left-[8.5rem] top-0 hidden md:block">
                  <span className="text-xl font-serif text-accent">{event.year}</span>
                </div>
                
                <div>
                  <span className="md:hidden text-sm font-medium text-accent mb-2 block">{event.year}</span>
                  <h3 className="text-xl font-serif mb-2 text-foreground">{event.title}</h3>
                  <p className="text-muted-foreground font-medium mb-3">{event.company}</p>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {event.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-muted text-xs rounded-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Education Section */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-serif font-semibold mb-12 text-foreground">
            Education
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((item, index) => (
              <div key={index} className="bg-card p-8 border border-border rounded-sm">
                <span className="text-sm font-medium text-accent mb-2 block">{item.period}</span>
                <h3 className="text-xl font-serif mb-2 text-foreground">{item.degree}</h3>
                <p className="text-muted-foreground font-medium mb-3">{item.institution}</p>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-serif font-semibold mb-12 text-foreground">
            Skills & Expertise
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Technical Skills */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-serif mb-6 text-foreground">Technical Skills</h3>
              
              <div className="space-y-6">
                {skills.technical.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground">{skill.name}</span>
                      <span className="text-accent">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Other Skills */}
            <div>
              <div className="mb-12">
                <h3 className="text-xl font-serif mb-6 text-foreground">Soft Skills</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.soft.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-accent mr-2"></div>
                      <span className="text-muted-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif mb-6 text-foreground">Languages</h3>
                <div className="space-y-3">
                  {skills.languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-foreground">{lang.name}</span>
                      <span className="text-accent">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 