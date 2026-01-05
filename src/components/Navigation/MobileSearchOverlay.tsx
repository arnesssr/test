import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Search, X, Clock, TrendingUp, Mic } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { products } from '../../data/products';

export default function MobileSearchOverlay() {
  const { 
    mobileSearchOpen, 
    setMobileSearchOpen, 
    recentSearches, 
    addRecentSearch,
    setSearchQuery 
  } = useStore();
  
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Fuse.js for search
  const fuse = new Fuse(products, {
    keys: ['name', 'category', 'description', 'tags'],
    threshold: 0.3,
    includeScore: true,
  });

  useEffect(() => {
    if (mobileSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  useEffect(() => {
    if (query.length > 0) {
      const results = fuse.search(query);
      const uniqueSuggestions = Array.from(
        new Set(results.slice(0, 5).map((result) => result.item.name))
      );
      setSuggestions(uniqueSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery.trim());
      setSearchQuery(searchQuery.trim());
      // Navigate to search results or trigger search
      console.log('Searching for:', searchQuery);
    }
    setMobileSearchOpen(false);
    setQuery('');
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      // In a real app, this would use the Web Speech API
      setQuery('"Alexa, find wireless headphones"');
    }, 2000);
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
    handleSearch(search);
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
      y: '100%',
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
  };

  return (
    <AnimatePresence>
      {mobileSearchOpen && (
        <motion.div
          className="fixed inset-0 z-50 sm:hidden bg-white dark:bg-gray-900"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(query);
                    }
                  }}
                  placeholder="Search products..."
                  className="w-full bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 pr-10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700"
                  aria-label="Search products"
                />
                
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <button
                onClick={handleVoiceSearch}
                className={`p-2 rounded-full ${isListening ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                aria-label="Voice search"
              >
                <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
              </button>
              
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
                aria-label="Close search"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Search Content */}
          <motion.div
            className="flex-1 overflow-y-auto pb-20"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Suggestions
                </h3>
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      variants={itemVariants}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center gap-3"
                    >
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="flex-1">{suggestion}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && !query && (
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Recent Searches
                  </h3>
                  <button
                    onClick={() => useStore.getState().clearRecentSearches()}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-1">
                  {recentSearches.slice(0, 5).map((search, index) => (
                    <motion.button
                      key={index}
                      variants={itemVariants}
                      onClick={() => handleRecentSearchClick(search)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center gap-3"
                    >
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="flex-1">{search}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending */}
            <div className="px-4 py-3">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Wireless Earbuds', 'Smart Watch', 'USB-C Hub', 'Mechanical Keyboard', '4K Webcam'].map((trend, index) => (
                  <motion.button
                    key={index}
                    variants={itemVariants}
                    onClick={() => handleSearch(trend)}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {trend}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}