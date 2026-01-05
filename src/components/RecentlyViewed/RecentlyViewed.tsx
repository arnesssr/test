import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Link } from 'react-router-dom';

export const RecentlyViewed = () => {
  const { recentlyViewed } = useStore();

  if (recentlyViewed.length === 0) return null;

  return (
    <div className="mt-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-gray-500" />
          Recently Viewed
        </h2>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {recentlyViewed.slice(0, 12).map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex-shrink-0 w-48"
          >
            <Link to={`/product/${product.id}`}>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {product.brand}
                  </p>
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2 dark:text-white">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      ${product.price}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {product.rating}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
