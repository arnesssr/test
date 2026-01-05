import { useQuery } from '@tanstack/react-query';
import { mockProducts } from '@/data/mockProducts';
import { Product } from '@/types';

const fetchProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProducts;
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
      await new Promise((resolve) => setTimeout(resolve, 300));
      const product = mockProducts.find((p) => p.id === id);
      if (!product) throw new Error('Product not found');
      return product;
    },
    staleTime: 5 * 60 * 1000,
  });
};
