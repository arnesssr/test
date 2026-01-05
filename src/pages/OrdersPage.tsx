import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

export const OrdersPage = () => {
  const orders = [];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8 dark:text-white">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-lg">
            <Package className="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-600" />
            <h2 className="text-2xl font-bold mb-2 dark:text-white">No Orders Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              onClick={() => (window.location.href = '/')}
            >
              Start Shopping
            </motion.button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Orders would be rendered here */}
          </div>
        )}
      </motion.div>
    </div>
  );
};
