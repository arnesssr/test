export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  stock: number;
  tags: string[];
  features: string[];
  specifications: Record<string, string>;
  model3D?: string;
  volumePricing?: VolumePrice[];
  related?: string[];
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface VolumePrice {
  quantity: number;
  price: number;
  discount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  colors: string[];
  sizes: string[];
}

export interface SearchResult {
  product: Product;
  score: number;
  matches: string[];
}

export interface Recommendation {
  type: 'similar' | 'bundle' | 'trending' | 'personalized';
  products: Product[];
  reason?: string;
}

export type SortOption = 
  | 'relevance' 
  | 'price-asc' 
  | 'price-desc' 
  | 'rating' 
  | 'newest' 
  | 'popular';

export interface User {
  id: string;
  name: string;
  email: string;
  preferences?: {
    categories: string[];
    brands: string[];
    priceRange: [number, number];
  };
  purchaseHistory?: string[];
}
