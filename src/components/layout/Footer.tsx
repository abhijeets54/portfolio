import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Instagram, Mail, Download, Phone } from 'lucide-react';
import { ResumeButton } from '@/components/ui/resume-button';
import { SocialLinks } from '@/components/ui/social-links';
import CodeSlashIcon from '@/components/ui/code-slash-icon';

const Footer = () => {
  return (
    <footer className="bg-card text-foreground border-t border-border">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Column 1: About */}
            <div>
              <h4 className="font-serif text-lg mb-6 flex items-center">
                <CodeSlashIcon className="h-8 w-8 mr-2 text-accent" size={32} />
                <span>Abhijeet Singh</span>
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                A professional software and AI/ML engineer specializing in modern technologies,
                creating performant applications with elegant solutions to complex problems.
              </p>
              <SocialLinks />
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 className="font-serif text-lg mb-6">Navigation</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/#about" className="text-muted-foreground hover:text-accent transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#projects" className="text-muted-foreground hover:text-accent transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/#skills" className="text-muted-foreground hover:text-accent transition-colors">
                    Skills
                  </Link>
                </li>
                <li>
                  <Link href="/#extracurricular" className="text-muted-foreground hover:text-accent transition-colors">
                    Extracurricular
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-muted-foreground hover:text-accent transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Get in Touch */}
            <div>
              <h4 className="font-serif text-lg mb-6">Get in Touch</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="tel:+916239521161" className="text-muted-foreground hover:text-accent transition-colors flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    +91 6239521161
                  </a>
                </li>
                <li>
                  <a href="mailto:your-email@example.com" className="text-muted-foreground hover:text-accent transition-colors flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    as9184635@gmail.com
                  </a>
                </li>
                <li className="pt-1">
                  <ResumeButton href="/Abhijeet's Resume.pdf" text="Resume" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      {/* <div className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} Abhijeet's Portfolio. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground text-xs hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground text-xs hover:text-accent transition-colors">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer; 