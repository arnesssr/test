import { motion } from 'framer-motion';
import { Comparison } from '@/components/Comparison/Comparison';

export const ComparisonPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Comparison />
      </motion.div>
    </div>
  );
};
