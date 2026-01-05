import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const { addToCart, addToWishlist, wishlist } = useStore();
  const isInWishlist = wishlist.some((item) => item.product.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    onQuickView?.(product);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl transition-all overflow-hidden"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </div>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
              Low Stock
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold">Out of Stock</span>
            </div>
          )}
          <button
            onClick={handleQuickView}
            className="absolute bottom-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110"
            title="Quick View"
          >
            <Eye className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {product.brand}
          </p>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 h-10">
            {product.name}
          </h3>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-lg border transition-colors ${
                isInWishlist
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-500'
                  : 'border-gray-300 dark:border-gray-600 hover:border-red-500 hover:text-red-500'
              }`}
              aria-label="Add to wishlist"
            >
              <svg className="w-5 h-5" fill={isInWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
