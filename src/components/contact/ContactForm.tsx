'use client';

import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { SendIcon, CheckCircle, AlertCircle } from 'lucide-react';

const formSchema = z.object({
  from_name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  from_email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  subject: z
    .string()
    .min(2, { message: 'Subject must be at least 2 characters' })
    .max(100, { message: 'Subject must be less than 100 characters' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message must be less than 1000 characters' }),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormData>({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // EmailJS config
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ;
  
  // Initialize EmailJS only once
  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, [PUBLIC_KEY]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    try {
      formSchema.parse(formState);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare form data with timestamp
      const templateParams = {
        from_name: formState.from_name,
        from_email: formState.from_email,
        subject: formState.subject,
        message: formState.message,
        time: new Date().toLocaleString()
      };
      
      // Send email - don't pass public key here, it was already initialized
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams
      );
      
      console.log('Email sent successfully:', result.text);
      setSubmitStatus('success');
      setFormState({
        from_name: '',
        from_email: '',
        subject: '',
        message: '',
      });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div 
      className="contact-form-box"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h3 className="font-serif text-2xl mb-6">Get In Touch</h3>
      
      {submitStatus === 'success' && (
        <div className="form-success mb-6 flex items-center p-4 border border-green-500/20 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 rounded-md">
          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>Your message has been sent successfully! I'll get back to you soon.</span>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="form-error-message mb-6 flex items-center p-4 border border-red-500/20 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-md">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>There was an error sending your message. Please try again later or contact me directly via email.</span>
        </div>
      )}
      
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            id="from_name"
            name="from_name"
            value={formState.from_name}
            onChange={handleChange}
            required
          />
          <label htmlFor="from_name">Name</label>
          {errors.from_name && (
            <p className="form-error">{errors.from_name}</p>
          )}
        </div>
        
        <div className="user-box">
          <input
            type="email"
            id="from_email"
            name="from_email"
            value={formState.from_email}
            onChange={handleChange}
            required
          />
          <label htmlFor="from_email">Email</label>
          {errors.from_email && (
            <p className="form-error">{errors.from_email}</p>
          )}
        </div>
        
        <div className="user-box">
          <input
            type="text"
            id="subject"
            name="subject"
            value={formState.subject}
            onChange={handleChange}
            required
          />
          <label htmlFor="subject">Subject</label>
          {errors.subject && (
            <p className="form-error">{errors.subject}</p>
          )}
        </div>
        
        <div className="user-box">
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            rows={5}
            required
          />
          <label htmlFor="message">Message</label>
          {errors.message && (
            <p className="form-error">{errors.message}</p>
          )}
        </div>
        
        <div className="text-center">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'SENDING...' : 'SEND'}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;