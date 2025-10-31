import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-ankkor-headless-ecommerce-journey',
    title: 'Building Ankkor: My Journey into Production-Grade Headless E-Commerce',
    excerpt: 'Six months of wrestling with payment gateways, inventory race conditions, JWT authentication, and WooCommerce quirks. This is the story of how I built Ankkor - a production-ready headless commerce platform that became my most challenging project yet.',
    image: '/ankkor.png',
    date: '2025-10-31',
    tags: ['Next.js', 'E-commerce', 'WooCommerce', 'GraphQL', 'Full Stack', 'React', 'TypeScript', 'Payment Gateway', 'Redis', 'PostgreSQL'],
    readTime: '25 min read',
    featured: true,
    projectUrl: 'https://ankkor.in/',
    content: `# Building Ankkor: My Journey into Production-Grade Headless E-Commerce

## Introduction: The Challenge That Changed Everything

When I started this project, I thought I was building "just another e-commerce site." Six months later, after wrestling with payment gateways, inventory race conditions, JWT authentication bridges, and WooCommerce's quirks, I emerged with something far more significant: **Ankkor** - a production-ready headless commerce platform that taught me more about full-stack development than any course ever could.

This has been, without question, the most challenging and rewarding project I've undertaken in my development journey. Let me take you through the blood, sweat, and countless debugging sessions that went into building this beast.

---

## The Vision: Why Headless Commerce?

Traditional WordPress/WooCommerce sites are great, but they come with limitations:
- Coupled frontend and backend (hard to customize UI)
- Performance bottlenecks with traditional PHP rendering
- Limited flexibility for modern UX patterns
- Difficult to integrate with modern frameworks

I wanted to build something different: **a blazing-fast Next.js frontend that communicates with WooCommerce via GraphQL**, giving me complete control over the user experience while leveraging WooCommerce's robust backend for inventory, orders, and payments.

The goal? Create a modern shopping experience with:
- Lightning-fast page loads
- Smooth animations and transitions
- Real-time stock updates
- Seamless authentication
- Secure payment processing
- Guest and authenticated checkout flows

Sounds simple, right? Spoiler alert: it wasn't.

---

## The Tech Stack: Choosing the Right Tools

### Frontend Architecture
- **Next.js 14 with App Router**: I chose the cutting-edge App Router for Server Components, streaming, and incredible performance optimizations
- **TypeScript**: Type safety was non-negotiable for a project this complex
- **Zustand**: Lightweight state management (no Redux bloat!)
- **TailwindCSS + shadcn/ui**: Modern, customizable component library
- **Framer Motion**: Smooth animations for delightful UX

### Backend & Data Layer
- **WordPress + WooCommerce**: Mature e-commerce platform with extensive features
- **WPGraphQL**: The bridge between WordPress and modern frontend
- **PostgreSQL (via Prisma)**: For cart persistence and advanced queries
- **Upstash Redis**: Lightning-fast inventory reservations
- **Razorpay**: Payment gateway integration

### Infrastructure
- **Vercel**: Deployment platform optimized for Next.js
- **Upstash QStash**: Scheduled tasks and webhooks
- **Resend**: Transactional email delivery

---

## The Journey Begins: Initial Setup

### Phase 1: The GraphQL Foundation (Weeks 1-2)

My first task was getting Next.js to talk to WooCommerce. This involved:

1. **Setting up WPGraphQL** on WordPress
2. **Installing WooGraphQL** extension
3. **Building the GraphQL client** with proper error handling

The initial queries were straightforward:
\`\`\`graphql
query GetProducts {
  products {
    nodes {
      name
      price
      image
    }
  }
}
\`\`\`

But I quickly realized WooCommerce's data structure is COMPLEX. Products can be simple, variable (with variations like size/color), grouped, or external. Each type requires different handling.

I spent weeks building a comprehensive \`woocommerce.ts\` library (over 3,336 lines!) that handles:
- Product queries with pagination
- Cart operations
- Order creation
- Customer management
- Variation handling
- Price normalization

**First Major Challenge**: WooCommerce returns prices with currency symbols (₹1,299), but I needed clean numbers for calculations. I built regex-based parsers to handle multiple currency formats and Indian number notation (1,00,000).

---

## The Authentication Nightmare (Weeks 3-5)

### JWT Tokens: The Double-Edged Sword

WooCommerce has a JWT authentication plugin, which seemed perfect. Generate a token, send it with requests, done!

**Reality check**: Nothing is that simple.

#### Problems I Encountered:

1. **Token Storage**: Where do I store JWT tokens securely?
   - localStorage? Vulnerable to XSS
   - Cookies? Need httpOnly for security
   - Solution: httpOnly cookies with SameSite=Strict

2. **Token Expiration**: Tokens expire, but users shouldn't be logged out mid-session
   - Built automatic refresh mechanism
   - Token validation before every API call
   - Graceful degradation when tokens expire

3. **The WordPress Session Bridge**: The worst part
   - WooCommerce checkout requires WordPress session cookies
   - My frontend sends JWT tokens
   - They don't play nicely together!

**The Solution**: I built a JWT-to-Cookie bridge:
\`\`\`typescript
// Convert JWT to WordPress session on checkout
const response = await fetch('/wp-admin/admin-ajax.php', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${jwtToken}\`,
    'Cookie': wordpressSessionCookie
  }
});
\`\`\`

This took DAYS to figure out. I read through WordPress core code, WooCommerce session handlers, and countless StackOverflow threads.

#### Guest Checkout: Another Beast

WooCommerce, by default, redirects guests to login during checkout. For a modern e-commerce site, this is unacceptable.

I had to:
- Modify WooCommerce settings via REST API
- Add query parameters to checkout URLs (\`?guest_checkout=yes&skip_login=1\`)
- Create custom API endpoints to handle guest orders
- Build a custom plugin to disable login redirects

The file \`ankkor-woo-guest-checkout/\` contains my custom WordPress plugin that forces guest checkout. It hooks into WooCommerce's redirect logic and bypasses it entirely.

---

## The Cart System: A Three-Layer Architecture (Weeks 6-9)

Building a shopping cart sounds simple. Add item, remove item, update quantity. Easy!

**Narrator**: It was not easy.

### Layer 1: Local Client Cart (Zustand + localStorage)

Users expect instant feedback. When they click "Add to Cart," the UI should update immediately.

I built a Zustand store (\`localCartStore.ts\`) with:
- Optimistic updates (immediate UI response)
- localStorage persistence (survives page refresh)
- Stock validation (prevent adding out-of-stock items)
- Variation handling (track size, color, etc.)

**Challenge**: Identifying cart items uniquely
- Same product, different size = different cart item
- Need to compare attributes, not just product ID
- Built attribute comparison logic to deduplicate items

### Layer 2: Stock Reservations (Redis)

Here's where it gets interesting. Imagine this scenario:

1. User A adds 5 units of Product X to cart (10 available)
2. User B adds 5 units of Product X to cart (10 available)
3. Both proceed to checkout
4. Only 10 units exist!

Who gets the product? This is a **race condition**, and it's a real problem for e-commerce sites.

**My Solution**: Redis-based stock reservations

When a user adds items to cart:
1. Check available stock (total - reserved)
2. Create a Redis reservation with 15-minute expiration
3. Decrement available stock
4. Store reservation with user session ID

When the reservation expires (user didn't checkout):
1. Automatically release the stock back
2. Run cleanup cron job every 60 seconds

This prevents overselling while not permanently locking stock for abandoned carts.

**Implementation Highlights**:
\`\`\`typescript
// Stock reservation with expiration
await redis.zadd(
  'stockReservations',
  Date.now() + (15 * 60 * 1000), // 15 minutes
  reservationId
);

// Atomic stock decrement
const remainingStock = await redis.decrby(
  \`stock:\${productId}\`,
  quantity
);
\`\`\`

I spent weeks perfecting this system, handling edge cases like:
- User adds item twice before first reservation completes
- Multiple browser tabs from same user
- Expired reservations during checkout
- Stock updates from WooCommerce admin

### Layer 3: Server-Side Cart (PostgreSQL + Prisma)

For the actual checkout, I needed persistent storage. Zustand and Redis are great for temporary data, but I need:
- Order history
- Abandoned cart recovery
- Analytics on cart behavior

I designed a Prisma schema with:
- \`Cart\` table (user, status, created date)
- \`CartItem\` table (product, quantity, price, attributes)
- \`StockReservation\` table (product, quantity, expiration, status)
- \`StockAuditLog\` table (complete history of all stock changes)

This gives me full traceability: I can see exactly when stock was reserved, confirmed, or released.

---

## The Payment Integration: Razorpay (Weeks 10-12)

Integrating a payment gateway is where many projects fail. Security is critical, and one mistake can cost money or expose customer data.

### Setting Up Razorpay

Razorpay's API is well-documented, but integrating it into a headless architecture required careful planning:

1. **Order Creation**: Server-side API endpoint creates Razorpay order
2. **Client-Side Payment**: Load Razorpay checkout modal
3. **Payment Verification**: Validate payment signature (CRITICAL)
4. **Order Confirmation**: Create WooCommerce order
5. **Stock Confirmation**: Convert reservation to confirmed

### The Security Challenge: Signature Verification

Razorpay sends a payment success callback with:
- \`razorpay_order_id\`
- \`razorpay_payment_id\`
- \`razorpay_signature\`

The signature MUST be verified to prevent fraud:
\`\`\`typescript
const expectedSignature = crypto
  .createHmac('sha256', razorpayKeySecret)
  .update(\`\${orderId}|\${paymentId}\`)
  .digest('hex');

if (expectedSignature !== razorpaySignature) {
  throw new Error('Payment verification failed');
}
\`\`\`

But I didn't stop there. I implemented **double verification**:
1. Client-side signature check (basic validation)
2. Server-side signature check (trusted verification)
3. Server-side Razorpay API call to confirm payment status

This triple-layer verification ensures no fraudulent payments slip through.

### COD (Cash on Delivery) Support

Indian e-commerce heavily relies on COD. But COD has risks:
- Higher return rates
- Fake orders

I implemented:
- COD prepayment (₹100 advance payment to confirm order)
- Phone number verification
- Order value limits for COD

---

## The Checkout Flow: Bringing It All Together (Weeks 13-15)

The checkout process is where everything converges:

### Step-by-Step Implementation

1. **Cart Review**
   - Display all items with variations
   - Show total price with tax
   - Allow quantity updates (with stock validation)

2. **Shipping Information**
   - Form with validation (React Hook Form)
   - Pincode-based city/state lookup
   - Address validation against WooCommerce format

3. **Shipping Method Selection**
   - Fetch available shipping methods from WooCommerce
   - Calculate costs based on cart weight and destination
   - Update total in real-time

4. **Payment Method**
   - Online Payment (Razorpay)
   - COD with prepayment

5. **Order Summary**
   - Itemized list
   - Shipping costs
   - Tax calculation
   - Total amount

6. **Place Order**
   - Create Razorpay order
   - Load payment modal
   - Verify payment
   - Create WooCommerce order
   - Confirm stock reservations
   - Send confirmation email (via Resend)
   - Redirect to success page

**Challenge**: Maintaining state across steps

I built a Zustand store (\`checkoutStore.ts\`) that persists:
- Shipping address
- Billing address
- Selected shipping method
- Selected payment method
- Order notes

This allows users to navigate back and forth without losing data.

### Guest vs. Authenticated Checkout

This was a MAJOR pain point. Two completely different flows:

**Authenticated Users**:
- Fetch saved addresses from WooCommerce
- Pre-fill forms
- JWT authentication
- Session-based checkout

**Guest Users**:
- Manual form entry
- No saved data
- Cookie-less checkout
- Special URL parameters to bypass login

I built a hybrid system that automatically detects user authentication state and routes to the appropriate flow.

---

## The Inventory Management System (Weeks 16-18)

E-commerce without proper inventory management is chaos. I needed:

### Real-Time Stock Updates

**Problem**: Stock changes in WooCommerce admin must reflect immediately on frontend.

**Solution**: Webhook integration

I set up WooCommerce webhooks that trigger on:
- Product stock update
- Order creation
- Order cancellation
- Order refund

When triggered, webhooks call my API endpoint:
\`\`\`typescript
// /api/webhooks/woocommerce
export async function POST(request: Request) {
  const payload = await request.json();

  // Update Redis stock cache
  await updateRedisStock(payload.product_id, payload.stock_quantity);

  // Update PostgreSQL inventory
  await prisma.productStock.update({
    where: { productId: payload.product_id },
    data: {
      totalStock: payload.stock_quantity,
      availableStock: calculateAvailable(payload)
    }
  });

  // Invalidate Next.js cache
  revalidatePath(\`/products/\${payload.slug}\`);
}
\`\`\`

This ensures:
- Frontend cache is updated
- Redis has latest stock numbers
- Database is synchronized

### Inventory Reconciliation

Despite webhooks, discrepancies can occur. I built a daily reconciliation job:

1. Fetch all products from WooCommerce
2. Compare with Redis and PostgreSQL
3. Log discrepancies
4. Auto-correct if difference is < 5%
5. Alert admin if difference is > 5%

This runs via Upstash QStash scheduled tasks.

---

## Performance Optimization (Weeks 19-20)

With all features working, I focused on performance:

### Next.js Optimization

- **Static Generation**: Category pages pre-rendered
- **ISR (Incremental Static Regeneration)**: Product pages revalidated every 60 seconds
- **Server Components**: Reduced client-side JavaScript by 40%
- **Streaming**: Page shells load instantly, content streams in
- **Image Optimization**: Next.js Image component with responsive sizes

### Database Optimization

- **Prisma Indexes**: Added indexes on frequently queried columns
- **Connection Pooling**: Prevent database connection exhaustion
- **Query Optimization**: Used Prisma's \`select\` to fetch only needed fields

### Caching Strategy

- **Redis**: Product stock, user sessions (TTL: 5 minutes)
- **Next.js Cache**: Product pages (revalidate: 60 seconds)
- **localStorage**: Cart data (permanent until checkout)

**Result**: Page load times under 1 second, Lighthouse score of 95+

---

## The Debugging Nightmares (Ongoing)

### Bug #1: Cart Items Disappearing

**Symptom**: Users add items to cart, refresh page, cart is empty.

**Root Cause**: Zustand persist middleware race condition. \`localStorage.getItem()\` was called before hydration completed.

**Solution**: Added \`onRehydrateStorage\` callback:
\`\`\`typescript
persist(
  (set, get) => ({ /* store */ }),
  {
    name: 'cart-storage',
    onRehydrateStorage: () => (state) => {
      state?.setHydrated(true);
    }
  }
)
\`\`\`

### Bug #2: Price Showing as NaN

**Symptom**: Cart total displays \`NaN\` for some products.

**Root Cause**: Prices from WooCommerce have inconsistent formats:
- \`₹1,299\` (with currency symbol and comma)
- \`1299.00\` (plain number)
- \`<del>1299</del>999\` (HTML tags for sale price)

**Solution**: Robust price parser:
\`\`\`typescript
function normalizePrice(price: string): number {
  return parseFloat(
    price
      .replace(/[₹$€£,<>/\\s]/g, '') // Remove currency and HTML
      .match(/[\\d.]+/)?.[0] || '0' // Extract numbers
  );
}
\`\`\`

### Bug #3: WooCommerce Redirecting to Login

**Symptom**: Guest users redirected to \`/wp-login.php\` during checkout.

**Root Cause**: WooCommerce setting \`woocommerce_enable_guest_checkout\` wasn't being respected.

**Solution**: Created custom WordPress plugin (\`ankkor-woo-guest-checkout/\`) that:
- Removes WooCommerce login redirect hooks
- Forces guest checkout regardless of settings
- Adds URL parameter validation

### Bug #4: JWT Tokens Expiring Mid-Checkout

**Symptom**: Users get "Unauthorized" error after spending 10 minutes on checkout page.

**Solution**: Token refresh mechanism:
\`\`\`typescript
async function refreshToken() {
  const currentToken = getToken();
  const decoded = jwt_decode(currentToken);

  if (decoded.exp - Date.now()/1000 < 300) { // 5 minutes left
    const newToken = await fetch('/api/auth/refresh');
    storeToken(newToken);
  }
}
\`\`\`

---

## The Testing Phase (Weeks 21-22)

### Manual Testing Scenarios

I created test cases for:
- **Happy Path**: User browses → adds to cart → checks out → pays → receives order
- **Edge Cases**:
  - Out of stock during checkout
  - Payment failure handling
  - Network errors
  - Expired stock reservations
  - Concurrent users buying same product
  - Token expiration during checkout
  - Guest checkout flow
  - Variation selection

### Load Testing

Used Apache Bench to simulate 100 concurrent users:
\`\`\`bash
ab -n 1000 -c 100 https://ankkor.vercel.app/
\`\`\`

**Results**:
- 99% of requests completed under 500ms
- No failed requests
- Stock reservation system handled concurrent requests correctly

---

## Deployment and Production Setup (Week 23)

### Environment Configuration

Production environment variables:
\`\`\`
WORDPRESS_URL=https://example.com
GRAPHQL_ENDPOINT=https://example.com/graphql
JWT_SECRET=***
RAZORPAY_KEY_ID=***
RAZORPAY_KEY_SECRET=***
DATABASE_URL=postgresql://***
REDIS_URL=***
QSTASH_TOKEN=***
RESEND_API_KEY=***
\`\`\`

### Deployment Pipeline

1. **Git Push** to main branch
2. **Vercel** automatically triggers build
3. **Prisma migrations** run during build
4. **Environment variables** injected
5. **Build succeeds** → Deploy to production
6. **Health checks** verify all services
7. **Rollback** if health checks fail

### Monitoring Setup

- **Vercel Analytics**: Page views, performance metrics
- **Prisma Studio**: Database inspection
- **Upstash Console**: Redis monitoring
- **Razorpay Dashboard**: Payment tracking
- **Custom logging**: Winston logger for errors

---

## Key Learnings and Takeaways

### Technical Skills Gained

1. **Next.js 14 App Router**: Deep understanding of Server Components, streaming, and caching
2. **GraphQL Mastery**: Complex queries, fragments, error handling
3. **State Management**: Zustand, context, server state vs. client state
4. **Payment Integration**: Security, verification, webhooks
5. **Database Design**: Prisma, PostgreSQL, indexing, relations
6. **Redis**: Caching, pub/sub, sorted sets for expiration
7. **Authentication**: JWT, session management, cookie security
8. **API Design**: RESTful patterns, error handling, rate limiting

### Architectural Insights

1. **Separation of Concerns**: Keep business logic in lib/, components in components/, API routes thin
2. **Single Source of Truth**: WooCommerce is the source for products/orders, but I cache aggressively
3. **Optimistic Updates**: Update UI immediately, sync in background
4. **Progressive Enhancement**: Site works without JavaScript (for SEO), enhanced with JS
5. **Error Boundaries**: Graceful degradation when things fail

### Soft Skills

1. **Patience**: Debugging complex issues takes time
2. **Documentation**: I documented every major challenge in \`/docs\`
3. **Iteration**: First implementation is never perfect
4. **Research**: Reading source code, API docs, and community forums
5. **Persistence**: Many times I wanted to give up, but pushed through

---

## What I Would Do Differently

Looking back, here's what I'd change:

1. **Start with a simpler cart system**: I over-engineered the three-layer cart early on. Should have started simple and added complexity as needed.

2. **Mock external services earlier**: I spent too long debugging issues that were actually WooCommerce configuration problems. Mocking would have isolated issues faster.

3. **Write tests from day one**: I added tests late in the project. Test-driven development would have caught bugs earlier.

4. **Document as I go**: I wrote documentation at the end. Should have documented decisions in real-time.

5. **Use feature flags**: For testing new functionality in production without affecting users.

6. **Better error tracking**: I added Sentry-like error tracking late. Would have helped catch issues earlier.

---

## The Future: What's Next?

This project is production-ready, but there's always room for improvement:

### Planned Features

1. **Wishlist with Email Reminders**: Notify users when wishlist items go on sale
2. **Advanced Search**: Elasticsearch integration for better product search
3. **Product Recommendations**: ML-based "You might also like"
4. **Loyalty Points**: Reward repeat customers
5. **Multi-language Support**: i18n for international customers
6. **Progressive Web App**: Offline functionality, push notifications
7. **Admin Dashboard**: Built-in Next.js admin panel (instead of WordPress admin)
8. **Real-time Chat**: Customer support via WebSockets

### Technical Improvements

1. **End-to-End Testing**: Playwright for automated browser testing
2. **Performance Monitoring**: Real User Monitoring (RUM)
3. **A/B Testing**: Experiment with different checkout flows
4. **GraphQL Subscriptions**: Real-time stock updates without polling
5. **Edge Functions**: Move some API routes to edge for lower latency

---

## Closing Thoughts: Why This Was the Hardest Project

Looking back at six months of work, here's why this was the toughest project:

### Complexity at Every Layer

- **Frontend**: Modern Next.js patterns, state management, animation
- **Backend**: GraphQL, WordPress, custom plugins
- **Infrastructure**: Database, Redis, cron jobs, webhooks
- **Payment**: Security, verification, compliance
- **DevOps**: Deployment, monitoring, logging

Most projects touch 2-3 of these. This project required deep expertise in ALL of them.

### Integrating Multiple Systems

Getting Next.js, WordPress, WooCommerce, Razorpay, Redis, PostgreSQL, and Vercel to work together seamlessly was like conducting an orchestra where every musician speaks a different language.

### Real-World Constraints

- **Security**: Payment data, user authentication
- **Performance**: Sub-second page loads
- **Reliability**: 99.9% uptime
- **Scalability**: Handle traffic spikes
- **User Experience**: Smooth, intuitive interface

These aren't optional in e-commerce. One security breach or slow checkout can cost sales.

### Learning Curve

I learned more in these six months than in the previous year. Every feature pushed me into unfamiliar territory:
- GraphQL schema design
- JWT security
- Payment gateway integration
- Race condition prevention
- Cache invalidation strategies
- Database transaction handling

---

## Final Words

This project transformed me from someone who could build websites into someone who can architect complex, production-grade systems.

I learned that:
- **The devil is in the details**: Cart functionality "works" until you test concurrent users, stock updates, and payment failures.
- **User experience is everything**: Technical brilliance means nothing if checkout is confusing.
- **Documentation saves lives**: Future me thanks past me for writing down solutions.
- **Patience pays off**: The bug that takes 5 hours to fix teaches more than the feature that takes 5 minutes.

If you're building an e-commerce platform, I hope this blog helps you avoid the pitfalls I encountered. If you're considering headless commerce, I can say with confidence: **it's worth the effort**.

The modern web deserves modern shopping experiences, and headless architecture is the future.

---

## Technical Resources

For those interested, here are the key technologies used:

- **Frontend**: Next.js 14, React 18, TypeScript, Zustand, TailwindCSS
- **Backend**: WordPress, WooCommerce, WPGraphQL
- **Database**: PostgreSQL (Prisma ORM)
- **Cache**: Upstash Redis
- **Payment**: Razorpay
- **Email**: Resend
- **Deployment**: Vercel
- **Monitoring**: Vercel Analytics, Prisma Studio

**Total lines of code**: ~15,000+ lines (excluding node_modules)
**Components**: 70+ React components
**API Routes**: 50+ endpoints
**Database Tables**: 10 tables with relations
**Development Time**: 6 months (part-time)

---

**Tags**: #NextJS #Ecommerce #HeadlessCMS #WooCommerce #GraphQL #FullStack #WebDevelopment #React #TypeScript #PaymentGateway #Redis #PostgreSQL #Prisma #Razorpay
`
  }
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts
    .filter(post => post.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostMetadata() {
  return blogPosts.map(({ content, ...metadata }) => metadata);
}
