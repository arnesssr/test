import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartProduct, Coupon, Product } from '../types';

export interface SearchFilters {
  query: string;
  category: string;
  priceRange: [number, number];
  sort: string;
}

interface StoreState {
  cart: CartProduct[];
  wishlist: Product[];
  comparisonList: Product[];
  searchQuery: string;
  searchFilters: SearchFilters;
  selectedCategory: string | null;
  isAuthOpen: boolean;
  authMode: 'login' | 'signup' | null;
  user: { name: string; email: string } | null;
  showOneClickReorder: boolean;

  // Mobile UI state
  mobileSearchOpen: boolean;
  activeTab: 'home' | 'categories' | 'search' | 'cart' | 'profile';
  recentSearches: string[];
  mobileMenuOpen: boolean;
  mobileCategoryOpen: boolean;

  // Additional state
  filters: any;
  sortBy: string;
  recentlyViewed: Product[];
  savedForLater: CartProduct[];
  appliedCoupon: Coupon | null;

  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  updateCartQuantity: (
    productId: string,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  clearCart: () => void;

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;

  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;

  setSearchQuery: (query: string) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  clearSearchFilters: () => void;

  setSelectedCategory: (category: string | null) => void;

  setAuthOpen: (isOpen: boolean) => void;
  setAuthMode: (mode: 'login' | 'signup' | null) => void;
  setUser: (user: { name: string; email: string } | null) => void;
  logout: () => void;

  setShowOneClickReorder: (show: boolean) => void;

  // Mobile UI actions
  setMobileSearchOpen: (open: boolean) => void;
  setActiveTab: (tab: 'home' | 'categories' | 'search' | 'cart' | 'profile') => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setMobileCategoryOpen: (open: boolean) => void;

  // Additional actions
  setFilters: (filters: any) => void;
  setSortBy: (sortBy: string) => void;
  resetFilters: () => void;
  addToRecentlyViewed: (product: Product) => void;
  moveToSavedForLater: (item: CartProduct) => void;
  moveToCart: (item: CartProduct) => void;
  removeSavedForLater: (itemId: string) => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      comparisonList: [],
      searchQuery: '',
      searchFilters: {
        query: '',
        category: '',
        priceRange: [0, 1000],
        sort: 'featured',
      },
      selectedCategory: null,
      isAuthOpen: false,
      authMode: null,
      user: null,
      showOneClickReorder: false,

      // Mobile UI state
      mobileSearchOpen: false,
      activeTab: 'home',
      recentSearches: [],
      mobileMenuOpen: false,
      mobileCategoryOpen: false,

      // Additional state
      filters: {},
      sortBy: 'featured',
      recentlyViewed: [],
      savedForLater: [],
      appliedCoupon: null,

      addToCart: (product) => {
        const cart = get().cart;
        const incomingQuantity = Math.max(1, product.quantity ?? 1);

        const existingItem = cart.find(
          (item) =>
            item.id === product.id &&
            item.selectedColor === product.selectedColor &&
            item.selectedSize === product.selectedSize
        );

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id &&
              item.selectedColor === product.selectedColor &&
              item.selectedSize === product.selectedSize
                ? { ...item, quantity: (item.quantity ?? 1) + incomingQuantity }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: incomingQuantity }] });
        }
      },

      removeFromCart: (productId, selectedColor, selectedSize) => {
        set({
          cart: get().cart.filter(
            (item) =>
              !(
                item.id === productId &&
                (selectedColor === undefined || item.selectedColor === selectedColor) &&
                (selectedSize === undefined || item.selectedSize === selectedSize)
              )
          ),
        });
      },

      updateCartQuantity: (productId, quantity, selectedColor, selectedSize) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, selectedColor, selectedSize);
        } else {
          set({
            cart: get().cart.map((item) =>
              item.id === productId &&
              (selectedColor === undefined || item.selectedColor === selectedColor) &&
              (selectedSize === undefined || item.selectedSize === selectedSize)
                ? { ...item, quantity }
                : item
            ),
          });
        }
      },

      clearCart: () => set({ cart: [] }),

      addToWishlist: (product) => {
        const wishlist = get().wishlist;
        if (!wishlist.find((item) => item.id === product.id)) {
          set({ wishlist: [...wishlist, product] });
        }
      },

      removeFromWishlist: (productId) => {
        set({ wishlist: get().wishlist.filter((item) => item.id !== productId) });
      },

      addToComparison: (product) => {
        const comparisonList = get().comparisonList;
        if (comparisonList.length < 4 && !comparisonList.find((item) => item.id === product.id)) {
          set({ comparisonList: [...comparisonList, product] });
        }
      },

      removeFromComparison: (productId) => {
        set({ comparisonList: get().comparisonList.filter((item) => item.id !== productId) });
      },

      clearComparison: () => set({ comparisonList: [] }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSearchFilters: (filters) =>
        set({
          searchFilters: { ...get().searchFilters, ...filters },
        }),

      clearSearchFilters: () =>
        set({
          searchFilters: {
            query: '',
            category: '',
            priceRange: [0, 1000],
            sort: 'featured',
          },
        }),

      setSelectedCategory: (category) => set({ selectedCategory: category }),

      setAuthOpen: (isOpen) => set({ isAuthOpen: isOpen }),

      setAuthMode: (mode) => set({ authMode: mode }),

      setUser: (user) => set({ user }),

      logout: () => {
        set({ user: null, cart: [], wishlist: [] });
      },

      setShowOneClickReorder: (show) => set({ showOneClickReorder: show }),
      
      // Mobile UI actions
      setMobileSearchOpen: (open) => set({ mobileSearchOpen: open }),
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      addRecentSearch: (query) => {
        const recentSearches = get().recentSearches;
        const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 10);
        set({ recentSearches: updatedSearches });
      },
      
      clearRecentSearches: () => set({ recentSearches: [] }),
      
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      setMobileCategoryOpen: (open) => set({ mobileCategoryOpen: open }),

      // Additional actions
      setFilters: (filters) => set({ filters }),
      setSortBy: (sortBy) => set({ sortBy }),
      resetFilters: () => set({ filters: {} }),
      addToRecentlyViewed: (product) => {
        const recentlyViewed = get().recentlyViewed;
        const filtered = recentlyViewed.filter((p) => p.id !== product.id);
        set({ recentlyViewed: [product, ...filtered].slice(0, 10) });
      },
      moveToSavedForLater: (item) => {
        const savedForLater = get().savedForLater;
        if (!savedForLater.find((i: any) => i.id === item.id)) {
          set({ savedForLater: [...savedForLater, item] });
        }
      },
      moveToCart: (item) => {
        get().addToCart(item);
        set({ savedForLater: get().savedForLater.filter((i: any) => i.id !== item.id) });
      },
      removeSavedForLater: (itemId) => {
        set({ savedForLater: get().savedForLater.filter((i: any) => i.id !== itemId) });
      },
      applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
      removeCoupon: () => set({ appliedCoupon: null }),
    }),
    {
      name: 'modern-store-storage',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        user: state.user,
        recentSearches: state.recentSearches,
      }),
    }
  )
);

export const useAuthStore = create<{
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  setAuth: (isAuthenticated: boolean, user?: { name: string; email: string }) => void;
  logout: () => void;
}>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setAuth: (isAuthenticated, user) => set({ isAuthenticated, user: user || null }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'modern-store-auth',
    }
  )
);