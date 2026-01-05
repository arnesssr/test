import { motion } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';
import { useFilters } from '@/hooks/useFilters';
import { useTrending } from '@/hooks/useRecommendations';
import { ProductGrid } from '@/components/ProductGrid/ProductGrid';
import { FilterPanel } from '@/components/FilterPanel/FilterPanel';

export const HomePage = () => {
  const { data: products = [], isLoading } = useProducts();
  const filteredProducts = useFilters(products);
  const { trending } = useTrending(8);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Discover Premium Products
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Shop the latest trends with AI-powered recommendations
        </p>
      </motion.div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                  <h3 className="text-white font-semibold">{product.name}</h3>
                  <p className="text-white/90">${product.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <FilterPanel products={products} />
        </aside>

        <main className="lg:col-span-3">
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  );
};
