import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Product, ProductBadge, ShippingInfo } from '@/types';
import { useStore } from '@/store/useStore';
import { ProductBadges } from '../ProductBadges/ProductBadges';
import { ShippingInfoDisplay } from '../ShippingInfo/ShippingInfoDisplay';
import { ShareProduct } from '../ShareProduct/ShareProduct';
import { BulkQuoteModal } from '../BulkQuote/BulkQuoteModal';
import { TrustBadges } from '../TrustBadges/TrustBadges';
import { BNPLDisplay } from '../BNPL/BNPLDisplay';
import { InventoryIndicator } from '../InventoryIndicator/InventoryIndicator';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [showVolumePrice, setShowVolumePrice] = useState(false);
  const [showBulkQuote, setShowBulkQuote] = useState(false);

  const { addToCart, addToWishlist, addToComparison, wishlist, comparisonList } = useStore();

  const isInWishlist = wishlist.some((item) => item.id === product.id);
  const isInComparison = comparisonList.some((p) => p.id === product.id);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const derivedBadges = useMemo(() => {
    const badges = new Set<ProductBadge>(product.badges || []);

    if (product.tags.includes('featured')) badges.add('featured');

    if (product.originalPrice && product.originalPrice > product.price) {
      badges.add('sale');
    }

    if (product.rating >= 4.6 && product.reviewCount >= 250) badges.add('best-seller');

    if (product.stock > 0 && product.stock < 10) badges.add('limited-stock');

    return Array.from(badges);
  }, [product]);

  const shippingInfo = useMemo<ShippingInfo>(() => {
    if (product.shippingInfo) return product.shippingInfo;

    const freeShipping = product.price >= 75;
    return {
      freeShipping,
      estimatedDays: [3, 7],
      cost: freeShipping ? 0 : 9.99,
      methods: [
        {
          name: 'Standard',
          cost: freeShipping ? 0 : 9.99,
          estimatedDays: [3, 7],
          description: 'Reliable delivery',
        },
        {
          name: 'Express',
          cost: 19.99,
          estimatedDays: [1, 3],
          description: 'Faster delivery',
        },
      ],
    };
  }, [product]);

  const currentVolumePrice = product.volumePricing?.find(
    (vp) => quantity >= vp.quantity
  );

  const effectivePrice = currentVolumePrice?.price || product.price;
  const volumeDiscount = currentVolumePrice?.discount || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <motion.div
          className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedImage(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {product.brand}
          </p>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
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
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <ProductBadges badges={derivedBadges} />

            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-b dark:border-gray-700 py-4">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
              ${(effectivePrice * quantity).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                ${(product.originalPrice * quantity).toFixed(2)}
              </span>
            )}
            {volumeDiscount > 0 && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm font-medium rounded">
                Save {volumeDiscount}%
              </span>
            )}
          </div>
          {product.volumePricing && product.volumePricing.length > 0 && (
            <button
              onClick={() => setShowVolumePrice(!showVolumePrice)}
              className="mt-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              View volume pricing
            </button>
          )}
          <AnimatePresence>
            {showVolumePrice && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                  {product.volumePricing?.map((vp) => (
                    <div
                      key={vp.quantity}
                      className="flex justify-between text-sm"
                    >
                      <span>Buy {vp.quantity}+</span>
                      <span className="font-medium">
                        ${vp.price} each ({vp.discount}% off)
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          {product.colors.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">
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

          {product.sizes.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Size: {selectedSize}
              </label>
              <div className="flex gap-2">
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

          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                +
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.stock} in stock
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Add to Cart
            </motion.button>
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
            <button
              onClick={() => addToComparison(product)}
              disabled={isInComparison || comparisonList.length >= 4}
              className={`p-3 rounded-lg border transition-colors ${
                isInComparison
                  ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-500'
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
              }`}
              aria-label="Add to comparison"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-gray-900 py-3 rounded-lg font-medium transition-colors"
            >
              Buy Now
            </motion.button>
            <button
              onClick={() => setShowBulkQuote(true)}
              className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 py-3 rounded-lg font-medium transition-colors dark:text-white"
            >
              Request Bulk Quote
            </button>
          </div>

          <ShippingInfoDisplay shippingInfo={shippingInfo} />
          <ShareProduct />
          <TrustBadges />
          <BNPLDisplay price={effectivePrice * quantity} />
          <InventoryIndicator stock={product.stock} />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-3">Description</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {product.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Features</h2>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Specifications</h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BulkQuoteModal
        isOpen={showBulkQuote}
        onClose={() => setShowBulkQuote(false)}
        productId={product.id}
        initialQuantity={quantity}
        onSubmit={() => alert('Quote request submitted! We will contact you within 24 hours.')}
      />
    </div>
  );
};
