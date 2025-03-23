# EmailJS Setup Guide

This guide will walk you through setting up EmailJS for the contact form in your portfolio.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and sign up for an account
2. Verify your email address

## Step 2: Add an Email Service

1. In the EmailJS dashboard, navigate to "Email Services"
2. Click "Add New Service"
3. Choose a service:
   - For personal use: Gmail, Outlook, or another personal email service
   - For production: A transactional email service like SendGrid, Mailgun, etc.
4. Name your service "Contact Service" 
5. Set the Service ID as "contact_service" (to match the .env.local file)
6. Connect your email account by following the on-screen instructions
7. Click "Add Service"

## Step 3: Create an Email Template

1. In the EmailJS dashboard, navigate to "Email Templates"
2. Click "Create New Template"
3. Select the "Contact Us" template
4. Configure the template:
   - Set Template ID to "contact_form" (to match the .env.local file)
   - Subject: "New message from {{from_name}}"
   - Content: Customize as needed, but ensure you include the variables:
     ```
     Name: {{from_name}}
     Email: {{from_email}}
     Subject: {{subject}}
     Message: {{message}}
     ```
   - Set "To Email" to your contact email address
   - Set "Reply To" to "{{from_email}}"
5. Save the template

## Step 4: (Optional) Set Up Auto-Reply

1. Create another template using the "Auto-Reply" template
2. Configure:
   - Set "To Email" to "{{from_email}}"
   - Customize the content
3. Save the template
4. Go back to your "Contact Us" template
5. Navigate to the "Auto-Reply" tab
6. Select your auto-reply template
7. Save changes

## Step 5: Get Your Public Key

1. In the EmailJS dashboard, go to "Account" > "API Keys"
2. Copy your "Public Key"

## Step 6: Update Environment Variables

1. Open the `.env.local` file in your project
2. Update the following variables:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=contact_service
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=contact_form
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```
   Replace `your_public_key` with the actual key you copied in Step 5

## Testing Your Contact Form

1. Run your project locally
2. Navigate to the contact form
3. Fill out the form and submit
4. Check your email inbox (and spam folder) for the received message

## Troubleshooting

If you encounter issues:

1. Verify all environment variables are correctly set
2. Check the browser console for any errors
3. Ensure your EmailJS account is active and has not reached its limits
4. Confirm that your email service is properly connected in the EmailJS dashboard

For more detailed information, see the [EmailJS documentation](https://www.emailjs.com/docs/). 