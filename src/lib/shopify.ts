// Shopify store configuration
export const shopifyConfig = {
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'your-store.myshopify.com',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'your-storefront-access-token',
  storefrontApiVersion: '2024-04' // Updated to the latest version
};

// GraphQL query to fetch all products
export const QUERY_ALL_PRODUCTS = `
  query GetAllProducts($first: Int = 20) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          productType
          vendor
          availableForSale
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
          images(first: 5) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                availableForSale
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
                quantityAvailable
              }
            }
          }
          options {
            id
            name
            values
          }
          tags
          collections(first: 5) {
            edges {
              node {
                id
                title
                handle
              }
            }
          }
          metafields(
            identifiers: [
              {namespace: "custom", key: "material"},
              {namespace: "custom", key: "care_instructions"},
              {namespace: "custom", key: "fit"},
              {namespace: "product", key: "material"},
              {namespace: "product", key: "care_instructions"}
            ]
          ) {
            key
            namespace
            value
          }
        }
      }
    }
  }
`;

// GraphQL query to fetch a product by handle
export const QUERY_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      productType
      vendor
      availableForSale
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
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 50) {
        edges {
          node {
            id
            title
            availableForSale
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
            quantityAvailable
          }
        }
      }
      options {
        id
        name
        values
      }
      tags
      collections(first: 5) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
      metafields(
        identifiers: [
          {namespace: "custom", key: "material"},
          {namespace: "custom", key: "care_instructions"},
          {namespace: "custom", key: "fit"},
          {namespace: "custom", key: "features"},
          {namespace: "custom", key: "size_chart"},
          {namespace: "custom", key: "related_products"},
          {namespace: "product", key: "material"},
          {namespace: "product", key: "care_instructions"},
          {namespace: "product", key: "features"}
        ]
      ) {
        key
        namespace
        value
      }
    }
  }
`;

// GraphQL query to fetch products by collection handle
export const QUERY_COLLECTION_PRODUCTS = `
  query GetCollectionProducts($handle: String!, $first: Int = 20) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
        width
        height
      }
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
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
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 20) {
              edges {
                node {
                  id
                  title
                  availableForSale
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
            }
            tags
            metafields(
              identifiers: [
                {namespace: "custom", key: "material"},
                {namespace: "custom", key: "care_instructions"},
                {namespace: "custom", key: "fit"},
                {namespace: "custom", key: "features"}
              ]
            ) {
              key
              namespace
              value
            }
          }
        }
      }
    }
  }
`;

// GraphQL query to fetch all collections
export const QUERY_ALL_COLLECTIONS = `
  query GetAllCollections($first: Int = 20) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
            width
            height
          }
          products(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

// GraphQL mutation to create a cart
export const MUTATION_CREATE_CART = `
  mutation CreateCart($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// GraphQL mutation to add items to cart
export const MUTATION_ADD_TO_CART = `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// GraphQL mutation to update cart items
export const MUTATION_UPDATE_CART = `
  mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// GraphQL mutation to remove items from cart
export const MUTATION_REMOVE_FROM_CART = `
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// GraphQL query to fetch a cart by ID
export const QUERY_CART = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;

// GraphQL mutation to create a customer
export const MUTATION_CREATE_CUSTOMER = `
  mutation CreateCustomer($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

// GraphQL mutation to create a customer access token (login)
export const MUTATION_CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

// GraphQL query to fetch customer information
export const QUERY_CUSTOMER = `
  query GetCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      defaultAddress {
        id
        address1
        address2
        city
        province
        country
        zip
        phone
      }
      addresses(first: 10) {
        edges {
          node {
            id
            address1
            address2
            city
            province
            country
            zip
            phone
          }
        }
      }
      orders(first: 10) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// GraphQL query to search products with filtering
export const QUERY_SEARCH_PRODUCTS = `
  query SearchProducts(
    $query: String!,
    $first: Int = 20,
    $sortKey: ProductSortKeys = RELEVANCE,
    $reverse: Boolean = false,
    $filters: [ProductFilter!]
  ) {
    products(
      first: $first,
      query: $query,
      sortKey: $sortKey,
      reverse: $reverse,
      filters: $filters
    ) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          vendor
          tags
          availableForSale
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
          images(first: 1) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
          collections(first: 5) {
            edges {
              node {
                id
                title
                handle
              }
            }
          }
          metafields(
            identifiers: [
              {namespace: "custom", key: "material"},
              {namespace: "custom", key: "care_instructions"},
              {namespace: "custom", key: "fit"}
            ]
          ) {
            key
            namespace
            value
          }
        }
      }
    }
  }
`;

// Helper function for Shopify Storefront API fetch with retry logic
export async function shopifyFetch({ 
  query, 
  variables 
}: { 
  query: string; 
  variables?: any 
}, 
  retries = 3, 
  delay = 1000
) {
  let lastError;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const endpoint = `https://${shopifyConfig.storeDomain}/api/${shopifyConfig.storefrontApiVersion}/graphql.json`;
      
      // Only log full details on first attempt to avoid cluttering the console
      if (attempt === 1) {
        console.log('Shopify API Request:', {
          endpoint,
          variables,
          query: query.substring(0, 100) + '...' // Log just the beginning of the query
        });
      } else {
        console.log(`Retry attempt ${attempt}/${retries} for Shopify API request`);
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': shopifyConfig.storefrontAccessToken,
        },
        body: JSON.stringify({ query, variables }),
      });

      // Handle HTTP errors
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error text available');
        console.error('Shopify API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText.substring(0, 200) // Limit error text length
        });
        
        // Determine if we should retry based on status code
        // 429 = Too Many Requests, 500+ = Server errors
        if (response.status === 429 || response.status >= 500) {
          lastError = new Error(`Shopify API error: ${response.status} ${response.statusText}`);
          
          // For rate limiting (429), use exponential backoff
          if (response.status === 429) {
            const retryAfter = parseInt(response.headers.get('Retry-After') || '1', 10);
            const waitTime = retryAfter * 1000 || delay * Math.pow(2, attempt - 1);
            console.log(`Rate limited. Waiting ${waitTime}ms before retry.`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          } else {
            // For server errors, use regular delay
            await new Promise(resolve => setTimeout(resolve, delay));
          }
          
          // Continue to next retry attempt
          continue;
        }
        
        // For other error codes, don't retry
        throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
      }

      // Parse JSON response
      let json;
      try {
        json = await response.json();
      } catch (parseError: any) {
        console.error('Error parsing Shopify API response:', parseError);
        throw new Error(`Failed to parse Shopify API response: ${parseError.message}`);
      }
      
      // Handle GraphQL errors
      if (json.errors) {
        console.error('Shopify API GraphQL Errors:', json.errors);
        
        // Check for specific error types that might be retryable
        const hasRetryableError = json.errors.some((error: any) => {
          const message = error.message?.toLowerCase() || '';
          return message.includes('timeout') || 
                 message.includes('rate limit') || 
                 message.includes('too many requests') ||
                 message.includes('internal server error');
        });
        
        if (hasRetryableError && attempt < retries) {
          lastError = new Error(`Shopify API GraphQL error: ${JSON.stringify(json.errors)}`);
          await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
          continue;
        }
        
        throw new Error(`Shopify API GraphQL error: ${JSON.stringify(json.errors)}`);
      }
      
      // Validate response data
      if (!json.data) {
        console.warn('Shopify API returned empty data object');
      } else {
        console.log('Shopify API Response:', {
          dataKeys: Object.keys(json.data || {}),
          hasData: !!json.data
        });
      }
      
      // Success - return data
      return json.data;
    } catch (error) {
      lastError = error;
      console.error(`Error on attempt ${attempt}/${retries} fetching from Shopify:`, error);
      
      // If this is not the last attempt, wait and then retry
      if (attempt < retries) {
        const waitTime = delay * Math.pow(2, attempt - 1);
        console.log(`Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
  
  // If we've exhausted all retries, throw the last error
  console.error(`Failed after ${retries} attempts to fetch from Shopify`);
  throw lastError || new Error('Failed to fetch from Shopify API after multiple attempts');
}

// Function to fetch all products
export async function getAllProducts(first = 20) {
  try {
    console.log(`Fetching ${first} products from Shopify...`);
    
    // Check for cached data
    const cachedData = typeof window !== 'undefined' ? localStorage.getItem('ankkor_products_cache') : null;
    const cachedTimestamp = typeof window !== 'undefined' ? localStorage.getItem('ankkor_products_cache_timestamp') : null;
    
    // Use cache if it's less than 5 minutes old
    if (cachedData && cachedTimestamp && (Date.now() - parseInt(cachedTimestamp)) < 5 * 60 * 1000) {
      console.log('Using cached product data');
      return JSON.parse(cachedData);
    }
    
    // Fetch data from Shopify
    const data = await shopifyFetch({
      query: QUERY_ALL_PRODUCTS,
      variables: { first },
    });
    
    // Validate response structure
    if (!data) {
      console.error('No data returned from Shopify API');
      return useCachedDataOrEmpty();
    }
    
    if (!data.products) {
      console.error('No products field in Shopify API response:', data);
      return useCachedDataOrEmpty();
    }
    
    if (!data.products.edges || !Array.isArray(data.products.edges)) {
      console.error('Invalid products.edges structure in Shopify API response:', data.products);
      return useCachedDataOrEmpty();
    }
    
    // Extract products from edges
    const products = data.products.edges.map((edge: any) => {
      if (!edge || !edge.node) {
        console.warn('Invalid edge in products response:', edge);
        return null;
      }
      return edge.node;
    }).filter(Boolean); // Remove null entries
    
    console.log(`Successfully fetched ${products.length} products`);
    
    // Cache the data
    if (typeof window !== 'undefined' && products.length > 0) {
      try {
        localStorage.setItem('ankkor_products_cache', JSON.stringify(products));
        localStorage.setItem('ankkor_products_cache_timestamp', Date.now().toString());
        console.log('Product data cached successfully');
      } catch (cacheError) {
        console.warn('Failed to cache product data:', cacheError);
        // Continue without caching
      }
    }
    
    return products;
  } catch (error) {
    console.error('Error fetching all products:', error);
    return useCachedDataOrEmpty();
  }
  
  // Helper function to use cached data or return empty array
  function useCachedDataOrEmpty() {
    // If there's an error but we have cached data, use it as a fallback
    const cachedData = typeof window !== 'undefined' ? localStorage.getItem('ankkor_products_cache') : null;
    if (cachedData) {
      console.log('Using cached product data as fallback after error');
      try {
        return JSON.parse(cachedData);
      } catch (parseError) {
        console.error('Error parsing cached product data:', parseError);
      }
    }
    
    console.log('No cached data available, returning empty array');
    return [];
  }
}

// Function to fetch a product by handle
export async function getProductByHandle(handle: string) {
  if (!handle) {
    console.error('No handle provided to getProductByHandle');
    return null;
  }
  
  try {
    console.log(`Fetching product with handle: ${handle}`);
    
    // Check if we have cached data for this specific product
    const cachedProduct = typeof window !== 'undefined' ? localStorage.getItem(`ankkor_product_${handle}_cache`) : null;
    const cachedTimestamp = typeof window !== 'undefined' ? localStorage.getItem(`ankkor_product_${handle}_cache_timestamp`) : null;
    
    // Use cache if it's less than 5 minutes old
    if (cachedProduct && cachedTimestamp && (Date.now() - parseInt(cachedTimestamp)) < 5 * 60 * 1000) {
      console.log(`Using cached data for product: ${handle}`);
      try {
        return JSON.parse(cachedProduct);
      } catch (parseError) {
        console.warn(`Error parsing cached product data for ${handle}:`, parseError);
        // Continue to fetch from API
      }
    }
    
    const data = await shopifyFetch({
      query: QUERY_PRODUCT_BY_HANDLE,
      variables: { handle },
    });
    
    // Validate response
    if (!data) {
      console.error(`No data returned from Shopify API for product: ${handle}`);
      return useCachedProductOrNull();
    }
    
    if (!data.product) {
      console.warn(`Product not found with handle: ${handle}`);
      return useCachedProductOrNull();
    }
    
    console.log(`Successfully fetched product: ${data.product.title}`);
    
    // Cache the product data
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`ankkor_product_${handle}_cache`, JSON.stringify(data.product));
        localStorage.setItem(`ankkor_product_${handle}_cache_timestamp`, Date.now().toString());
        console.log(`Product ${handle} cached successfully`);
      } catch (cacheError) {
        console.warn(`Failed to cache product ${handle}:`, cacheError);
        // Continue without caching
      }
    }
    
    return data.product;
  } catch (error) {
    console.error(`Error fetching product with handle ${handle}:`, error);
    return useCachedProductOrNull();
  }
  
  // Helper function to use cached product or return null
  function useCachedProductOrNull() {
    // If there's an error but we have cached data, use it as a fallback
    const cachedProduct = typeof window !== 'undefined' ? localStorage.getItem(`ankkor_product_${handle}_cache`) : null;
    if (cachedProduct) {
      console.log(`Using cached data as fallback for product: ${handle}`);
      try {
        return JSON.parse(cachedProduct);
      } catch (parseError) {
        console.error(`Error parsing cached product data for ${handle}:`, parseError);
      }
    }
    
    console.log(`No cached data available for product: ${handle}`);
    return null;
  }
}

// Function to fetch products by collection handle
export async function getCollectionProducts(handle: string, first = 20) {
  try {
    console.log(`Fetching collection with handle: ${handle}`);
    
    const data = await shopifyFetch({
      query: QUERY_COLLECTION_PRODUCTS,
      variables: { handle, first },
    });
    
    if (!data || !data.collection) {
      console.warn(`Collection not found with handle: ${handle}`);
      return null;
    }
    
    console.log(`Successfully fetched collection: ${data.collection.title} with ${data.collection.products.edges.length} products`);
    return data.collection;
  } catch (error) {
    console.error(`Error fetching collection with handle ${handle}:`, error);
    throw error;
  }
}

// Function to fetch all collections
export async function getAllCollections(first = 20) {
  try {
    console.log(`Fetching all collections...`);
    
    const data = await shopifyFetch({
      query: QUERY_ALL_COLLECTIONS,
      variables: { first },
    });
    
    if (!data || !data.collections || !data.collections.edges) {
      console.warn('No collections found or invalid response structure');
      return [];
    }
    
    const collections = data.collections.edges.map((edge: any) => edge.node);
    console.log(`Successfully fetched ${collections.length} collections`);
    
    return collections;
  } catch (error) {
    console.error('Error fetching all collections:', error);
    return [];
  }
}

// Function to create a cart
export async function createCart(lines: any[] = []) {
  const data = await shopifyFetch({
    query: MUTATION_CREATE_CART,
    variables: {
      input: {
        lines: lines.map(line => ({
          merchandiseId: line.merchandiseId,
          quantity: line.quantity,
        })),
      },
    },
  });
  return data.cartCreate.cart;
}

// Function to add items to cart
export async function addToCart(cartId: string, lines: any[]) {
  const data = await shopifyFetch({
    query: MUTATION_ADD_TO_CART,
    variables: {
      cartId,
      lines: lines.map(line => ({
        merchandiseId: line.merchandiseId,
        quantity: line.quantity,
      })),
    },
  });
  return data.cartLinesAdd.cart;
}

// Function to update cart items
export async function updateCart(cartId: string, lines: any[]) {
  const data = await shopifyFetch({
    query: MUTATION_UPDATE_CART,
    variables: {
      cartId,
      lines: lines.map(line => ({
        id: line.id,
        quantity: line.quantity,
      })),
    },
  });
  return data.cartLinesUpdate.cart;
}

// Function to remove items from cart
export async function removeFromCart(cartId: string, lineIds: string[]) {
  const data = await shopifyFetch({
    query: MUTATION_REMOVE_FROM_CART,
    variables: {
      cartId,
      lineIds,
    },
  });
  return data.cartLinesRemove.cart;
}

// Function to fetch a cart by ID
export async function getCart(cartId: string) {
  const data = await shopifyFetch({
    query: QUERY_CART,
    variables: { cartId },
  });
  return data.cart;
}

// Function to create a customer
export async function createCustomer(input: any) {
  const data = await shopifyFetch({
    query: MUTATION_CREATE_CUSTOMER,
    variables: { input },
  });
  return data.customerCreate;
}

// Function to create a customer access token (login)
export async function customerLogin(email: string, password: string) {
  const data = await shopifyFetch({
    query: MUTATION_CUSTOMER_ACCESS_TOKEN_CREATE,
    variables: {
      input: {
        email,
        password,
      },
    },
  });
  return data.customerAccessTokenCreate;
}

// Function to fetch customer information
export async function getCustomer(customerAccessToken: string) {
  const data = await shopifyFetch({
    query: QUERY_CUSTOMER,
    variables: { customerAccessToken },
  });
  return data.customer;
}

// Function to search products with advanced filtering
export async function searchProducts(
  query: string,
  options: {
    first?: number;
    sortKey?: 'TITLE' | 'PRICE' | 'BEST_SELLING' | 'CREATED' | 'RELEVANCE';
    reverse?: boolean;
    filters?: Array<{
      productType?: string[];
      price?: { min?: number; max?: number };
      tag?: string[];
      vendor?: string[];
      available?: boolean;
    }>;
  } = {}
) {
  try {
    console.log(`Searching products with query: "${query}" and options:`, options);
    
    const { first = 20, sortKey = 'RELEVANCE', reverse = false, filters = [] } = options;
    
    // Convert our filter format to Shopify's filter format
    const shopifyFilters: any[] = [];
    
    filters.forEach(filter => {
      if (filter.productType && filter.productType.length > 0) {
        shopifyFilters.push({
          productType: filter.productType
        });
      }
      
      if (filter.price && (filter.price.min !== undefined || filter.price.max !== undefined)) {
        shopifyFilters.push({
          price: {
            min: filter.price.min?.toString(),
            max: filter.price.max?.toString()
          }
        });
      }
      
      if (filter.tag && filter.tag.length > 0) {
        shopifyFilters.push({
          tag: filter.tag
        });
      }
      
      if (filter.vendor && filter.vendor.length > 0) {
        shopifyFilters.push({
          vendor: filter.vendor
        });
      }
      
      if (filter.available !== undefined) {
        shopifyFilters.push({
          available: filter.available
        });
      }
    });
    
    const data = await shopifyFetch({
      query: QUERY_SEARCH_PRODUCTS,
      variables: { 
        query, 
        first, 
        sortKey, 
        reverse,
        filters: shopifyFilters.length > 0 ? shopifyFilters : undefined
      },
    });
    
    if (!data || !data.products || !data.products.edges) {
      console.warn('No search results found or invalid response structure');
      return [];
    }
    
    const products = data.products.edges.map((edge: any) => edge.node);
    console.log(`Search returned ${products.length} results`);
    
    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

// Helper function to normalize Shopify product data
export function normalizeProduct(product: any) {
  if (!product) return null;
  
  try {
    // Extract images using our utility function
    const images = normalizeProductImages(product.images, product.title);
    
    // Extract variants
    const variants = product.variants?.edges?.map((edge: any) => {
      const variant = edge.node;
      return {
        id: variant.id,
        title: variant.title,
        availableForSale: variant.availableForSale,
        price: variant.price?.amount || '0',
        compareAtPrice: variant.compareAtPrice?.amount || null,
        currencyCode: variant.price?.currencyCode || 'USD',
        selectedOptions: variant.selectedOptions || [],
        quantityAvailable: variant.quantityAvailable || 0
      };
    }) || [];
    
    // Extract collections
    const collections = product.collections?.edges?.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle
    })) || [];
    
    // Extract metafields with robust error handling
    const metafields: Record<string, string> = {};
    try {
      if (product.metafields) {
        // Handle both connection-style and direct array metafields
        const metafieldItems = product.metafields.edges 
          ? product.metafields.edges.map((edge: any) => edge.node)
          : product.metafields;
        
        // Safely process metafields, filtering out null values
        if (Array.isArray(metafieldItems)) {
          metafieldItems
            .filter((metafield: any) => metafield !== null && metafield !== undefined)
            .forEach((metafield: any) => {
              try {
                if (metafield && metafield.namespace && metafield.key) {
                  const key = `${metafield.namespace}_${metafield.key}`;
                  metafields[key] = metafield.value || '';
                } else if (metafield && metafield.key) {
                  // Handle case where namespace is missing
                  metafields[metafield.key] = metafield.value || '';
                }
              } catch (metafieldError) {
                console.warn(`Error processing metafield for product ${product.handle}:`, metafieldError);
                // Continue processing other metafields
              }
            });
        } else if (metafieldItems && typeof metafieldItems === 'object') {
          // Handle case where metafields is a direct object
          Object.entries(metafieldItems).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              metafields[key] = String(value);
            }
          });
        }
      }
    } catch (metafieldError) {
      console.warn(`Error processing metafields for product ${product.handle}:`, metafieldError);
    }
    
    // Add custom material metafield for compatibility with existing code
    if (!metafields['custom_material'] && !metafields['product_material']) {
      // Set a default material based on product type if available
      if (product.productType && product.productType.toLowerCase().includes('shirt')) {
        metafields['custom_material'] = 'Cotton';
      } else if (product.productType && product.productType.toLowerCase().includes('pant')) {
        metafields['custom_material'] = 'Cotton Twill';
      } else {
        metafields['custom_material'] = 'Premium Fabric';
      }
    }
    
    // Normalize the product with safe fallbacks for all properties
    return {
      id: product.id || `fallback-${Date.now()}`,
      title: product.title || 'Untitled Product',
      handle: product.handle || 'untitled-product',
      description: product.description || '',
      descriptionHtml: product.descriptionHtml || '',
      productType: product.productType || '',
      vendor: product.vendor || 'Ankkor',
      tags: Array.isArray(product.tags) ? product.tags : [],
      availableForSale: Boolean(product.availableForSale),
      price: product.priceRange?.minVariantPrice?.amount || variants[0]?.price || '0',
      compareAtPrice: variants[0]?.compareAtPrice || null,
      currencyCode: product.priceRange?.minVariantPrice?.currencyCode || variants[0]?.currencyCode || 'USD',
      images: images.length > 0 ? images : [{ 
        url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80',
        altText: product.title || 'Product Image',
        width: 800,
        height: 1000
      }],
      variants: variants.length > 0 ? variants : [{
        id: `default-variant-${Date.now()}`,
        title: 'Default',
        availableForSale: true,
        price: product.priceRange?.minVariantPrice?.amount || '0',
        compareAtPrice: null,
        currencyCode: product.priceRange?.minVariantPrice?.currencyCode || 'USD',
        selectedOptions: [],
        quantityAvailable: 10
      }],
      options: Array.isArray(product.options) ? product.options : [],
      collections,
      metafields
    };
  } catch (error) {
    console.error('Error normalizing product:', error);
    console.error('Problem product:', product);
    
    // Return a minimal valid product object even in case of error
    // This ensures the UI doesn't break completely
    return {
      id: product?.id || `error-${Date.now()}`,
      title: product?.title || 'Error Loading Product',
      handle: product?.handle || 'error-product',
      description: '',
      descriptionHtml: '',
      productType: '',
      vendor: 'Ankkor',
      tags: [],
      availableForSale: false,
      price: '0',
      compareAtPrice: null,
      currencyCode: 'USD',
      images: [{
        url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80',
        altText: 'Product Image Unavailable',
        width: 800,
        height: 1000
      }],
      variants: [{
        id: `error-variant-${Date.now()}`,
        title: 'Default',
        availableForSale: false,
        price: '0',
        compareAtPrice: null,
        currencyCode: 'USD',
        selectedOptions: [],
        quantityAvailable: 0
      }],
      options: [],
      collections: [],
      metafields: { custom_material: 'Unknown Material' }
    };
  }
}

// Helper function to normalize Shopify collection data
export function normalizeCollection(collection: any) {
  return {
    id: collection.id,
    title: collection.title,
    handle: collection.handle,
    description: collection.description,
    image: collection.image ? {
      url: collection.image.url,
      altText: collection.image.altText,
      width: collection.image.width,
      height: collection.image.height,
    } : null,
    products: collection.products?.edges.map((edge: any) => normalizeProduct(edge.node)),
  };
}

// Helper function to normalize Shopify cart data
export function normalizeCart(cart: any) {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    lines: cart.lines.edges.map((edge: any) => ({
      id: edge.node.id,
      quantity: edge.node.quantity,
      merchandise: {
        id: edge.node.merchandise.id,
        title: edge.node.merchandise.title,
        price: edge.node.merchandise.priceV2.amount,
        currencyCode: edge.node.merchandise.priceV2.currencyCode,
        product: {
          id: edge.node.merchandise.product.id,
          title: edge.node.merchandise.product.title,
          handle: edge.node.merchandise.product.handle,
          image: edge.node.merchandise.product.images.edges[0]?.node,
        },
      },
    })),
    cost: {
      subtotalAmount: cart.cost.subtotalAmount,
      totalAmount: cart.cost.totalAmount,
      totalTaxAmount: cart.cost.totalTaxAmount,
    },
  };
}

/**
 * Utility function to safely normalize product images from various Shopify API response formats
 * @param productImages - The images data from a Shopify product
 * @param productTitle - The product title to use as fallback alt text
 * @returns An array of normalized image objects
 */
export function normalizeProductImages(productImages: any, productTitle: string = ''): Array<{url: string, altText?: string, width?: number, height?: number}> {
  if (!productImages) return [];
  
  let normalizedImages = [];
  
  try {
    // Case 1: Images are in edges/nodes format (from GraphQL)
    if (productImages.edges) {
      normalizedImages = productImages.edges.map((edge: any) => ({
        url: edge.node.url || '',
        altText: edge.node.altText || productTitle || '',
        width: edge.node.width,
        height: edge.node.height
      }));
    } 
    // Case 2: Images are already normalized as an array
    else if (Array.isArray(productImages)) {
      normalizedImages = productImages.map((img: any) => ({
        url: img.url || img.src || '',
        altText: img.altText || productTitle || '',
        width: img.width,
        height: img.height
      }));
    } 
    // Case 3: Single image object
    else if (productImages && typeof productImages === 'object') {
      normalizedImages = [{
        url: productImages.url || productImages.src || '',
        altText: productImages.altText || productTitle || '',
        width: productImages.width,
        height: productImages.height
      }];
    }
  } catch (error) {
    console.error(`Error normalizing product images:`, error);
  }
  
  // Ensure we have at least one fallback image if no valid images were found
  if (normalizedImages.length === 0) {
    normalizedImages = [{
      url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80",
      altText: productTitle || "Product image",
      width: 800,
      height: 1200
    }];
  }
  
  return normalizedImages;
}

/**
 * Helper function to safely get metafield values from a product
 * @param product - The product object
 * @param key - The metafield key to retrieve
 * @param namespace - Optional namespace for the metafield
 * @param defaultValue - Default value to return if metafield is not found
 * @returns The metafield value or the default value
 */
export const getMetafield = (product: any, key: string, namespace?: string, defaultValue: string = ''): string => {
  try {
    if (!product || !product.metafields) return defaultValue;
    
    // Case 1: Metafields is an array
    if (Array.isArray(product.metafields)) {
      const metafield = namespace 
        ? product.metafields.find((m: any) => m.namespace === namespace && m.key === key)
        : product.metafields.find((m: any) => m.key === key);
      
      return metafield?.value || defaultValue;
    }
    
    // Case 2: Metafields is an object with keys in format "namespace_key"
    if (typeof product.metafields === 'object') {
      const metafieldKey = namespace ? `${namespace}_${key}` : key;
      return product.metafields[metafieldKey] || defaultValue;
    }
    
    return defaultValue;
  } catch (error) {
    console.error(`Error getting metafield ${namespace ? namespace + '_' : ''}${key}:`, error);
    return defaultValue;
  }
};

/**
 * Helper function to get feature metafields from a product
 * @param product - The product object
 * @returns Array of feature metafields
 */
export const getFeatureMetafields = (product: any): Array<{value: string}> => {
  try {
    if (!product || !product.metafields) return [];
    
    // Case 1: Metafields is an array
    if (Array.isArray(product.metafields)) {
      return product.metafields.filter((m: any) => m && m.namespace === 'features');
    }
    
    // Case 2: Metafields is an object with keys in format "namespace_key"
    if (typeof product.metafields === 'object') {
      const features: Array<{value: string}> = [];
      
      // Extract features from object format
      Object.entries(product.metafields).forEach(([key, value]) => {
        if (key.startsWith('features_') && value) {
          features.push({ value: value as string });
        }
      });
      
      return features;
    }
    
    return [];
  } catch (error) {
    console.error('Error getting feature metafields:', error);
    return [];
  }
}; 