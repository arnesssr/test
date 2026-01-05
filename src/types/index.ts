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
  seller?: Seller;
  badges?: ProductBadge[];
  shippingInfo?: ShippingInfo;
  sizeGuide?: string;
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

export interface CartProduct extends Product {
  quantity?: number;
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
  avatar?: string;
  preferences?: {
    categories: string[];
    brands: string[];
    priceRange: [number, number];
  };
  purchaseHistory?: string[];
}

export interface Seller {
  id: string;
  name: string;
  logo?: string;
  rating: number;
  totalReviews: number;
  joinedDate: string;
  responseRate: number;
  responseTime: string;
  products?: number;
  country?: string;
}

export type ProductBadge = 'best-seller' | 'limited-stock' | 'new-arrival' | 'trending' | 'featured' | 'sale';

export interface ShippingInfo {
  freeShipping: boolean;
  estimatedDays: [number, number];
  cost?: number;
  methods?: ShippingMethod[];
}

export interface ShippingMethod {
  name: string;
  cost: number;
  estimatedDays: [number, number];
  description?: string;
}

export interface ProductQuestion {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  question: string;
  date: string;
  answer?: {
    text: string;
    answeredBy: string;
    date: string;
  };
  helpful: number;
}

export interface SavedForLaterItem {
  product: Product;
  quantity: number;
  savedAt: Date;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  expiryDate?: Date;
  description?: string;
}

export interface BulkQuoteRequest {
  productId: string;
  quantity: number;
  email: string;
  company?: string;
  message?: string;
}
