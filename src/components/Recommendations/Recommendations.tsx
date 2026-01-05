import { motion } from 'framer-motion';
import { Product } from '@/types';
import { ProductCard } from '../ProductGrid/ProductCard';

interface RecommendationsProps {
  title: string;
  products: Product[];
  reason?: string;
}

export const Recommendations = ({ title, products, reason }: RecommendationsProps) => {
  if (products.length === 0) return null;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {reason && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            {reason}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
