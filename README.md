# Abhijeet's Developer Portfolio

A professional software developer portfolio built with Next.js, TypeScript, TailwindCSS, and modern UI components.

## Features

- **Modern Tech Stack**: Next.js 14 with App Router, React Server Components, TypeScript
- **Responsive Design**: Mobile-first approach with full responsiveness across all devices
- **Animations**: Framer Motion for smooth animations and transitions
- **UI Components**: Custom components with shadcn/ui, Aceternity UI, and uiverse.io elements
- **Styling**: TailwindCSS for utility-first styling with dark/light mode
- **Performance**: Optimized for Core Web Vitals
- **Accessibility**: WCAG 2.1 AA compliant
- **Contact Form**: EmailJS integration for direct messaging

## Sections

- **Homepage/Hero**: Professional introduction with download resume button
- **Projects**: Showcase of development projects with technologies and links
- **Skills**: Technologies and programming languages proficiency
- **Extracurricular**: Additional activities and interests
- **Contact**: Email contact form and social links

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # EmailJS Configuration
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=contact_service
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=contact_form
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```
   
   For detailed instructions on setting up EmailJS, see [EMAILJS-SETUP.md](./EMAILJS-SETUP.md)

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
portfolio/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── project/          # Project detail pages
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Homepage
│   ├── components/           # React components
│   │   ├── common/           # Common components
│   │   ├── contact/          # Contact form components
│   │   ├── layout/           # Layout components
│   │   ├── project/          # Project components 
│   │   ├── providers/        # Context providers
│   │   └── ui/               # UI components
│   ├── lib/                  # Utility functions
│   │   └── store.ts          # Zustand store
│   └── styles/               # Global styles
├── public/                   # Static assets
│   ├── favicon/              # Favicon files
│   ├── images/               # Image assets
│   └── site.webmanifest      # Web app manifest
├── .env.local                # Environment variables
├── .gitignore                # Git ignore file
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
├── README.md                 # Project documentation
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Customization

### Brand Colors

The color palette is defined in the TailwindCSS configuration and in the globals.css file. The main colors are:

- Primary: Various gradient colors (dark theme focused)
- Background: Dark in dark mode, light in light mode
- Accent: Gradient effects and highlights

### Typography

The site uses two main fonts:
- Serif: Playfair Display for headings
- Sans-serif: Inter for body text

## Deployment

The site can be deployed to Vercel with a single click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fportfolio)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Lucide Icons](https://lucide.dev/)
- [EmailJS](https://www.emailjs.com/)
- [Aceternity UI](https://ui.aceternity.com/)
- [UIverse](https://uiverse.io/)
