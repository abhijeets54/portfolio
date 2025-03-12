import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Webhook handler for Shopify
export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();
    
    // Get the Shopify webhook topic from headers
    const topic = request.headers.get('x-shopify-topic') || '';
    
    // Verify the webhook is from Shopify using the secret
    const hmac = request.headers.get('x-shopify-hmac-sha256');
    const shopifyDomain = request.headers.get('x-shopify-shop-domain');
    
    // Validate the webhook secret (in production, implement proper HMAC validation)
    const secret = process.env.SHOPIFY_REVALIDATION_SECRET;
    const providedSecret = request.nextUrl.searchParams.get('secret');
    
    if (providedSecret !== secret) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }
    
    // Log the webhook topic and shop domain
    console.log(`Received webhook: ${topic} from ${shopifyDomain}`);
    
    // Handle different webhook topics
    switch (topic) {
      case 'products/create':
      case 'products/update':
      case 'products/delete':
        // Get the product handle from the webhook body
        const productHandle = body.handle;
        
        // Revalidate the product page and collection pages
        revalidatePath(`/product/${productHandle}`);
        revalidatePath('/collection');
        revalidatePath('/collection/shirts');
        revalidatePath('/collection/pants');
        revalidatePath('/collection/polos');
        revalidatePath('/');
        
        console.log(`Revalidated product: ${productHandle}`);
        break;
        
      case 'collections/create':
      case 'collections/update':
      case 'collections/delete':
        // Get the collection handle from the webhook body
        const collectionHandle = body.handle;
        
        // Revalidate the collection page and homepage
        revalidatePath(`/collection/${collectionHandle}`);
        revalidatePath('/collection');
        revalidatePath('/');
        
        console.log(`Revalidated collection: ${collectionHandle}`);
        break;
        
      default:
        // For other webhook topics, do nothing
        console.log(`No revalidation needed for topic: ${topic}`);
    }
    
    return NextResponse.json(
      { revalidated: true, now: Date.now() },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// Optional: Add a GET handler for testing the endpoint
export async function GET(request: NextRequest) {
  const secret = process.env.SHOPIFY_REVALIDATION_SECRET;
  const providedSecret = request.nextUrl.searchParams.get('secret');
  
  if (providedSecret !== secret) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    );
  }
  
  const path = request.nextUrl.searchParams.get('path') || '/';
  revalidatePath(path);
  
  return NextResponse.json(
    { revalidated: true, now: Date.now(), path },
    { status: 200 }
  );
} 