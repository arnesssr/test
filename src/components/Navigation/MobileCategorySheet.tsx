import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { X, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

const categories = [
  {
    name: 'Electronics',
    icon: '📱',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    count: 1247,
    subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Accessories', 'Audio'],
  },
  {
    name: 'Home & Living',
    icon: '🏠',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    count: 892,
    subcategories: ['Furniture', 'Kitchen', 'Bedding', 'Decor', 'Storage'],
  },
  {
    name: 'Fashion',
    icon: '👗',
    color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
    count: 2156,
    subcategories: ['Clothing', 'Shoes', 'Bags', 'Accessories', 'Jewelry'],
  },
  {
    name: 'Sports',
    icon: '⚽',
    color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    count: 567,
    subcategories: ['Fitness', 'Outdoor', 'Equipment', 'Apparel', 'Shoes'],
  },
  {
    name: 'Books & Media',
    icon: '📚',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    count: 1342,
    subcategories: ['Books', 'Movies', 'Music', 'Games', 'Software'],
  },
  {
    name: 'Toys & Games',
    icon: '🎮',
    color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    count: 789,
    subcategories: ['Toys', 'Board Games', 'Video Games', 'Educational', 'Outdoor'],
  },
  {
    name: 'Beauty',
    icon: '💄',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    count: 456,
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Tools'],
  },
  {
    name: 'Automotive',
    icon: '🚗',
    color: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
    count: 923,
    subcategories: ['Parts', 'Accessories', 'Tools', 'Electronics', 'Care'],
  },
];

export default function MobileCategorySheet() {
  const { mobileCategoryOpen, setMobileCategoryOpen, setSelectedCategory } = useStore();

  useEffect(() => {
    if (mobileCategoryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileCategoryOpen]);

  const sheetVariants: any = {
    hidden: {
      opacity: 0,
      y: '100%',
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut' as const,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setMobileCategoryOpen(false);
    // Navigate to category page
    window.location.href = `/category/${encodeURIComponent(categoryName.toLowerCase())}`;
  };

  const handleSubcategoryClick = (categoryName: string, subcategory: string) => {
    const categorySlug = categoryName.toLowerCase();
    const subcategorySlug = subcategory.toLowerCase();
    setMobileCategoryOpen(false);
    // Navigate to subcategory
    window.location.href = `/category/${categorySlug}/${subcategorySlug}`;
  };

  return (
    <AnimatePresence>
      {mobileCategoryOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 sm:hidden"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setMobileCategoryOpen(false)}
          />
          
          {/* Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Categories
              </h2>
              <button
                onClick={() => setMobileCategoryOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close categories"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category List */}
            <div className="overflow-y-auto pb-20 max-h-[calc(85vh-100px)]">
              <div className="px-4 py-2">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.05,
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                    className="mb-3"
                  >
                    <button
                      onClick={() => handleCategoryClick(category.name)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                          {category.icon}
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {category.count.toLocaleString()} products
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex-shrink-0" />
                    </button>

                    {/* Subcategories */}
                    <div className="ml-16 mt-2 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory}
                          onClick={() => handleSubcategoryClick(category.name, subcategory)}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4">
              <button
                onClick={() => {
                  setMobileCategoryOpen(false);
                  window.location.href = '/categories';
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Browse All Categories
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}