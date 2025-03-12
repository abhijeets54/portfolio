'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-3xl md:text-4xl text-[#2c2c27] mb-8">Return Policy</h1>
        
        <div className="prose prose-lg max-w-none text-[#5c5c52]">
          <p className="mb-6">
            At Ankkor, we stand behind the quality of our products. We want you to be completely satisfied with your purchase. If for any reason you are not, we offer a straightforward return policy.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Return Eligibility</h2>
          <p className="mb-6">
            You may return most new, unworn items within 30 days of delivery for a full refund of the item price (excluding shipping costs). To be eligible for a return, your item must be in the same condition that you received it, unworn, with tags, and in its original packaging.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Non-Returnable Items</h2>
          <p className="mb-4">The following items cannot be returned:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Items marked as "Final Sale" or "Non-Returnable"</li>
            <li>Gift cards</li>
            <li>Personalized or custom-made items</li>
            <li>Intimate apparel for hygiene reasons</li>
            <li>Items damaged due to customer misuse</li>
          </ul>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Return Process</h2>
          <p className="mb-4">To initiate a return, please follow these steps:</p>
          <ol className="list-decimal pl-6 mb-6">
            <li className="mb-2">Log in to your account on our website and navigate to your order history.</li>
            <li className="mb-2">Select the order containing the item(s) you wish to return.</li>
            <li className="mb-2">Click on "Return Items" and follow the prompts to complete the return request form.</li>
            <li className="mb-2">Print the prepaid return shipping label (if applicable) and return authorization form.</li>
            <li className="mb-2">Pack the item(s) securely in the original packaging if possible.</li>
            <li>Attach the return shipping label to the outside of the package and drop it off at the designated carrier location.</li>
          </ol>
          
          <p className="mb-6">
            If you received a defective or incorrect item, please contact our customer service team before initiating a return.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Return Shipping</h2>
          <p className="mb-6">
            For standard returns, customers are responsible for return shipping costs. If you received a defective, damaged, or incorrect item, we will provide a prepaid return shipping label.
          </p>
          <p className="mb-6">
            We recommend using a trackable shipping service and purchasing shipping insurance for items of value. We cannot guarantee that we will receive your returned item.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Refunds</h2>
          <p className="mb-6">
            Once we receive and inspect your return, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
          </p>
          <p className="mb-6">
            If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days. Please note that it may take an additional 2-5 business days for the refund to appear in your account, depending on your financial institution.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Exchanges</h2>
          <p className="mb-6">
            We do not process direct exchanges. If you need a different size, color, or item, please return the original purchase and place a new order for the desired item.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Late or Missing Refunds</h2>
          <p className="mb-6">
            If you haven't received a refund after the timeframe mentioned above, please check your bank account again, then contact your credit card company or bank. There is often some processing time before a refund is posted. If you've done all of this and you still have not received your refund, please contact our customer service team.
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Sale Items</h2>
          <p className="mb-6">
            Items on sale can be returned within the standard 30-day return window unless marked as "Final Sale."
          </p>
          
          <h2 className="font-serif text-2xl text-[#2c2c27] mt-8 mb-4">Contact Us</h2>
          <p className="mb-6">
            If you have any questions about our return policy, please contact our customer service team:
          </p>
          <p className="mb-6">
            <strong>Email:</strong> returns@ankkor.com<br />
            <strong>Phone:</strong> 1-800-ANKKOR-1<br />
            <strong>Hours:</strong> Monday-Friday, 9 AM - 5 PM EST
          </p>
          
          <p className="mt-8 text-sm">Last Updated: May 15, 2024</p>
        </div>
      </motion.div>
    </div>
  );
} 