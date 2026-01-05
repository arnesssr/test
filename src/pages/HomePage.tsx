import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useFilters } from '@/hooks/useFilters';
import { useTrending } from '@/hooks/useRecommendations';
import { ProductGrid } from '@/components/ProductGrid/ProductGrid';
import { FilterPanel } from '@/components/FilterPanel/FilterPanel';
import { ProductCarousel } from '@/components/Carousel/ProductCarousel';
import { RecentlyViewed } from '@/components/RecentlyViewed/RecentlyViewed';
import { CarouselSkeleton } from '@/components/Skeleton/Skeleton';
import { QuickViewModal } from '@/components/QuickView/QuickViewModal';
import { OneClickReorder } from '@/components/OneClickReorder/OneClickReorder';
import { Sparkles, Shield, Truck, RotateCcw, TrendingUp, Tag, Clock, Award } from 'lucide-react';
import { Product } from '@/types';

export const HomePage = () => {
  const { data: products = [], isLoading } = useProducts();
  const filteredProducts = useFilters(products);
  const { trending } = useTrending(12);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showQuickView, setShowQuickView] = useState(false);

  useEffect(() => {
    // Show newsletter popup after 30 seconds
    const timer = setTimeout(() => {
      if (!localStorage.getItem('newsletterSubscribed')) {
        setShowNewsletter(true);
      }
    }, 30000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleNewsletterSubmit = () => {
    if (email && email.includes('@')) {
      localStorage.setItem('newsletterSubscribed', 'true');
      setShowNewsletter(false);
      alert('Thank you for subscribing! Check your email for a welcome discount.');
    }
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <CarouselSkeleton />
            <div className="mt-8 space-y-8">
              <CarouselSkeleton />
              <CarouselSkeleton />
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const featuredProducts = products.filter(p => p.tags.includes('featured'));
  const dealProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);
  const newProducts = products.slice(0, 8);

  const categories = [
    { name: 'Electronics', icon: '💻', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' },
    { name: 'Fashion', icon: '👗', color: 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300' },
    { name: 'Home & Garden', icon: '🏠', color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' },
    { name: 'Sports', icon: '⚽', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300' },
    { name: 'Books', icon: '📚', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' },
    { name: 'Toys', icon: '🎮', color: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' },
    { name: 'Beauty', icon: '💄', color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300' },
    { name: 'Food', icon: '🍔', color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16 md:py-24 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Amazing Products
            <span className="block text-yellow-300">Up to 50% Off!</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Shop the latest trends with AI-powered recommendations and exclusive deals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition-shadow"
              onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors"
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Categories
            </motion.button>
          </div>
        </motion.div>
        
        {/* Floating elements for visual appeal */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-10 text-6xl opacity-20"
        >
          🛍️
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 right-10 text-6xl opacity-20"
        >
          🎁
        </motion.div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <div className={`${category.color} p-6 rounded-xl text-center transition-colors duration-200`}>
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="font-semibold">{category.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 dark:text-white">Free Shipping</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">On orders over $75</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 dark:text-white">Secure Payment</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 dark:text-white">Easy Returns</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 dark:text-white">Best Quality</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Premium products only</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Featured Products Carousel */}
        <section id="featured" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              Featured Products
            </h2>
            <a href="/products" className="text-primary-600 hover:text-primary-700 font-medium">
              View All →
            </a>
          </div>
          <ProductCarousel title="" products={featuredProducts.length > 0 ? featuredProducts : products.slice(0, 8)} onQuickView={handleQuickView} />
        </section>

        {/* Deals Carousel */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold dark:text-white flex items-center gap-2">
              <Tag className="w-6 h-6 text-red-500" />
              Best Deals
            </h2>
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Limited Time
            </span>
          </div>
          <ProductCarousel
            title=""
            products={dealProducts.length > 0 ? dealProducts : products.filter(p => p.originalPrice).slice(0, 8)}
            onQuickView={handleQuickView}
          />
        </section>

        {/* New Arrivals */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold dark:text-white flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-500" />
              New Arrivals
            </h2>
            <a href="/new" className="text-primary-600 hover:text-primary-700 font-medium">
              View All →
            </a>
          </div>
          <ProductCarousel title="" products={newProducts} onQuickView={handleQuickView} />
        </section>

        {/* Trending Products */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold dark:text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              Trending Now
            </h2>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Hot
            </span>
          </div>
          <ProductCarousel title="" products={trending} onQuickView={handleQuickView} />
        </section>

        {/* Product Grid Section */}
        <OneClickReorder />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <aside className="lg:col-span-1">
            <FilterPanel products={products} />
          </aside>

          <main className="lg:col-span-3">
            <ProductGrid products={filteredProducts} onQuickView={handleQuickView} />
          </main>
        </div>

        <RecentlyViewed />
      </div>

      {/* Newsletter Popup */}
      <AnimatePresence>
        {showNewsletter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">
                  Get 15% Off Your First Order!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Subscribe to our newsletter and get exclusive deals delivered to your inbox.
                </p>
              </div>
              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={handleNewsletterSubmit}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                >
                  Subscribe & Get Discount
                </button>
                <button
                  onClick={() => setShowNewsletter(false)}
                  className="w-full text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  No thanks, I don't like discounts
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={showQuickView}
        onClose={() => {
          setShowQuickView(false);
          setQuickViewProduct(null);
        }}
      />
    </div>
  );
};
