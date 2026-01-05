import { ShoppingBag, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useAuthStore } from '@/store/authStore';

interface PreviousOrder {
  id: string;
  date: string;
  total: number;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }>;
}

const mockPreviousOrders: PreviousOrder[] = [
  {
    id: 'order-1',
    date: '2024-01-15',
    total: 156.97,
    items: [
      {
        productId: 'prod-1',
        productName: 'Premium Wireless Headphones',
        quantity: 1,
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      },
      {
        productId: 'prod-2',
        productName: 'USB-C Charging Cable',
        quantity: 2,
        price: 13.49,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
      },
    ],
  },
  {
    id: 'order-2',
    date: '2024-01-02',
    total: 89.99,
    items: [
      {
        productId: 'prod-3',
        productName: 'Bluetooth Speaker',
        quantity: 1,
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
      },
    ],
  },
  {
    id: 'order-3',
    date: '2023-12-20',
    total: 249.99,
    items: [
      {
        productId: 'prod-4',
        productName: 'Smart Watch Pro',
        quantity: 1,
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      },
    ],
  },
];

export const OneClickReorder = () => {
  const { isAuthenticated } = useAuthStore();
  const { addToCart } = useStore();
  const [showOrders, setShowOrders] = useState(true);

  if (!isAuthenticated) return null;

  const handleReorder = (order: PreviousOrder) => {
    order.items.forEach((item) => {
      // For mock purposes, we're just adding a simplified cart item
      addToCart({
        id: item.productId,
        name: item.productName,
        description: 'Reorder item',
        price: item.price,
        images: [item.image],
        category: 'Electronics',
        subcategory: 'Accessories',
        brand: 'Unknown',
        rating: 4.5,
        reviewCount: 100,
        colors: [],
        sizes: [],
        stock: 10,
        tags: [],
        features: [],
        specifications: {},
        quantity: item.quantity,
      });
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-lg">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold dark:text-white">Quick Reorder</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Repurchase your favorites with one click
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowOrders(!showOrders)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {showOrders ? 'Hide' : 'Show'}
        </button>
      </div>

      {showOrders && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="space-y-3"
        >
          {mockPreviousOrders.map((order) => (
            <motion.div
              key={order.id}
              layout
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(order.date)}
                    </span>
                  </div>

                  <div className="flex gap-2 mb-3 overflow-x-auto">
                    {order.items.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          +{order.items.length - 4}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </span>
                    <span className="font-bold text-primary-600 dark:text-primary-400">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleReorder(order)}
                  className="flex-shrink-0 ml-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Reorder
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
