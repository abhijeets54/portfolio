'use client';

import React, { useState, useRef } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Loader from '@/components/ui/loader';

// Define the form data type
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Define the form errors type
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// EmailJS configuration
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_id';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_id';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key';

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Send email using EmailJS
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current!,
        PUBLIC_KEY
      );
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {submitStatus === 'success' ? (
        <div className="bg-[#f4f3f0] p-8 rounded-lg text-center">
          <CheckCircle className="w-16 h-16 text-[#2c2c27] mx-auto mb-4" />
          <h3 className="font-serif text-2xl font-bold text-[#2c2c27] mb-2">Message Sent</h3>
          <p className="text-[#5c5c52] mb-6">
            Thank you for contacting us. We have received your message and will respond shortly.
          </p>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="bg-[#2c2c27] text-[#f4f3f0] px-6 py-3 text-sm uppercase tracking-wider hover:bg-[#3d3d35] transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-red-800 font-medium">Error</h4>
                <p className="text-red-700 text-sm">
                  There was a problem sending your message. Please try again later.
                </p>
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-[#5c5c52] mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border ${
                errors.name ? 'border-red-300' : 'border-[#e5e2d9]'
              } bg-[#f8f8f5] p-3 focus:border-[#8a8778] focus:outline-none focus:ring-1 focus:ring-[#8a8778]`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-[#5c5c52] mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${
                errors.email ? 'border-red-300' : 'border-[#e5e2d9]'
              } bg-[#f8f8f5] p-3 focus:border-[#8a8778] focus:outline-none focus:ring-1 focus:ring-[#8a8778]`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-[#5c5c52] mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full border ${
                errors.subject ? 'border-red-300' : 'border-[#e5e2d9]'
              } bg-[#f8f8f5] p-3 focus:border-[#8a8778] focus:outline-none focus:ring-1 focus:ring-[#8a8778]`}
            />
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
          </div>
          
          <div>
            <label htmlFor="message" className="block text-[#5c5c52] mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className={`w-full border ${
                errors.message ? 'border-red-300' : 'border-[#e5e2d9]'
              } bg-[#f8f8f5] p-3 focus:border-[#8a8778] focus:outline-none focus:ring-1 focus:ring-[#8a8778]`}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#2c2c27] text-[#f4f3f0] px-8 py-3 flex items-center justify-center text-sm uppercase tracking-wider hover:bg-[#3d3d35] transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader size="sm" color="#f4f3f0" className="mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm; 