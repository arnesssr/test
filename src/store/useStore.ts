import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, WishlistItem, FilterOptions, SortOption, SavedForLaterItem, Coupon } from '@/types';

interface StoreState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  comparisonList: Product[];
  recentlyViewed: Product[];
  savedForLater: SavedForLaterItem[];
  appliedCoupon: Coupon | null;
  isDarkMode: boolean;
  filters: FilterOptions;
  sortBy: SortOption;
  searchQuery: string;
  
  addToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  moveToSavedForLater: (productId: string) => void;
  moveToCart: (productId: string) => void;
  removeSavedForLater: (productId: string) => void;
  
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  
  addToRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;
  
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  
  toggleDarkMode: () => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
  setSortBy: (sortBy: SortOption) => void;
  setSearchQuery: (query: string) => void;
}

const defaultFilters: FilterOptions = {
  categories: [],
  brands: [],
  priceRange: [0, 1000],
  rating: 0,
  inStock: false,
  colors: [],
  sizes: [],
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      comparisonList: [],
      recentlyViewed: [],
      savedForLater: [],
      appliedCoupon: null,
      isDarkMode: false,
      filters: defaultFilters,
      sortBy: 'relevance',
      searchQuery: '',

      addToCart: (product, quantity, color, size) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => 
              item.product.id === product.id && 
              item.selectedColor === color && 
              item.selectedSize === size
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id &&
                item.selectedColor === color &&
                item.selectedSize === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              { product, quantity, selectedColor: color, selectedSize: size },
            ],
          };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),

      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ cart: [] }),

      moveToSavedForLater: (productId) =>
        set((state) => {
          const cartItem = state.cart.find((item) => item.product.id === productId);
          if (!cartItem) return state;
          
          return {
            cart: state.cart.filter((item) => item.product.id !== productId),
            savedForLater: [
              ...state.savedForLater,
              {
                product: cartItem.product,
                quantity: cartItem.quantity,
                savedAt: new Date(),
                selectedColor: cartItem.selectedColor,
                selectedSize: cartItem.selectedSize,
              },
            ],
          };
        }),

      moveToCart: (productId) =>
        set((state) => {
          const savedItem = state.savedForLater.find((item) => item.product.id === productId);
          if (!savedItem) return state;
          
          return {
            savedForLater: state.savedForLater.filter((item) => item.product.id !== productId),
            cart: [
              ...state.cart,
              {
                product: savedItem.product,
                quantity: savedItem.quantity,
                selectedColor: savedItem.selectedColor,
                selectedSize: savedItem.selectedSize,
              },
            ],
          };
        }),

      removeSavedForLater: (productId) =>
        set((state) => ({
          savedForLater: state.savedForLater.filter((item) => item.product.id !== productId),
        })),

      addToWishlist: (product) =>
        set((state) => {
          if (state.wishlist.some((item) => item.product.id === product.id)) {
            return state;
          }
          return {
            wishlist: [...state.wishlist, { product, addedAt: new Date() }],
          };
        }),

      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.product.id !== productId),
        })),

      addToComparison: (product) =>
        set((state) => {
          if (state.comparisonList.length >= 4) {
            return state;
          }
          if (state.comparisonList.some((p) => p.id === product.id)) {
            return state;
          }
          return {
            comparisonList: [...state.comparisonList, product],
          };
        }),

      removeFromComparison: (productId) =>
        set((state) => ({
          comparisonList: state.comparisonList.filter((p) => p.id !== productId),
        })),

      clearComparison: () => set({ comparisonList: [] }),

      addToRecentlyViewed: (product) =>
        set((state) => {
          const filtered = state.recentlyViewed.filter((p) => p.id !== product.id);
          return {
            recentlyViewed: [product, ...filtered].slice(0, 20),
          };
        }),

      clearRecentlyViewed: () => set({ recentlyViewed: [] }),

      applyCoupon: (coupon) => set({ appliedCoupon: coupon }),

      removeCoupon: () => set({ appliedCoupon: null }),

      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      resetFilters: () => set({ filters: defaultFilters }),

      setSortBy: (sortBy) => set({ sortBy }),

      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'storefront-storage',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed,
        savedForLater: state.savedForLater,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);
