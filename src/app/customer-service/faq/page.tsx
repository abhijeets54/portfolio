'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

// FAQ Item component with accordion functionality
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-[#e5e2d9] py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center text-left"
      >
        <h3 className="text-lg font-serif text-[#2c2c27]">{question}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-[#8a8778]" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#8a8778]" />
        )}
      </button>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pt-4 text-[#5c5c52] leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
};

// FAQ categories and questions
const faqData = [
  {
    category: 'Orders & Shipping',
    items: [
      {
        question: 'How long does shipping take?',
        answer: 'Domestic orders typically arrive within 3-5 business days. International shipping can take 7-14 business days, depending on the destination country and customs processing. All orders are shipped with tracking information so you can monitor your package\'s journey.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. International customers may be responsible for duties, taxes, and customs clearance fees, which are not included in the purchase price. Shipping rates are calculated at checkout based on destination and package weight.'
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you will receive a confirmation email with tracking information. You can also view your order status and tracking details in your account dashboard under "Order History".'
      },
      {
        question: 'Can I change or cancel my order?',
        answer: 'We begin processing orders promptly, so changes or cancellations must be requested within 2 hours of placing your order. Please contact our customer service team immediately if you need to modify your order.'
      }
    ]
  },
  {
    category: 'Returns & Exchanges',
    items: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for unworn, unwashed items in their original condition with all tags attached. Returns must be initiated through your account dashboard or by contacting our customer service team. A prepaid return label will be provided for domestic returns.'
      },
      {
        question: 'How do I exchange an item for a different size?',
        answer: 'For exchanges, please return the original item following our return process and place a new order for the desired size. This ensures the size you want remains available during the return processing period. If you have any concerns about sizing, our customer service team is available to assist.'
      },
      {
        question: 'Are return shipping costs covered?',
        answer: 'We cover return shipping costs for domestic orders. International customers are responsible for return shipping fees, but once the return is received and processed, we will refund the original shipping cost if the entire order is returned.'
      },
      {
        question: 'How long does it take to process a return?',
        answer: 'Returns are typically processed within 5-7 business days after we receive the item. Refunds will be issued to the original payment method and may take an additional 3-5 business days to appear on your statement, depending on your financial institution.'
      }
    ]
  },
  {
    category: 'Product Information',
    items: [
      {
        question: 'How do I find my correct size?',
        answer: 'We provide detailed size guides for our shirts and pants collections. You can find these guides on product pages or in our dedicated Size Guide section. For personalized sizing assistance, please contact our customer service team with your measurements, and we\'ll be happy to recommend the best size for you.'
      },
      {
        question: 'What materials do you use in your products?',
        answer: 'We source the finest materials from heritage mills around the world, including Egyptian cotton for our shirts, and premium wools and cotton for our pants. Each product page provides detailed information about the specific materials used in that garment, including origin and care instructions.'
      },
      {
        question: 'How should I care for my Ankkor garments?',
        answer: 'Each item comes with specific care instructions on the product label. Generally, we recommend gentle washing or dry cleaning, depending on the fabric. Proper care will ensure your Ankkor garments maintain their quality and appearance for years to come. For detailed care advice, please refer to the Care Instructions section on each product page.'
      },
      {
        question: 'Are your products sustainable?',
        answer: 'Sustainability is a core value at Ankkor. We partner with mills and manufacturers who share our commitment to ethical and environmentally responsible practices. We focus on creating timeless pieces that last for years rather than following fast fashion trends, reducing overall consumption and waste.'
      }
    ]
  },
  {
    category: 'Account & Orders',
    items: [
      {
        question: 'How do I create an account?',
        answer: 'You can create an account by clicking the "Account" icon in the top navigation bar and selecting "Register." You\'ll need to provide your email address and create a password. Having an account allows you to track orders, save your shipping information, and create a wishlist of favorite items.'
      },
      {
        question: 'Can I place an order without creating an account?',
        answer: 'Yes, we offer a guest checkout option that allows you to place orders without creating an account. However, creating an account provides benefits such as order tracking, faster checkout for future purchases, and access to your order history.'
      },
      {
        question: 'How can I check the status of my order?',
        answer: 'If you have an account, you can check your order status by logging in and visiting the "Order History" section. If you checked out as a guest, you can use the order tracking link provided in your order confirmation email.'
      },
      {
        question: 'Is my personal information secure?',
        answer: 'Yes, we take data security very seriously. We use industry-standard encryption and security measures to protect your personal and payment information. We never store complete credit card details on our servers. For more information, please review our Privacy Policy.'
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f5] py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-8 text-sm text-[#8a8778]">
          <Link href="/" className="hover:text-[#2c2c27] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/customer-service" className="hover:text-[#2c2c27] transition-colors">Customer Service</Link>
          <span className="mx-2">/</span>
          <span className="text-[#2c2c27]">Frequently Asked Questions</span>
        </div>
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-serif font-bold mb-6 text-[#2c2c27]">
            Frequently Asked Questions
          </h1>
          <p className="text-[#5c5c52] leading-relaxed">
            Find answers to common questions about our products, ordering process, shipping, and returns. 
            If you can't find what you're looking for, please don't hesitate to contact our customer service team.
          </p>
        </div>
        
        {/* FAQ Content */}
        <div className="max-w-3xl mx-auto">
          {faqData.map((category, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl font-serif font-bold mb-6 text-[#2c2c27] border-b border-[#8a8778] pb-2">
                {category.category}
              </h2>
              <div>
                {category.items.map((item, itemIndex) => (
                  <FAQItem 
                    key={itemIndex} 
                    question={item.question} 
                    answer={item.answer} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Contact Section */}
        <div className="max-w-3xl mx-auto mt-16 text-center bg-[#f4f3f0] p-8 border border-[#e5e2d9]">
          <h2 className="text-2xl font-serif font-bold mb-4 text-[#2c2c27]">
            Still Have Questions?
          </h2>
          <p className="text-[#5c5c52] mb-6">
            Our customer service team is here to assist you with any inquiries not covered in our FAQ.
          </p>
          <Link 
            href="/customer-service/contact" 
            className="inline-block bg-[#2c2c27] text-[#f4f3f0] px-8 py-3 hover:bg-[#3d3d35] transition-colors text-sm tracking-wider uppercase font-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
} 