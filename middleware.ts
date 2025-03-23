// Portfolio middleware for handling any route-based functionality
// Currently unused but kept for future expansion

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