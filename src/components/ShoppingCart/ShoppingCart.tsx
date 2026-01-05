import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';

export const ShoppingCart = () => {
  const {
    cart,
    savedForLater,
    appliedCoupon,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    moveToSavedForLater,
    moveToCart,
    removeSavedForLater,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponCode, setCouponCode] = useState('');

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const coupons = [
    {
      code: 'WELCOME10',
      type: 'percentage' as const,
      value: 10,
      minPurchase: 50,
      description: '10% off orders $50+',
    },
    {
      code: 'SAVE15',
      type: 'percentage' as const,
      value: 15,
      minPurchase: 100,
      description: '15% off orders $100+',
    },
    {
      code: 'FREESHIP',
      type: 'fixed' as const,
      value: 0,
      minPurchase: 0,
      description: 'Free standard shipping',
    },
  ];

  const couponDiscount = (() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.code === 'FREESHIP') return 0;

    if (appliedCoupon.type === 'percentage') {
      return subtotal * (appliedCoupon.value / 100);
    }

    return Math.min(subtotal, appliedCoupon.value);
  })();

  const discountedSubtotal = Math.max(0, subtotal - couponDiscount);
  const tax = discountedSubtotal * 0.1;

  const baseShipping = subtotal > 100 ? 0 : 10;
  const shipping = appliedCoupon?.code === 'FREESHIP' ? 0 : baseShipping;

  const total = discountedSubtotal + tax + shipping;

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    const found = coupons.find((c) => c.code === code);
    if (!found) {
      alert('Invalid coupon code');
      return;
    }

    if (found.minPurchase && subtotal < found.minPurchase) {
      alert(`This coupon requires a minimum purchase of ${found.minPurchase}`);
      return;
    }

    applyCoupon(found);
    setCouponCode('');
  };

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div className="text-center py-16">
        <svg
          className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Add some products to get started
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Shopping Cart ({cart.length} items)</h1>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            Clear Cart
          </button>
        </div>

        <AnimatePresence>
          {cart.map((item) => (
            <motion.div
              key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
            >
              <div className="flex gap-4">
                <Link to={`/product/${item.product.id}`}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                </Link>

                <div className="flex-1">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="font-semibold hover:text-primary-600 dark:hover:text-primary-400">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {item.product.brand}
                  </p>
                  <div className="flex gap-4 mt-2 text-sm">
                    {item.selectedColor && (
                      <span className="text-gray-600 dark:text-gray-400">
                        Color: {item.selectedColor}
                      </span>
                    )}
                    {item.selectedSize && (
                      <span className="text-gray-600 dark:text-gray-400">
                        Size: {item.selectedSize}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => moveToSavedForLater(item.product.id)}
                        className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        Save for later
                      </button>
                      <span className="text-lg font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-600"
                        aria-label="Remove"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {savedForLater.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Saved for Later ({savedForLater.length})</h2>
            <div className="space-y-3">
              {savedForLater.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex gap-4"
                >
                  <Link to={`/product/${item.product.id}`}>
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/product/${item.product.id}`}>
                      <h3 className="font-semibold hover:text-primary-600 dark:hover:text-primary-400 dark:text-white">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.product.brand}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => moveToCart(item.product.id)}
                        className="text-sm bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => removeSavedForLater(item.product.id)}
                        className="text-sm text-red-600 dark:text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <span className="text-lg font-bold dark:text-white">${item.product.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-20">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Order Summary</h2>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Promo code</span>
            </div>

            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-3 py-2">
                <div>
                  <div className="text-sm font-semibold text-green-800 dark:text-green-200">
                    {appliedCoupon.code}
                  </div>
                  {appliedCoupon.description && (
                    <div className="text-xs text-green-700 dark:text-green-300">
                      {appliedCoupon.description}
                    </div>
                  )}
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-sm text-green-700 dark:text-green-200 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm"
                >
                  Apply
                </button>
              </div>
            )}

            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Try: WELCOME10, SAVE15, FREESHIP
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="font-medium dark:text-white">${subtotal.toFixed(2)}</span>
            </div>

            {couponDiscount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Discount</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  -${couponDiscount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
              <span className="font-medium dark:text-white">${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Shipping</span>
              <span className="font-medium dark:text-white">
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            {appliedCoupon?.code !== 'FREESHIP' && subtotal < 100 && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Add ${(100 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}

            <div className="border-t dark:border-gray-700 pt-3 flex justify-between text-lg font-bold">
              <span className="dark:text-white">Total</span>
              <span className="dark:text-white">${total.toFixed(2)}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors"
            onClick={() => alert('Checkout flow is a demo. Add a backend/payment provider to complete orders.')}
          >
            Proceed to Checkout
          </motion.button>

          <Link
            to="/"
            className="block text-center text-sm text-primary-600 dark:text-primary-400 hover:underline mt-4"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
      )}
    </div>
  );
};
