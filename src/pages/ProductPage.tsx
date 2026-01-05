import { useEffect, useMemo, useState, type ComponentProps } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProduct } from '@/hooks/useProducts';
import { useRecommendations } from '@/hooks/useRecommendations';
import { useStore } from '@/store/useStore';
import { ProductDetail } from '@/components/ProductDetail/ProductDetail';
import { Recommendations } from '@/components/Recommendations/Recommendations';
import { ProductQA } from '@/components/ProductQA/ProductQA';
import { SellerInfo } from '@/components/SellerInfo/SellerInfo';
import { RecentlyViewed } from '@/components/RecentlyViewed/RecentlyViewed';
import { ReviewsSection } from '@/components/Reviews/ReviewsSection';
import { FrequentlyBoughtTogether } from '@/components/FrequentlyBoughtTogether/FrequentlyBoughtTogether';
import { ProductBreadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { ProductDetailSkeleton } from '@/components/Skeleton/Skeleton';

type Review = ComponentProps<typeof ReviewsSection>['reviews'][number];

const reviewsStorageKey = (productId: string) => `product-reviews:${productId}`;

const generateSeedReviews = (productId: string, baseRating: number): Review[] => {
  const seed = productId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const names = ['Avery', 'Casey', 'Drew', 'Jamie', 'Morgan', 'Riley', 'Skyler', 'Taylor'];
  const titles = ['Great value', 'Solid quality', 'Works as expected', 'Pleasantly surprised', 'Good for the price', 'Would buy again'];
  const comments = [
    'Arrived quickly and matches the description. Packaging was good and the product feels well made.',
    'Used it for a week now — performance is consistent and it looks great. Recommend it.',
    'The build quality is better than I expected. Setup was straightforward and it works nicely.',
    'Fits my needs perfectly. Shipping was fast and customer support answered my question quickly.',
    'Good overall. I wish the instructions were a bit clearer, but it’s still an excellent purchase.',
  ];

  const count = 4 + (seed % 3);

  return Array.from({ length: count }).map((_, i) => {
    const rating = Math.max(3, Math.min(5, Math.round(baseRating + ((seed + i) % 3 - 1) * 0.6)));
    return {
      id: `seed-${productId}-${i}`,
      userId: `seed-user-${i}`,
      userName: names[(seed + i) % names.length],
      rating,
      title: titles[(seed + i) % titles.length],
      comment: comments[(seed + i) % comments.length],
      date: new Date(Date.now() - (i + 1) * 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      helpful: (seed + i) % 17,
      verified: i % 2 === 0,
    };
  });
};

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id!);
  const { recommendations } = useRecommendations(product);
  const { addToRecentlyViewed } = useStore();
  const [reviews, setReviews] = useState<Review[]>([]);

  const seedReviews = useMemo(() => {
    if (!product) return [];
    return generateSeedReviews(product.id, product.rating);
  }, [product]);

  useEffect(() => {
    if (!product) return;

    const raw = localStorage.getItem(reviewsStorageKey(product.id));
    if (raw) {
      try {
        setReviews(JSON.parse(raw));
        return;
      } catch {
        // ignore
      }
    }
    setReviews(seedReviews);
  }, [product, seedReviews]);

  useEffect(() => {
    if (product && reviews.length > 0) {
      localStorage.setItem(reviewsStorageKey(product.id), JSON.stringify(reviews.slice(0, 100)));
    }
  }, [product, reviews]);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  const handleAddReview = (newReview: Omit<Review, 'id' | 'date' | 'helpful'>) => {
    const review: Review = {
      ...newReview,
      id: `review-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      helpful: 0,
    };
    setReviews((prev) => [review, ...prev]);
  };

  const seller = useMemo(() => {
    if (!product) return null;
    if (product.seller) return product.seller;

    const seed = product.brand.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const countries = ['United States', 'China', 'Germany', 'Japan', 'United Kingdom', 'Canada'];

    return {
      id: `seller-${product.brand.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${product.brand} Official Store`,
      rating: Math.min(5, Math.max(3.8, product.rating - 0.2)),
      totalReviews: Math.max(120, product.reviewCount),
      joinedDate: `${2017 + (seed % 6)}`,
      responseRate: 94 + (seed % 6),
      responseTime: seed % 2 === 0 ? '< 12 hours' : '< 24 hours',
      products: 200 + (seed % 1200),
      country: countries[seed % countries.length],
    };
  }, [product]);

  const averageRating = useMemo(() => {
    if (!product) return 0;
    if (reviews.length === 0) return product.rating;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / reviews.length;
  }, [product, reviews]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductBreadcrumbs product={product} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <ProductDetail product={product} />
      </motion.div>

      {seller && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SellerInfo seller={seller} />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <FrequentlyBoughtTogether
          mainProduct={product}
          products={recommendations.find((r) => r.type === 'bundle')?.products.slice(0, 2) || []}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ReviewsSection
          reviews={reviews}
          averageRating={averageRating}
          totalReviews={reviews.length}
          onAddReview={handleAddReview}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ProductQA productId={product.id} sellerName={seller?.name} />
      </motion.div>

      <div className="mt-16 space-y-12">
        {recommendations
          .filter((rec) => rec.type !== 'bundle')
          .map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Recommendations
                title={rec.reason || 'Recommended for you'}
                products={rec.products}
              />
            </motion.div>
          ))}
      </div>

      <RecentlyViewed />
    </div>
  );
};
