# Ankkor - Luxury Menswear E-commerce

A premium menswear e-commerce website built with Next.js, TypeScript, TailwindCSS, and Shopify integration.

## Features

- **Modern Tech Stack**: Next.js 14 with App Router, React Server Components, TypeScript
- **Responsive Design**: Mobile-first approach with full responsiveness across all devices
- **Shopify Integration**: Complete integration with Shopify Storefront API
- **State Management**: Zustand for client-side state management
- **Animations**: Framer Motion for smooth animations and transitions
- **UI Components**: Custom components with shadcn/ui
- **Styling**: TailwindCSS for utility-first styling
- **Performance**: Optimized for Core Web Vitals
- **Accessibility**: WCAG 2.1 AA compliant

## Pages

- **Homepage**: Showcase of brand identity and featured products
- **Collection/Category Pages**: Browse products with filtering and sorting
- **Product Detail Page**: Detailed product information with image gallery
- **Cart/Checkout**: Integrated with Shopify checkout
- **About/Heritage**: Brand story and values
- **Account Pages**: User authentication and profile management
- **Customer Service Pages**: Contact, FAQ, shipping, returns

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- A Shopify store with Storefront API access

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ankkorshopify.git
   cd ankkorshopify
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
   - Copy `.env.example` to `.env.local`
   - Fill in your Shopify Storefront API credentials

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Shopify Setup

### Creating a Shopify Private App

1. Log in to your Shopify admin panel
2. Go to Apps > Develop apps
3. Click "Create an app"
4. Name your app (e.g., "Ankkor Headless")
5. Set the app URL to your development or production URL
6. Under "Storefront API", select the necessary scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_collection_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_customers`
   - `unauthenticated_read_customers`
7. Save and install the app
8. Copy the Storefront API access token to your `.env.local` file

## Project Structure

```
ankkorshopify/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── about/            # About/Heritage page
│   │   ├── account/          # Account pages
│   │   ├── collection/       # Collection pages
│   │   ├── customer-service/ # Customer service pages
│   │   ├── product/          # Product detail page
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Homepage
│   ├── components/           # React components
│   │   ├── cart/             # Cart components
│   │   ├── common/           # Common components
│   │   ├── layout/           # Layout components
│   │   ├── product/          # Product components
│   │   └── ui/               # UI components
│   ├── lib/                  # Utility functions
│   │   ├── shopify.ts        # Shopify API integration
│   │   └── store.ts          # Zustand store
│   └── styles/               # Global styles
├── public/                   # Static assets
├── .env.example              # Example environment variables
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

- Primary: `#2c2c27` (Dark charcoal)
- Secondary: `#8a8778` (Taupe)
- Background: `#f8f8f5` (Off-white)
- Accent: `#5c5c52` (Olive)

### Typography

The site uses two main fonts:
- Serif: Playfair Display for headings
- Sans-serif: Inter for body text

## Deployment

The site can be deployed to Vercel with a single click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fankkorshopify)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Shopify](https://shopify.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Lucide Icons](https://lucide.dev/)
