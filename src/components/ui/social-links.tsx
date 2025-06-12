import React from 'react';
import { Github, Linkedin, Twitter, Instagram, Mail, Code, Code2 } from 'lucide-react';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}

const SocialLink = ({ href, icon, label, color }: SocialLinkProps) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`social-link ${color} group`}
      aria-label={label}
    >
      <div className="social-icon-container">
        {icon}
      </div>
      <span className="social-text">{label}</span>
    </a>
  );
};

export function SocialLinks() {
  return (
    <div className="social-links-container">
      <SocialLink 
        href="https://github.com/abhijeets54"
        icon={<Github size={20} />}
        label="GitHub"
        color="github"
      />
      <SocialLink 
        href="https://www.linkedin.com/in/abhijeets9/"
        icon={<Linkedin size={20} />}
        label="LinkedIn"
        color="linkedin"
      />
      <SocialLink 
        href="https://leetcode.com/u/abhijeets54/"
        icon={<Code size={20} />}
        label="LeetCode"
        color="leetcode"
      />
      <SocialLink 
        href="https://x.com/abhijeets09"
        icon={<Twitter size={20} />}
        label="Twitter"
        color="twitter"
      />
      <SocialLink 
        href="https://www.instagram.com/abhijeets72?igsh=amR0dG04NjRsZ3A1"
        icon={<Instagram size={20} />}
        label="Instagram"
        color="instagram"
      />
      <SocialLink 
        href="mailto:as9184635@gmail.com"
        icon={<Mail size={20} />}
        label="Email"
        color="email"
      />
      <SocialLink 
        href="https://www.geeksforgeeks.org/user/as9189lb5/"
        icon={<Code2 size={20} />}
        label="GeeksforGeeks"
        color="geeksforgeeks"
      />
    </div>
  );
}

// Add this to globals.css
/*
.social-links-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.social-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--foreground);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  max-width: 2.5rem;
}

.social-link:hover {
  max-width: 10rem;
}

.social-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: white;
  flex-shrink: 0;
}

.social-text {
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  color: white;
  white-space: nowrap;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.social-link:hover .social-text {
  opacity: 1;
}

.social-link.github .social-icon-container {
  background-color: #333;
}

.social-link.linkedin .social-icon-container {
  background-color: #0077b5;
}

.social-link.leetcode .social-icon-container {
  background-color: #f89f1b;
}

.social-link.twitter .social-icon-container {
  background-color: #1da1f2;
}

.social-link.instagram .social-icon-container {
  background-color: #e4405f;
}

.social-link.email .social-icon-container {
  background-color: #ea4335;
}

.social-link.github {
  background-color: #333;
}

.social-link.linkedin {
  background-color: #0077b5;
}

.social-link.leetcode {
  background-color: #f89f1b;
}

.social-link.twitter {
  background-color: #1da1f2;
}

.social-link.instagram {
  background-color: #e4405f;
}

.social-link.email {
  background-color: #ea4335;
}

.dark .social-link {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

@media (max-width: 640px) {
  .social-links-container {
    gap: 0.5rem;
  }
  
  .social-icon-container {
    width: 2rem;
    height: 2rem;
  }
  
  .social-link {
    max-width: 2rem;
  }
  
  .social-link:hover {
    max-width: 8rem;
  }
}
*/ 