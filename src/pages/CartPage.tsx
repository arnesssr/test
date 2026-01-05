import { motion } from 'framer-motion';
import { ShoppingCart } from '@/components/ShoppingCart/ShoppingCart';

export const CartPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ShoppingCart />
      </motion.div>
    </div>
  );
};
