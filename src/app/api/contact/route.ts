import { NextRequest, NextResponse } from 'next/server';
import emailjs from '@emailjs/browser';

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();
    const { name, email, message, subject } = body;
    
    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Note: In Next.js API routes, you'd normally use a server-side approach
    // For EmailJS specifically, it's designed for client-side use
    // The client component (ContactForm.tsx) already handles the EmailJS integration
    // This API route serves as a fallback or for future server-side email handling
    
    // For now, we'll log the submission and return success
    console.log('Contact form submission:', { name, email, subject, message });
    
    // Return success
    return NextResponse.json(
      { success: true, message: 'Message received. Please note that direct EmailJS integration happens on the client side.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process message' },
      { status: 500 }
    );
  }
} 