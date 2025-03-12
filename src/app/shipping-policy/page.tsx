'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-3xl md:text-4xl text-[#2c2c27] mb-8">Shipping Policy</h1>
        
        <div className="prose prose-lg max-w-none text-[#5c5c52]">
          <p className="mb-6">
            At Ankkor, we strive to provide you with the best possible shipping experience. This Shipping Policy outlines our shipping methods, timeframes, and costs.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Processing Time</h2>
          <p className="mb-6">
            All orders are processed within 1-2 business days (Monday-Friday, excluding holidays) after receiving your order confirmation email. Orders placed after 12 PM EST will be processed the next business day.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Shipping Methods and Timeframes</h2>
          <p className="mb-4">We offer the following shipping options:</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#e5e2d9]">
                  <th className="py-2 px-4 text-left font-serif text-[#2c2c27]">Shipping Method</th>
                  <th className="py-2 px-4 text-left font-serif text-[#2c2c27]">Estimated Delivery Time</th>
                  <th className="py-2 px-4 text-left font-serif text-[#2c2c27]">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#e5e2d9]">
                  <td className="py-2 px-4">Standard Shipping</td>
                  <td className="py-2 px-4">5-7 business days</td>
                  <td className="py-2 px-4">$10 (Free on orders over $200)</td>
                </tr>
                <tr className="border-b border-[#e5e2d9]">
                  <td className="py-2 px-4">Expedited Shipping</td>
                  <td className="py-2 px-4">2-3 business days</td>
                  <td className="py-2 px-4">$25</td>
                </tr>
                <tr className="border-b border-[#e5e2d9]">
                  <td className="py-2 px-4">Overnight Shipping</td>
                  <td className="py-2 px-4">1 business day</td>
                  <td className="py-2 px-4">$45</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="mb-6">
            Please note that these timeframes are estimates and not guarantees. Delivery times may vary due to carrier delays, weather conditions, or other unforeseen circumstances.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">International Shipping</h2>
          <p className="mb-6">
            We currently ship to select countries worldwide. International shipping rates and delivery times vary by country and order value. Customs fees, import taxes, and duties are not included in the product price or shipping cost. These charges are the buyer's responsibility and will be collected by the carrier or local customs office.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Tracking Information</h2>
          <p className="mb-6">
            Once your order has shipped, you will receive a shipping confirmation email with a tracking number. You can track your order by clicking the tracking link in the email or by logging into your account on our website.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Shipping Restrictions</h2>
          <p className="mb-6">
            We are unable to ship to P.O. boxes or APO/FPO addresses. For certain remote areas, additional shipping charges may apply.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Lost or Damaged Packages</h2>
          <p className="mb-6">
            Ankkor is not responsible for lost or stolen packages once they have been delivered to the address provided at checkout. If your tracking information shows that your package was delivered but you have not received it, please contact the carrier directly.
          </p>
          <p className="mb-6">
            If your package arrives damaged, please take photos of the damaged package and contact our customer service team within 48 hours of delivery.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Address Changes</h2>
          <p className="mb-6">
            If you need to change your shipping address after placing your order, please contact us immediately. We cannot guarantee that we will be able to change the address if your order has already been processed.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Contact Us</h2>
          <p className="mb-6">
            If you have any questions about our shipping policy, please contact our customer service team:
          </p>
          <p className="mb-6">
            <strong>Email:</strong> shipping@ankkor.com<br />
            <strong>Phone:</strong> 1-800-ANKKOR-1<br />
            <strong>Hours:</strong> Monday-Friday, 9 AM - 5 PM EST
          </p>
          
          <p className="mt-8 text-sm">Last Updated: May 15, 2024</p>
        </div>
      </motion.div>
    </div>
  );
} 