import { useMemo } from 'react';
import { RecommendationService } from '@/services/recommendationService';
import { useProducts } from './useProducts';
import { Product } from '@/types';

export const useRecommendations = (product?: Product) => {
  const { data: products = [] } = useProducts();

  const recommendationService = useMemo(
    () => new RecommendationService(products),
    [products]
  );

  const recommendations = useMemo(() => {
    if (!product) return [];
    return recommendationService.getRecommendations(product);
  }, [product, recommendationService]);

  return { recommendations };
};

export const useTrending = (limit: number = 8) => {
  const { data: products = [] } = useProducts();

  const recommendationService = useMemo(
    () => new RecommendationService(products),
    [products]
  );

  const trending = useMemo(
    () => recommendationService.getTrendingProducts(limit),
    [recommendationService, limit]
  );

  return { trending };
};
