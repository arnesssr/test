import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProduct } from '@/hooks/useProducts';
import { useRecommendations } from '@/hooks/useRecommendations';
import { ProductDetail } from '@/components/ProductDetail/ProductDetail';
import { Recommendations } from '@/components/Recommendations/Recommendations';

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id!);
  const { recommendations } = useRecommendations(product);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
        />
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <ProductDetail product={product} />
      </motion.div>

      <div className="mt-16 space-y-12">
        {recommendations.map((rec, index) => (
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
    </div>
  );
};
