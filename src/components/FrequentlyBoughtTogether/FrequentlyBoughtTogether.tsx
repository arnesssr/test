import { motion } from 'framer-motion';
import { Plus, Equal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';

interface FrequentlyBoughtTogetherProps {
  mainProduct: Product;
  products: Product[];
  title?: string;
}

export const FrequentlyBoughtTogether = ({ mainProduct, products, title }: FrequentlyBoughtTogetherProps) => {
  const { addToCart } = useStore();

  const items = [mainProduct, ...products].slice(0, 3);
  const total = items.reduce((sum, p) => sum + p.price, 0);

  const handleAddAll = () => {
    items.forEach((p) => addToCart(p));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 dark:text-white">{title || 'Frequently bought together'}</h3>

      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex items-center gap-3 overflow-x-auto">
          {items.map((p, idx) => (
            <div key={p.id} className="flex items-center gap-3">
              <Link to={`/product/${p.id}`} className="flex-shrink-0">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                />
              </Link>
              {idx < items.length - 1 ? (
                <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
              ) : (
                <Equal className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="flex-1">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Total price for {items.length} items
          </div>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            ${total.toFixed(2)}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddAll}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Add all to cart
          </motion.button>

          <ul className="mt-4 space-y-1 text-sm">
            {items.map((p) => (
              <li key={p.id} className="text-gray-700 dark:text-gray-300">
                • {p.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
