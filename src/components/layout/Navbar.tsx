"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Download, Github, Linkedin, Mail } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ResumeButton } from '@/components/ui/resume-button';
import { SocialLinks } from '@/components/ui/social-links';
import CodeSlashIcon from '@/components/ui/code-slash-icon';
import { usePortfolioStore } from '@/lib/store';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = usePortfolioStore();
  const [activeSection, setActiveSection] = React.useState("");

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      // Update navbar appearance based on scroll position
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Only calculate if we have enough content to scroll
      if (documentHeight > windowHeight) {
        // Calculate the percentage of the page that has been scrolled
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        // Ensure the progress value stays between 0 and 100
        setScrollProgress(Math.min(Math.max(scrollPercentage, 0), 100));
      } else {
        // If page doesn't have enough content to scroll, show either 0% or 100%
        setScrollProgress(scrollTop > 0 ? 100 : 0);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    // Cleanup function
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle active section detection
  React.useEffect(() => {
    const handleSectionDetection = () => {
      const sections = ['about', 'projects', 'skills', 'extracurricular', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset to trigger earlier
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleSectionDetection);
    return () => window.removeEventListener('scroll', handleSectionDetection);
  }, []);

  const navbarClasses = `fixed top-0 left-0 right-0 z-[99] transition-all duration-300 ${
    isScrolled 
      ? 'bg-background/80 backdrop-blur-md h-16 shadow-sm is-scrolled' 
      : 'bg-transparent h-24 py-4'
  }`;

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-bold text-foreground relative z-10 flex items-center">
            <CodeSlashIcon className={`${isScrolled ? 'h-8 w-8' : 'h-10 w-10'} text-accent transition-all duration-300`} size={isScrolled ? 32 : 40} />
            <span className="ml-2">Abhijeet Singh</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12 relative z-10">
            <Link 
              href="/#about" 
              className={`nav-link text-foreground text-sm uppercase tracking-wider hover:text-accent transition-colors ${activeSection === 'about' ? 'active' : ''}`}
            >
              About
            </Link>

            <Link 
              href="/#projects" 
              className={`nav-link text-foreground text-sm uppercase tracking-wider hover:text-accent transition-colors ${activeSection === 'projects' ? 'active' : ''}`}
            >
              Projects
            </Link>

            <Link 
              href="/#skills" 
              className={`nav-link text-foreground text-sm uppercase tracking-wider hover:text-accent transition-colors ${activeSection === 'skills' ? 'active' : ''}`}
            >
              Skills
            </Link>

            <Link 
              href="/#extracurricular" 
              className={`nav-link text-foreground text-sm uppercase tracking-wider hover:text-accent transition-colors ${activeSection === 'extracurricular' ? 'active' : ''}`}
            >
              Extracurricular
            </Link>

            <Link 
              href="/#contact" 
              className={`nav-link text-foreground text-sm uppercase tracking-wider hover:text-accent transition-colors ${activeSection === 'contact' ? 'active' : ''}`}
            >
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Resume Download */}
            <div className="hidden md:block navbar-resume">
              <ResumeButton href="/Abhijeet's Resume.pdf" text="Resume" />
            </div>
            
            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden text-foreground hover:text-accent transition-colors" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              
              <SheetContent side="right" className="p-0 w-full max-w-xs">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xl font-bold text-foreground flex items-center">
                        <CodeSlashIcon className="h-8 w-8 text-accent" size={32} />
                        <span className="ml-2">Abhijeet Singh</span>
                      </span>
                      <SheetClose asChild>
                        <button className="text-foreground hover:text-accent hover:bg-accent/10 p-2 rounded-full transition-all" aria-label="Close menu">
                          <X className="h-6 w-6" />
                        </button>
                      </SheetClose>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 overflow-auto">
                    <div className="flex flex-col space-y-6">
                      <Link 
                        href="/#about" 
                        className="mobile-nav-link text-foreground text-base hover:text-accent transition-colors" 
                        onClick={() => closeMobileMenu()}
                      >
                        About
                      </Link>
                      <Link 
                        href="/#projects" 
                        className="mobile-nav-link text-foreground text-base hover:text-accent transition-colors" 
                        onClick={() => closeMobileMenu()}
                      >
                        Projects
                      </Link>
                      <Link 
                        href="/#skills" 
                        className="mobile-nav-link text-foreground text-base hover:text-accent transition-colors" 
                        onClick={() => closeMobileMenu()}
                      >
                        Skills
                      </Link>
                      <Link 
                        href="/#extracurricular" 
                        className="mobile-nav-link text-foreground text-base hover:text-accent transition-colors" 
                        onClick={() => closeMobileMenu()}
                      >
                        Extracurricular
                      </Link>
                      <Link 
                        href="/#contact" 
                        className="mobile-nav-link text-foreground text-base hover:text-accent transition-colors" 
                        onClick={() => closeMobileMenu()}
                      >
                        Contact
                      </Link>
                      
                      {/* Resume Download Button */}
                      <div className="mt-4">
                        <ResumeButton href="/Abhijeet's Resume.pdf" text="Download Resume" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 border-t border-border">
                    <SocialLinks />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Scroll Progress Bar - positioned right below the navbar */}
      <div 
        className="scroll-progress-container"
        style={{ 
          top: isScrolled ? '64px' : '96px',
          opacity: scrollProgress > 0 ? 1 : 0
        }}
      >
        <div 
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </>
  );
};

export default Navbar;