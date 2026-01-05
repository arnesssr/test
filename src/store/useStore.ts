import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';

export interface SearchFilters {
  query: string;
  category: string;
  priceRange: [number, number];
  sort: string;
}

interface StoreState {
  cart: Product[];
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
  
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: number) => void;
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

      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },

      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
        } else {
          set({
            cart: get().cart.map((item) =>
              item.id === productId ? { ...item, quantity } : item
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