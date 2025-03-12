'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-3xl md:text-4xl text-[#2c2c27] mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-[#5c5c52]">
          <p className="mb-6">
            At Ankkor, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Information We Collect</h2>
          <p className="mb-4">We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Register on our website</li>
            <li>Place an order</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us</li>
            <li>Participate in promotions or surveys</li>
          </ul>
          <p className="mb-6">
            The personal information we collect may include your name, email address, postal address, phone number, and payment information.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">How We Use Your Information</h2>
          <p className="mb-4">We may use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Process and fulfill your orders</li>
            <li>Send you order confirmations and updates</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Prevent fraudulent transactions and monitor against theft</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Cookies and Tracking Technologies</h2>
          <p className="mb-6">
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Third-Party Disclosure</h2>
          <p className="mb-6">
            We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Security</h2>
          <p className="mb-6">
            We use administrative, technical, and physical security measures to protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Your Rights</h2>
          <p className="mb-4">Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>The right to access personal information we hold about you</li>
            <li>The right to request correction of inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to withdraw consent</li>
            <li>The right to opt-out of marketing communications</li>
          </ul>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p className="mb-6">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Contact Us</h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mb-6">
            <strong>Email:</strong> privacy@ankkor.com<br />
            <strong>Address:</strong> 123 Fashion Avenue, New York, NY 10001
          </p>
          
          <p className="mt-8 text-sm">Last Updated: May 15, 2024</p>
        </div>
      </motion.div>
    </div>
  );
} 