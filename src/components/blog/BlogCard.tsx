"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { BlogMetadata } from "@/lib/blog";

interface BlogCardProps {
  post: BlogMetadata;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      <Link href={`/blog/${post.slug}`}>
        {/* Image Section */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Meta Information */}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-300 line-clamp-3 text-sm sm:text-base leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Read More and Project Link */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:gap-4 transition-all duration-300">
              <span>Read More</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
            {post.projectUrl && (
              <a
                href={post.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Visit</span>
              </a>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
