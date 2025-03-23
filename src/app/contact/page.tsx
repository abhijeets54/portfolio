'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import { SocialLinks } from '@/components/ui/social-links';
import usePageLoading from '@/hooks/usePageLoading';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Use the page loading hook
  usePageLoading(isLoading, 'code');
  
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
            Get In Touch
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl">
            Have a project in mind or want to discuss a potential collaboration? 
            Feel free to reach out using the form below or through my social platforms. 
            I'm always open to new opportunities and interesting challenges.
          </p>
        </motion.div>
        
        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border p-8 rounded-sm">
              <h2 className="text-2xl font-serif font-semibold mb-6 text-foreground">
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-card border border-border p-8 rounded-sm mb-8">
              <h2 className="text-2xl font-serif font-semibold mb-6 text-foreground">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:hello@yourportfolio.com" className="text-muted-foreground hover:text-accent">
                      hello@yourportfolio.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <a href="tel:+11234567890" className="text-muted-foreground hover:text-accent">
                      +1 (123) 456-7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-muted-foreground">
                      San Francisco, California
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border p-8 rounded-sm">
              <h2 className="text-2xl font-serif font-semibold mb-6 text-foreground">
                Connect
              </h2>
              <p className="text-muted-foreground mb-6">
                Follow me on social media to keep up with my latest projects and updates.
              </p>
              <SocialLinks />
            </div>
          </motion.div>
        </div>
        
        {/* FAQ Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-serif font-semibold mb-6 text-foreground">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border p-6 rounded-sm">
              <h3 className="text-lg font-medium mb-3 text-foreground">What services do you offer?</h3>
              <p className="text-muted-foreground">
                I specialize in full-stack web development, focusing on React/Next.js for frontend and 
                Node.js for backend. I offer services ranging from building complete web applications 
                to implementing specific features in existing projects.
              </p>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-sm">
              <h3 className="text-lg font-medium mb-3 text-foreground">What is your typical project timeline?</h3>
              <p className="text-muted-foreground">
                Project timelines vary based on complexity and scope. A simple website might take 2-4 weeks, 
                while more complex applications can take 2-6 months. I'll provide a detailed timeline estimate 
                after discussing your specific needs.
              </p>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-sm">
              <h3 className="text-lg font-medium mb-3 text-foreground">How do you handle project communication?</h3>
              <p className="text-muted-foreground">
                I believe in transparent, regular communication. Depending on your preference, we can use 
                tools like Slack, email, or scheduled video calls. I provide weekly progress updates and 
                maintain an open channel for questions or concerns.
              </p>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-sm">
              <h3 className="text-lg font-medium mb-3 text-foreground">Are you available for remote work?</h3>
              <p className="text-muted-foreground">
                Yes, I work entirely remotely and have experience collaborating with clients and teams 
                across different time zones. I'm flexible with scheduling meetings to accommodate various 
                time differences.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Call to Action */}
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-foreground">
            Ready to start your next project?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Let's collaborate to bring your vision to life with modern technology and exceptional design.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-primary text-primary-foreground px-8 py-3 text-sm tracking-wider uppercase inline-block"
          >
            Start the Conversation
          </a>
        </motion.div>
      </div>
    </div>
  );
} 