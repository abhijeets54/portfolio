"use client";

import { motion } from "framer-motion";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog";

export default function BlogPage() {
  const allPosts = getAllBlogPosts();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Blog
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Insights from building production-grade applications, solving complex problems, and exploring modern technologies
          </p>
        </motion.div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>

    </div>
  );
}
