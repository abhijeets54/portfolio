// This middleware is no longer needed as we're using Shopify customer accounts
// This file is kept for reference but is not used in the application

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Just pass through - this is a placeholder middleware that does nothing
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [], // Empty array means this middleware won't be triggered
}; 