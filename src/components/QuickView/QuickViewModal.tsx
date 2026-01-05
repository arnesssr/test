import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/store/useStore';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, addToWishlist, wishlist } = useStore();

  if (!product) return null;

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full my-8 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                  <h2 className="text-xl font-bold dark:text-white">Quick View</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 dark:text-gray-400" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Images */}
                    <div className="space-y-4">
                      <div className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                        <img
                          src={product.images[selectedImage]}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {product.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                              selectedImage === index
                                ? 'border-primary-500'
                                : 'border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${product.name} - ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
                        <h3 className="text-2xl font-bold dark:text-white mt-1">{product.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
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
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {product.rating} ({product.reviewCount} reviews)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Color Selection */}
                      {product.colors.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                            Color: {selectedColor}
                          </label>
                          <div className="flex gap-2">
                            {product.colors.map((color) => (
                              <button
                                key={color.name}
                                onClick={() => setSelectedColor(color.name)}
                                className={`w-10 h-10 rounded-full border-2 transition-all ${
                                  selectedColor === color.name
                                    ? 'border-primary-500 scale-110'
                                    : 'border-gray-300 dark:border-gray-600'
                                }`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Size Selection */}
                      {product.sizes.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                            Size: {selectedSize}
                          </label>
                          <div className="flex gap-2 flex-wrap">
                            {product.sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                                  selectedSize === size
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-gray-300 dark:border-gray-600'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quantity */}
                      <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                          Quantity
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-medium dark:text-white">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            +
                          </button>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {product.stock} in stock
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-4 border-t dark:border-gray-700">
                        <button
                          onClick={handleAddToCart}
                          disabled={product.stock === 0}
                          className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => addToWishlist(product)}
                          className={`p-3 rounded-lg border transition-colors ${
                            isInWishlist
                              ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-500'
                              : 'border-gray-300 dark:border-gray-600 hover:border-red-500'
                          }`}
                          aria-label="Add to wishlist"
                        >
                          <svg className="w-6 h-6" fill={isInWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
