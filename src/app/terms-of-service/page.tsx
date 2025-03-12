'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-3xl md:text-4xl text-[#2c2c27] mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none text-[#5c5c52]">
          <p className="mb-6">
            Welcome to Ankkor. These Terms of Service ("Terms") govern your access to and use of our website, products, and services. By accessing or using our services, you agree to be bound by these Terms.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-6">
            By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">2. Changes to Terms</h2>
          <p className="mb-6">
            We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the updated Terms on our website. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">3. Account Registration</h2>
          <p className="mb-6">
            To access certain features of our website, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>
          <p className="mb-6">
            You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">4. Products and Orders</h2>
          <p className="mb-6">
            All product descriptions, including pricing and availability, are subject to change without notice. We reserve the right to limit quantities of products purchased and to refuse or cancel orders at our discretion.
          </p>
          <p className="mb-6">
            When you place an order, you represent that you are authorized to use the payment method provided and that you have sufficient funds to cover the cost of the order.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">5. Shipping and Delivery</h2>
          <p className="mb-6">
            Shipping times and costs are estimates only and are not guaranteed. We are not responsible for delays or delivery failures due to circumstances beyond our control, including but not limited to weather conditions, natural disasters, or carrier delays.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">6. Returns and Refunds</h2>
          <p className="mb-6">
            Please refer to our Return Policy for information on returns, exchanges, and refunds. By making a purchase, you agree to the terms of our Return Policy.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">7. Intellectual Property</h2>
          <p className="mb-6">
            All content on our website, including but not limited to text, graphics, logos, images, and software, is the property of Ankkor or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="mb-6">
            You may not reproduce, distribute, modify, display, perform, or use any content from our website without our prior written consent.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">8. User Conduct</h2>
          <p className="mb-6">
            You agree not to use our services for any unlawful purpose or in any way that could damage, disable, overburden, or impair our services. You also agree not to attempt to gain unauthorized access to any part of our services, computer systems, or networks.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">9. Disclaimer of Warranties</h2>
          <p className="mb-6">
            Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">10. Limitation of Liability</h2>
          <p className="mb-6">
            In no event shall Ankkor, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">11. Governing Law</h2>
          <p className="mb-6">
            These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">12. Contact Information</h2>
          <p className="mb-6">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mb-6">
            <strong>Email:</strong> legal@ankkor.com<br />
            <strong>Address:</strong> 123 Fashion Avenue, New York, NY 10001
          </p>
          
          <p className="mt-8 text-sm">Last Updated: May 15, 2024</p>
        </div>
      </motion.div>
    </div>
  );
} 