'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-[#f8f8f5]">
      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80"
          alt="Ankkor Heritage"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-[#2c2c27] bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Our Heritage</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              A legacy of timeless elegance and uncompromising craftsmanship
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <motion.section 
        className="py-24 px-4 bg-[#f4f3f0]"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" variants={fadeIn}>
            <h2 className="text-3xl font-serif font-bold mb-6 text-[#2c2c27]">
              The Ankkor Legacy
            </h2>
            <p className="text-[#5c5c52] leading-relaxed">
              Founded on the principles of exceptional quality and timeless design, Ankkor represents 
              a return to the values that once defined luxury menswear. Our journey began with a simple 
              vision: to create garments of uncompromising quality that stand the test of time, both in 
              their construction and their aesthetic.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeIn}>
              <Image
                src="https://images.unsplash.com/photo-1529720317453-c8da503f2051?q=80"
                alt="Ankkor Craftsmanship"
                width={600}
                height={700}
                className="w-full h-auto grayscale"
              />
            </motion.div>
            
            <motion.div className="space-y-6" variants={fadeIn}>
              <h3 className="text-2xl font-serif font-bold text-[#2c2c27]">
                Craftsmanship Above All
              </h3>
              <p className="text-[#5c5c52] leading-relaxed">
                At Ankkor, we believe that true luxury lies not in logos or trends, but in the 
                quality of materials, the precision of the cut, and the attention to detail that 
                goes into every garment. Our master tailors bring decades of experience to their 
                craft, employing techniques that have been perfected over generations.
              </p>
              <p className="text-[#5c5c52] leading-relaxed">
                Each piece in our collection undergoes a rigorous process of design, pattern-making, 
                cutting, and assembly. We source the finest fabrics from heritage mills in Italy, 
                England, and Japan, selecting materials not only for their beauty but for their 
                durability and character.
              </p>
              <p className="text-[#5c5c52] leading-relaxed">
                The result is clothing that not only looks exceptional when new but develops a 
                unique patina over time, becoming more personal and distinguished with each wear.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Our Philosophy */}
      <motion.section 
        className="py-24 px-4 bg-[#faf9f6]"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div className="space-y-6 order-2 md:order-1" variants={fadeIn}>
              <h3 className="text-2xl font-serif font-bold text-[#2c2c27]">
                A Philosophy of Timelessness
              </h3>
              <p className="text-[#5c5c52] leading-relaxed">
                In an era of fast fashion and disposable trends, Ankkor stands for permanence. 
                We design garments that transcend seasons and fads, focusing instead on the 
                perfect cut, the ideal proportion, and the subtle details that elevate a piece 
                from merely good to truly exceptional.
              </p>
              <p className="text-[#5c5c52] leading-relaxed">
                Our aesthetic draws inspiration from the understated elegance of old-world 
                luxury—a time when quality spoke for itself and refinement was measured in 
                the subtlety of details rather than the loudness of statements.
              </p>
              <p className="text-[#5c5c52] leading-relaxed">
                We believe that the most sophisticated garments are those that enhance the 
                wearer without overwhelming him, that complement rather than demand attention, 
                and that reveal their quality through experience rather than announcement.
              </p>
            </motion.div>
            
            <motion.div className="order-1 md:order-2" variants={fadeIn}>
              <Image
                src="https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?q=80"
                alt="Ankkor Philosophy"
                width={600}
                height={700}
                className="w-full h-auto grayscale"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Our Values */}
      <motion.section 
        className="py-24 px-4 bg-[#f4f3f0]"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" variants={fadeIn}>
            <h2 className="text-3xl font-serif font-bold mb-6 text-[#2c2c27]">
              Our Core Values
            </h2>
            <p className="text-[#5c5c52] leading-relaxed">
              The principles that guide every decision we make, from design to delivery
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div className="text-center" variants={fadeIn}>
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[#8a8778]">
                <span className="text-[#2c2c27] font-serif text-2xl">01</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 text-[#2c2c27]">Quality Without Compromise</h3>
              <p className="text-[#5c5c52]">
                We never sacrifice quality for convenience or cost. Every decision, from fabric selection 
                to construction technique, is made with a single question in mind: "Is this the absolute best way?"
              </p>
            </motion.div>
            
            <motion.div className="text-center" variants={fadeIn}>
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[#8a8778]">
                <span className="text-[#2c2c27] font-serif text-2xl">02</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 text-[#2c2c27]">Timeless Design</h3>
              <p className="text-[#5c5c52]">
                We create garments that will be as relevant and stylish a decade from now as they are today. 
                Our designs honor classic proportions and subtle details that have defined elegant menswear 
                for generations.
              </p>
            </motion.div>
            
            <motion.div className="text-center" variants={fadeIn}>
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[#8a8778]">
                <span className="text-[#2c2c27] font-serif text-2xl">03</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 text-[#2c2c27]">Ethical Production</h3>
              <p className="text-[#5c5c52]">
                We believe luxury should never come at the expense of people or the planet. We work exclusively 
                with partners who share our commitment to fair labor practices and environmental responsibility.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Craftsmanship Process */}
      <motion.section 
        className="py-24 px-4 bg-[#faf9f6]"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" variants={fadeIn}>
            <h2 className="text-3xl font-serif font-bold mb-6 text-[#2c2c27]">
              The Art of Craftsmanship
            </h2>
            <p className="text-[#5c5c52] leading-relaxed">
              Every Ankkor garment passes through the hands of skilled artisans who bring decades 
              of experience to their craft
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div variants={fadeIn}>
              <div className="relative h-[400px] mb-6 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80"
                  alt="Material Selection"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-[#2c2c27]">Material Selection</h3>
              <p className="text-[#5c5c52] leading-relaxed">
                We source the finest fabrics from heritage mills with centuries of tradition. Each material 
                is selected not only for its immediate beauty but for how it will wear and develop character 
                over time. From Egyptian cotton to Italian wool, we choose only materials that meet our 
                exacting standards.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <div className="relative h-[400px] mb-6 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80"
                  alt="Pattern Making"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-[#2c2c27]">Pattern Making</h3>
              <p className="text-[#5c5c52] leading-relaxed">
                Our master pattern makers develop each design with meticulous attention to proportion and fit. 
                Rather than following trends, we refine classic patterns to create garments that flatter the 
                body while allowing comfort and movement. Each pattern is tested and adjusted until it achieves 
                the perfect balance of form and function.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <div className="relative h-[400px] mb-6 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80"
                  alt="Cutting and Assembly"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-[#2c2c27]">Cutting and Assembly</h3>
              <p className="text-[#5c5c52] leading-relaxed">
                Each piece is cut with precision and assembled by skilled tailors who take pride in their craft. 
                We use traditional techniques like hand-felled seams and single-needle stitching that take more 
                time but result in garments of exceptional durability and refinement. Nothing leaves our workshop 
                until it meets our exacting standards.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <div className="relative h-[400px] mb-6 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80"
                  alt="Finishing Touches"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-[#2c2c27]">Finishing Touches</h3>
              <p className="text-[#5c5c52] leading-relaxed">
                The difference between a good garment and an exceptional one often lies in the details. From 
                mother-of-pearl buttons to hand-finished buttonholes, we pay attention to every element that 
                contributes to the final piece. Each garment undergoes multiple inspections before it is deemed 
                worthy of the Ankkor name.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Call to Action */}
      <motion.section 
        className="py-24 px-4 bg-[#2c2c27] text-[#f4f3f0]"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Experience Ankkor</h2>
          <p className="text-[#d5d0c3] mb-10 max-w-2xl mx-auto">
            Discover our collection of timeless essentials, crafted with uncompromising attention to 
            quality and detail. Each piece is designed to become a cornerstone of your wardrobe for 
            years to come.
          </p>
          <Link href="/collection">
            <motion.button 
              className="border border-[#8a8778] text-[#f4f3f0] px-10 py-4 hover:bg-[#3d3d35] transition-colors text-sm tracking-wider uppercase font-medium inline-flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore the Collection
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
} 