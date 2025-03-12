import { shopifyConfig } from './shopify';

// Updated GraphQL query to fetch complete product data with proper metafields format
export const QUERY_COMPLETE_PRODUCT_DATA = `
  query GetCompleteProductData($first: Int = 20, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        handle
        description
        descriptionHtml
        productType
        vendor
        tags
        availableForSale
        createdAt
        updatedAt
        publishedAt
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          nodes {
            id
            url
            altText
            width
            height
          }
        }
        variants(first: 100) {
          nodes {
            id
            title
            sku
            availableForSale
            quantityAvailable
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
        options {
          id
          name
          values
        }
        collections(first: 5) {
          nodes {
            id
            title
            handle
          }
        }
        metafields(
          identifiers: [
            {namespace: "custom", key: "material"},
            {namespace: "custom", key: "care_instructions"},
            {namespace: "custom", key: "fit"},
            {namespace: "custom", key: "features"},
            {namespace: "custom", key: "size_chart"},
            {namespace: "custom", key: "related_products"}
          ]
        ) {
          key
          namespace
          value
          type
        }
      }
    }
  }
`;

// Query to fetch a single product by handle with complete data
export const QUERY_COMPLETE_PRODUCT_BY_HANDLE = `
  query GetCompleteProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      productType
      vendor
      tags
      availableForSale
      createdAt
      updatedAt
      publishedAt
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        nodes {
          id
          url
          altText
          width
          height
        }
      }
      variants(first: 100) {
        nodes {
          id
          title
          sku
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
      options {
        id
        name
        values
      }
      collections(first: 5) {
        nodes {
          id
          title
          handle
        }
      }
      metafields(
        identifiers: [
          {namespace: "custom", key: "material"},
          {namespace: "custom", key: "care_instructions"},
          {namespace: "custom", key: "fit"},
          {namespace: "custom", key: "features"},
          {namespace: "custom", key: "size_chart"},
          {namespace: "custom", key: "related_products"}
        ]
      ) {
        key
        namespace
        value
        type
      }
    }
  }
`;

// Helper function for Shopify Storefront API fetch
async function shopifyFetch({ query, variables }: { query: string; variables?: any }) {
  try {
    const endpoint = `https://${shopifyConfig.storeDomain}/api/${shopifyConfig.storefrontApiVersion}/graphql.json`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': shopifyConfig.storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    
    if (json.errors) {
      throw new Error(`Shopify API error: ${JSON.stringify(json.errors)}`);
    }

    return json.data;
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    throw error;
  }
}

// Function to fetch all products with pagination
export async function fetchAllProductData() {
  let hasNextPage = true;
  let endCursor = null;
  let allProducts: any[] = [];
  
  console.log('Starting to fetch all products from Shopify...');
  
  try {
    while (hasNextPage) {
      const variables = {
        first: 50,
        after: endCursor,
      };
      
      const data = await shopifyFetch({
        query: QUERY_COMPLETE_PRODUCT_DATA,
        variables,
      });
      
      const products = data.products.nodes;
      allProducts = [...allProducts, ...products];
      
      hasNextPage = data.products.pageInfo.hasNextPage;
      endCursor = data.products.pageInfo.endCursor;
      
      console.log(`Fetched ${products.length} products. Total so far: ${allProducts.length}`);
      
      // Add a small delay to avoid rate limiting
      if (hasNextPage) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    console.log(`Completed fetching all products. Total: ${allProducts.length}`);
    return allProducts;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
}

// Function to fetch a single product by handle
export async function fetchCompleteProductByHandle(handle: string) {
  try {
    console.log(`Fetching complete data for product with handle: ${handle}`);
    const data = await shopifyFetch({
      query: QUERY_COMPLETE_PRODUCT_BY_HANDLE,
      variables: { handle },
    });
    
    if (!data.product) {
      throw new Error(`Product not found: ${handle}`);
    }
    
    return data.product;
  } catch (error) {
    console.error(`Error fetching product ${handle}:`, error);
    throw error;
  }
}

// Function to normalize product data
export function normalizeCompleteProduct(product: any) {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    productType: product.productType,
    vendor: product.vendor,
    tags: product.tags,
    availableForSale: product.availableForSale,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    publishedAt: product.publishedAt,
    price: {
      min: product.priceRange.minVariantPrice.amount,
      max: product.priceRange.maxVariantPrice.amount,
      currencyCode: product.priceRange.minVariantPrice.currencyCode,
    },
    images: product.images?.nodes?.map((image: any) => ({
      id: image.id,
      url: image.url,
      altText: image.altText,
      width: image.width,
      height: image.height,
    })) || [],
    variants: product.variants?.nodes?.map((variant: any) => ({
      id: variant.id,
      title: variant.title,
      sku: variant.sku,
      availableForSale: variant.availableForSale,
      quantityAvailable: variant.quantityAvailable,
      price: variant.price.amount,
      compareAtPrice: variant.compareAtPrice?.amount,
      currencyCode: variant.price.currencyCode,
      selectedOptions: variant.selectedOptions,
    })) || [],
    options: product.options || [],
    collections: product.collections?.nodes?.map((collection: any) => ({
      id: collection.id,
      title: collection.title,
      handle: collection.handle,
    })) || [],
    metafields: product.metafields?.reduce((acc: any, metafield: any) => {
      acc[`${metafield.namespace}_${metafield.key}`] = metafield.value;
      return acc;
    }, {}) || {},
  };
}

// Function to export all products to JSON
export async function exportAllProductsToJson() {
  try {
    const products = await fetchAllProductData();
    const normalizedProducts = products.map(product => normalizeCompleteProduct(product));
    return normalizedProducts;
  } catch (error) {
    console.error('Error exporting products to JSON:', error);
    throw error;
  }
} 