import { NextRequest, NextResponse } from 'next/server';
import { fetchAllProductData, fetchCompleteProductByHandle, normalizeCompleteProduct } from '@/lib/shopifyDataFetcher';

// Disable caching for this route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Parse the URL to get query parameters
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get('handle');
    const raw = searchParams.get('raw') === 'true';
    
    // If a handle is provided, fetch a single product
    if (handle) {
      console.log(`API: Fetching single product with handle: ${handle}`);
      
      try {
        const product = await fetchCompleteProductByHandle(handle);
        
        if (!product) {
          return NextResponse.json(
            { error: `Product not found: ${handle}` },
            { status: 404 }
          );
        }
        
        // Return either raw data or normalized data
        return NextResponse.json(
          raw ? product : normalizeCompleteProduct(product)
        );
      } catch (error: any) {
        console.error(`API: Error fetching product ${handle}:`, error);
        return NextResponse.json(
          { error: `Failed to fetch product: ${error.message}` },
          { status: 500 }
        );
      }
    }
    
    // Otherwise, fetch all products
    console.log('API: Fetching all products');
    const products = await fetchAllProductData();
    
    // Return either raw data or normalized data
    const responseData = raw 
      ? products 
      : products.map(product => normalizeCompleteProduct(product));
    
    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error('API: Error in products route:', error);
    return NextResponse.json(
      { error: `Failed to fetch products: ${error.message}` },
      { status: 500 }
    );
  }
} 