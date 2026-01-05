# API Integration Guide

This guide explains how to integrate ModernStore with your backend API.

## Overview

The application currently uses mock data but is designed for seamless backend integration. All data fetching is centralized in the `hooks` and `services` directories.

## Steps to Integrate

### 1. Set Up API Client

Create an API client in `src/services/api.ts`:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 2. Update Product Hooks

Replace mock data in `src/hooks/useProducts.ts`:

```typescript
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { Product } from '@/types';

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/products');
  return data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
```

### 3. Implement Cart API

Update cart operations to sync with backend:

```typescript
// In your store
addToCart: async (product, quantity, color, size) => {
  await api.post('/cart/items', {
    productId: product.id,
    quantity,
    color,
    size,
  });
  // Update local state
  set((state) => ({
    cart: [...state.cart, { product, quantity, selectedColor: color, selectedSize: size }],
  }));
},
```

### 4. Add Authentication

Create authentication hooks:

```typescript
// src/hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      return data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await api.post('/auth/register', userData);
      return data;
    },
  });
};
```

### 5. Implement Search API

Update search to use backend:

```typescript
// In SearchService
async search(query: string): Promise<SearchResult[]> {
  const { data } = await api.get('/search', {
    params: { q: query },
  });
  return data;
}
```

### 6. Add Checkout Flow

Create checkout mutations:

```typescript
export const useCheckout = () => {
  return useMutation({
    mutationFn: async (checkoutData) => {
      const { data } = await api.post('/checkout', checkoutData);
      return data;
    },
  });
};
```

## API Endpoints Expected

### Products
- `GET /products` - List all products
- `GET /products/:id` - Get single product
- `GET /products/search?q=query` - Search products
- `GET /products/trending` - Get trending products
- `GET /products/:id/recommendations` - Get recommendations

### Cart
- `GET /cart` - Get user's cart
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/:id` - Update cart item
- `DELETE /cart/items/:id` - Remove cart item
- `DELETE /cart` - Clear cart

### Wishlist
- `GET /wishlist` - Get user's wishlist
- `POST /wishlist/items` - Add to wishlist
- `DELETE /wishlist/items/:id` - Remove from wishlist

### User
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user
- `PUT /user/profile` - Update profile
- `GET /user/orders` - Get order history

### Checkout
- `POST /checkout` - Create order
- `POST /checkout/validate` - Validate checkout data
- `GET /orders/:id` - Get order details

## Data Format

Ensure your API returns data in the format defined in `src/types/index.ts`:

```typescript
interface Product {
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
}
```

## Error Handling

Add global error handler:

```typescript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## Environment Variables

Set up your `.env` file:

```
VITE_API_URL=https://api.yourstore.com
VITE_ENV=production
```

## Testing API Integration

1. Start your backend server
2. Update `VITE_API_URL` in `.env`
3. Replace mock hooks with API hooks
4. Test all features thoroughly
5. Monitor network requests in DevTools

## Best Practices

- Use React Query for caching and optimization
- Implement proper error handling
- Show loading states
- Add retry logic for failed requests
- Use optimistic updates for better UX
- Implement request debouncing for search
- Cache frequently accessed data
- Handle offline scenarios gracefully

## Need Help?

Open an issue if you need assistance with API integration.
