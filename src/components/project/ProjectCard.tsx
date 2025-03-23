import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Info } from 'lucide-react';
import ImageContainer from '@/components/ui/ImageContainer';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  featured?: boolean;
}

const ProjectCard = ({
  id,
  title,
  description,
  image,
  tags,
  liveUrl,
  featured = false,
}: ProjectCardProps) => {
  return (
    <motion.div 
      className="group relative glow-effect"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden mb-4">
        {/* Project Image */}
        <ImageContainer
          src={image}
          alt={title}
          aspectRatio="16/9"
          className="bg-card rounded-sm"
          imageClassName="image-animate"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
          
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-0 left-0 bg-primary text-primary-foreground py-1 px-3 text-xs uppercase tracking-wider">
            Featured
          </div>
        )}
          
        {/* Overlay with details */}
        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center text-primary-foreground">
          <h4 className="font-serif text-xl mb-2">{title}</h4>
          <p className="text-sm mb-4 line-clamp-3">{description}</p>
          
          <div className="flex gap-4 mt-2">
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background/10 hover:bg-background/20 p-2 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Visit live site"
              >
                <ExternalLink className="h-5 w-5" />
              </motion.a>
            )}

            <motion.a
              href={`/project/${id}`}
              className="bg-background/10 hover:bg-background/20 p-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="View project details"
            >
              <Info className="h-5 w-5" />
            </motion.a>
          </div>
        </div>
      </div>
      
      {/* Project Info */}
      <div>
        <h3 className="font-serif text-lg text-foreground mb-1">{title}</h3>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-sm">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <Link href={`/project/${id}`} className="project-link text-accent text-sm hover:text-accent-foreground">
            View Details
          </Link>
          
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link text-accent text-sm hover:text-accent-foreground flex items-center gap-1"
            >
              Live Demo <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 