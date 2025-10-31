"use client";

import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, ExternalLink } from "lucide-react";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Get related posts (same tags)
  const relatedPosts = getAllBlogPosts()
    .filter((p) => p.slug !== post.slug && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Featured Badge */}
          {post.featured && (
            <div className="mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold">
                Featured Post
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400 mb-8 pb-8 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
            {post.projectUrl && (
              <a
                href={post.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Project</span>
              </a>
            )}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 hover:text-white transition-colors ml-auto"
              aria-label="Share post"
            >
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-[400px] sm:h-[500px] rounded-xl overflow-hidden mb-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-none mb-12"
        >
          <div className="blog-content text-gray-300 leading-relaxed space-y-4">
            {post.content.split("\n").map((line, index) => {
              // Skip code block markers
              if (line.trim().startsWith("```")) {
                return null;
              }

              // Convert markdown headings
              if (line.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-2xl font-bold mt-8 mb-4 text-white">
                    {line.slice(4)}
                  </h3>
                );
              }
              if (line.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-3xl font-bold mt-12 mb-6 text-white">
                    {line.slice(3)}
                  </h2>
                );
              }
              if (line.startsWith("# ")) {
                return (
                  <h1 key={index} className="text-4xl font-bold mt-16 mb-8 text-white">
                    {line.slice(2)}
                  </h1>
                );
              }

              // Convert markdown lists
              if (line.startsWith("- ")) {
                const content = line.slice(2);
                // Process bold, links, and inline code in list items
                return (
                  <li
                    key={index}
                    className="text-gray-300 ml-4 mb-2"
                    dangerouslySetInnerHTML={{
                      __html: content
                        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')
                        .replace(/`([^`]+)`/g, '<span class="text-gray-200">$1</span>'),
                    }}
                  />
                );
              }

              // Horizontal rule
              if (line.trim() === "---") {
                return <hr key={index} className="my-8 border-gray-700" />;
              }

              // Empty lines
              if (line.trim() === "") {
                return <br key={index} />;
              }

              // Regular paragraphs with bold, links, and inline code
              return (
                <p
                  key={index}
                  className="text-gray-300 leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{
                    __html: line
                      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')
                      .replace(/`([^`]+)`/g, '<span class="text-gray-200">$1</span>'),
                  }}
                />
              );
            })}
          </div>
        </motion.div>


        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-white">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </div>
  );
}
