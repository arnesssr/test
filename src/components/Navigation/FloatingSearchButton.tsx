import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingSearchButton() {
  const { setMobileSearchOpen, mobileSearchOpen } = useStore();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide FAB when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const fabVariants: any = {
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 25,
      },
    },
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && !mobileSearchOpen && (
        <motion.button
          className="fixed sm:hidden z-40 bottom-24 right-4 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          variants={fabVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileSearchOpen(true)}
          aria-label="Open search"
        >
          <motion.div
            animate={{ rotate: mobileSearchOpen ? 90 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex items-center justify-center"
          >
            <Search className="w-6 h-6" />
          </motion.div>
          
          {/* Ripple effect on tap */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20 pointer-events-none"
            initial={{ scale: 0 }}
            animate={{ scale: 3 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'none' }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}