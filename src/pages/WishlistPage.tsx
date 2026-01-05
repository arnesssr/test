import { motion } from 'framer-motion';
import { Wishlist } from '@/components/Wishlist/Wishlist';

export const WishlistPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Wishlist />
      </motion.div>
    </div>
  );
};
