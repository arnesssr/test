import { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { ChevronLeft, ChevronRight, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  itemsPerView?: number;
  onQuickView?: (product: Product) => void;
}

export const ProductCarousel = ({ title, products, itemsPerView = 4, onQuickView }: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useStore();
  const wishlistItems = wishlist.map(item => item.id);

  const toggleWishlist = (product: Product) => {
    if (wishlistItems.includes(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e: MouseEvent, product: Product) => {
    e.preventDefault();
    onQuickView?.(product);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleItems = isMobile ? 2 : itemsPerView;
  const maxIndex = Math.max(0, products.length - visibleItems);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (products.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">{title}</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            initial={false}
            animate={{ x: `-${currentIndex * (100 / visibleItems)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                  whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                   <img
                     src={product.images[0]}
                     alt={product.name}
                     className="w-full h-48 object-cover"
                     loading="lazy"
                   />
                   <button
                     onClick={(e) => handleQuickView(e, product)}
                     className="absolute bottom-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-shadow opacity-0 group-hover:opacity-100"
                     aria-label="Quick view"
                   >
                     <Eye className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                   </button>
                   <button
                     onClick={() => toggleWishlist(product)}
                     className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:shadow-lg transition-shadow"
                     aria-label={wishlistItems.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                   >
                     <svg
                       className={cn(
                         'w-5 h-5',
                         wishlistItems.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                       )}
                       fill="none"
                       stroke="currentColor"
                       viewBox="0 0 24 24"
                     >
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                     </svg>
                   </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 dark:text-white truncate">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'w-4 h-4',
                              i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        ({product.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${(product.price * 1.2).toFixed(2)}
                      </span>
                    </div>
                    <motion.button
                      onClick={() => addToCart(product)}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {products.length > visibleItems && (
          <>
            <motion.button
              onClick={prev}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed z-10"
              aria-label="Previous products"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={next}
              disabled={currentIndex === maxIndex}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed z-10"
              aria-label="Next products"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
};