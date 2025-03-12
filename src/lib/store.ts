import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  createCart, 
  addToCart, 
  updateCart, 
  removeFromCart,
  getCart,
  normalizeCart
} from './shopify';

export type CartItem = {
  id: string;
  variantId: string;
  productId: string;
  title: string;
  handle: string;
  image: string;
  price: string;
  quantity: number;
  currencyCode: string;
};

export type WishlistItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  handle: string;
  material: string;
  variantId: string;
};

type CartState = {
  cartId: string | null;
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  subtotal: string;
  total: string;
  currencyCode: string;
  itemCount: number;
  checkoutUrl: string | null;
  
  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  initCart: () => Promise<void>;
  addItem: (item: Omit<CartItem, 'id'>) => Promise<void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      items: [],
      isOpen: false,
      isLoading: false,
      subtotal: '0.00',
      total: '0.00',
      currencyCode: 'USD',
      itemCount: 0,
      checkoutUrl: null,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      initCart: async () => {
        const state = get();
        if (!state.cartId) {
          set({ isLoading: true });
          try {
            const cart = await createCart();
            set({
              cartId: cart.id,
              checkoutUrl: cart.checkoutUrl,
              isLoading: false
            });
            console.log('Cart initialized with ID:', cart.id);
            return cart;
          } catch (error) {
            console.error('Failed to initialize cart:', error);
            set({ isLoading: false });
            throw error;
          }
        }
        return null;
      },

      addItem: async (item) => {
        const state = get();
        set({ isLoading: true });
        
        try {
          // Initialize cart if it doesn't exist
          let cartId = state.cartId;
          if (!cartId) {
            const cart = await state.initCart();
            if (cart) {
              cartId = cart.id;
            } else {
              throw new Error('Failed to initialize cart');
            }
          }
          
          console.log(`Adding item to cart: ${item.title} (${item.variantId}), quantity: ${item.quantity}`);
          
          const cart = await addToCart(cartId, [{
            merchandiseId: item.variantId,
            quantity: item.quantity
          }]);
          
          // Normalize and update cart state
          const normalizedCart = normalizeCart(cart);
          
          set({
            items: normalizedCart.lines.map(line => ({
              id: line.id,
              variantId: line.merchandise.id,
              productId: line.merchandise.product.id,
              title: line.merchandise.product.title,
              handle: line.merchandise.product.handle,
              image: line.merchandise.product.image?.url || '',
              price: line.merchandise.price,
              quantity: line.quantity,
              currencyCode: line.merchandise.currencyCode
            })),
            subtotal: normalizedCart.cost.subtotalAmount.amount,
            total: normalizedCart.cost.totalAmount.amount,
            currencyCode: normalizedCart.cost.totalAmount.currencyCode,
            itemCount: normalizedCart.lines.reduce((acc, line) => acc + line.quantity, 0),
            checkoutUrl: normalizedCart.checkoutUrl,
            isLoading: false,
            isOpen: true // Open cart when item is added
          });
          
          console.log(`Item added to cart successfully. Cart now has ${normalizedCart.lines.length} items.`);
        } catch (error) {
          console.error('Failed to add item to cart:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      updateItem: async (id, quantity) => {
        const state = get();
        set({ isLoading: true });
        
        try {
          if (!state.cartId) {
            throw new Error('Cart not initialized');
          }
          
          console.log(`Updating item in cart: ${id}, new quantity: ${quantity}`);
          
          // If quantity is 0 or less, remove the item
          if (quantity <= 0) {
            return get().removeItem(id);
          }
          
          const cart = await updateCart(state.cartId, [{
            id,
            quantity
          }]);
          
          // Normalize and update cart state
          const normalizedCart = normalizeCart(cart);
          
          set({
            items: normalizedCart.lines.map(line => ({
              id: line.id,
              variantId: line.merchandise.id,
              productId: line.merchandise.product.id,
              title: line.merchandise.product.title,
              handle: line.merchandise.product.handle,
              image: line.merchandise.product.image?.url || '',
              price: line.merchandise.price,
              quantity: line.quantity,
              currencyCode: line.merchandise.currencyCode
            })),
            subtotal: normalizedCart.cost.subtotalAmount.amount,
            total: normalizedCart.cost.totalAmount.amount,
            currencyCode: normalizedCart.cost.totalAmount.currencyCode,
            itemCount: normalizedCart.lines.reduce((acc, line) => acc + line.quantity, 0),
            isLoading: false
          });
          
          console.log(`Item updated successfully. Cart now has ${normalizedCart.lines.length} items.`);
        } catch (error) {
          console.error('Failed to update item in cart:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      removeItem: async (id) => {
        const state = get();
        set({ isLoading: true });
        
        try {
          if (!state.cartId) {
            throw new Error('Cart not initialized');
          }
          
          console.log(`Removing item from cart: ${id}`);
          
          const cart = await removeFromCart(state.cartId, [id]);
          
          // Update cart state from response
          const normalizedCart = normalizeCart(cart);
          
          set({
            items: normalizedCart.lines.map(line => ({
              id: line.id,
              variantId: line.merchandise.id,
              productId: line.merchandise.product.id,
              title: line.merchandise.product.title,
              handle: line.merchandise.product.handle,
              image: line.merchandise.product.image?.url || '',
              price: line.merchandise.price,
              quantity: line.quantity,
              currencyCode: line.merchandise.currencyCode
            })),
            subtotal: normalizedCart.cost.subtotalAmount.amount,
            total: normalizedCart.cost.totalAmount.amount,
            currencyCode: normalizedCart.cost.totalAmount.currencyCode,
            itemCount: normalizedCart.lines.reduce((acc, line) => acc + line.quantity, 0),
            isLoading: false
          });
          
          console.log(`Item removed successfully. Cart now has ${normalizedCart.lines.length} items.`);
        } catch (error) {
          console.error('Failed to remove item from cart:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      clearCart: async () => {
        const state = get();
        set({ isLoading: true });
        
        try {
          // Create a new empty cart
          console.log('Clearing cart and creating a new one');
          const cart = await createCart();
          
          set({
            cartId: cart.id,
            items: [],
            subtotal: '0.00',
            total: '0.00',
            itemCount: 0,
            checkoutUrl: cart.checkoutUrl,
            isLoading: false
          });
          
          console.log('Cart cleared successfully. New cart ID:', cart.id);
        } catch (error) {
          console.error('Failed to clear cart:', error);
          set({ isLoading: false });
          throw error;
        }
      }
    }),
    {
      name: 'ankkor-cart',
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      version: 1,
    }
  )
);

// For demo purposes, we're using a simplified cart store that doesn't make API calls
export const useSimpleCartStore = create<{
  items: Array<{
    id: string;
    name: string;
    price: string;
    image: string;
    variantId: string;
    quantity: number;
  }>;
  itemCount: number;
  isOpen: boolean;
  toggleCart: () => void;
  addToCart: (item: { id: string; name: string; price: string; image: string; variantId: string; quantity: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}>(
  persist(
    (set) => ({
      items: [],
      itemCount: 0,
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addToCart: (newItem) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === newItem.id
          );

          let updatedItems;

          if (existingItemIndex >= 0) {
            // Item exists, update quantity
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
            };
          } else {
            // Item doesn't exist, add it
            updatedItems = [...state.items, newItem];
          }

          return {
            items: updatedItems,
            itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          };
        }),
      removeFromCart: (id) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          return {
            items: updatedItems,
            itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            return state.removeFromCart(id);
          }

          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );

          return {
            items: updatedItems,
            itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          };
        }),
      clearCart: () => set({ items: [], itemCount: 0 }),
    }),
    {
      name: 'ankkor-simple-cart',
    }
  )
);

// Wishlist store
type WishlistState = {
  items: WishlistItem[];
  isLoading: boolean;
  
  // Actions
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      
      addToWishlist: (item) => {
        set((state) => {
          // Check if item already exists in wishlist
          if (state.items.some(wishlistItem => wishlistItem.id === item.id)) {
            return state; // Item already exists, don't add it again
          }
          
          return {
            items: [...state.items, item]
          };
        });
      },
      
      removeFromWishlist: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
      
      isInWishlist: (id) => {
        return get().items.some(item => item.id === id);
      }
    }),
    {
      name: 'ankkor-wishlist',
    }
  )
); 