'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import usePageLoading from '@/hooks/usePageLoading';

export default function ExtracurricularPage() {
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
  
  // Activities data
  const activities = [
    {
      title: 'Open Source Contribution',
      description: 'Active contributor to several open-source projects including React libraries and developer tools. Regularly submit PRs to improve documentation and fix bugs.',
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80',
      link: 'https://github.com',
    },
    {
      title: 'Tech Blog Writing',
      description: 'Write technical articles on web development, sharing insights and tutorials on modern frontend technologies and best practices.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80',
      link: 'https://medium.com',
    },
    {
      title: 'Local Tech Meetups',
      description: 'Organize and speak at local tech meetups, fostering community learning and networking opportunities for developers of all experience levels.',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80',
      link: 'https://meetup.com',
    },
    {
      title: 'Hackathons',
      description: 'Participate in various hackathons, both as a competitor and mentor. Won first place in the 2022 WebDev Innovation Challenge.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80',
      link: 'https://devpost.com',
    },
  ];
  
  // Volunteering data
  const volunteering = [
    {
      organization: 'Code for Good',
      role: 'Technical Mentor',
      period: '2021 - Present',
      description: 'Mentor aspiring developers from underrepresented backgrounds, providing guidance on projects and career development.',
    },
    {
      organization: 'Tech4All Initiative',
      role: 'Web Development Instructor',
      period: '2020 - 2022',
      description: 'Taught web development basics to high school students in underserved communities, helping bridge the digital divide.',
    },
  ];
  
  // Interests data
  const interests = [
    {
      title: 'Photography',
      description: 'Avid landscape and street photographer with a focus on urban architecture and natural landscapes.',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80',
    },
    {
      title: 'Hiking',
      description: 'Regular hiker who enjoys exploring trails and mountains, with a goal to visit all major national parks.',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80',
    },
    {
      title: 'Reading',
      description: 'Enthusiastic reader of science fiction, philosophy, and technical books, maintaining a personal library of over 200 volumes.',
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80',
    },
    {
      title: 'Chess',
      description: 'Competitive chess player who participates in local tournaments and online matches, with a current ELO rating of 1850.',
      image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80',
    },
  ];
  
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
            Beyond Coding
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl">
            While coding is my profession and passion, I believe in maintaining a well-rounded life. 
            Here's a glimpse into my activities, volunteer work, and personal interests that complement 
            my technical career and keep me inspired.
          </p>
        </motion.div>
        
        {/* Professional Activities */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-serif font-semibold mb-12 text-foreground">
            Professional Activities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((activity, index) => (
              <motion.div 
                key={index}
                className="group relative overflow-hidden border border-border"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link 
                      href={activity.link}
                      target="_blank"
                      className="bg-background text-foreground px-6 py-2 flex items-center gap-2 text-sm"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="p-6 bg-card">
                  <h3 className="text-xl font-medium mb-3 text-foreground group-hover:text-accent transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Volunteering */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-serif font-semibold mb-12 text-foreground">
            Volunteering & Community Work
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {volunteering.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-card border border-border p-8 rounded-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm font-medium text-accent mb-2 block">{item.period}</span>
                <h3 className="text-xl font-medium mb-2 text-foreground">{item.organization}</h3>
                <p className="text-muted-foreground font-medium mb-3">{item.role}</p>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Personal Interests */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-serif font-semibold mb-12 text-foreground">
            Personal Interests
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest, index) => (
              <motion.div 
                key={index}
                className="group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative h-64 mb-4 overflow-hidden rounded-sm">
                  <Image
                    src={interest.image}
                    alt={interest.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-medium mb-2 text-foreground group-hover:text-accent transition-colors">
                  {interest.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {interest.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Interested in collaborating on a project or want to know more about my extracurricular activities? 
              Let's connect and discuss how my diverse interests might bring a unique perspective to your project.
            </p>
            <Link
              href="/contact"
              className="bg-primary text-primary-foreground px-6 py-3 inline-flex items-center gap-2 text-sm tracking-wider uppercase"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
} 