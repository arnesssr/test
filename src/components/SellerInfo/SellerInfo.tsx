import { motion } from 'framer-motion';
import { Star, Store, Package, MessageCircle, Clock, Globe } from 'lucide-react';
import { Seller } from '@/types';

interface SellerInfoProps {
  seller: Seller;
}

export const SellerInfo = ({ seller }: SellerInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-lg font-bold mb-4 dark:text-white flex items-center gap-2">
        <Store className="w-5 h-5 text-primary-600" />
        Seller Information
      </h3>

      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
          {seller.logo ? (
            <img src={seller.logo} alt={seller.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <Store className="w-8 h-8 text-gray-400" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-lg dark:text-white">{seller.name}</h4>
            <button className="px-4 py-2 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg text-sm font-medium transition-colors">
              Visit Store
            </button>
          </div>

          <div className="flex items-center gap-4 text-sm mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium dark:text-white">{seller.rating.toFixed(1)}</span>
              <span className="text-gray-500 dark:text-gray-400">
                ({seller.totalReviews.toLocaleString()} reviews)
              </span>
            </div>
            {seller.country && (
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Globe className="w-4 h-4" />
                {seller.country}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Response Rate</div>
                <div className="font-semibold dark:text-white">{seller.responseRate}%</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Response Time</div>
                <div className="font-semibold dark:text-white">{seller.responseTime}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Products</div>
                <div className="font-semibold dark:text-white">
                  {seller.products ? seller.products.toLocaleString() : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Member since {seller.joinedDate}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            Contact Seller
          </button>
          <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </motion.div>
  );
};
