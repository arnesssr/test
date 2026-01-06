import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

interface MiniCartProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  hideButton?: boolean;
}

export const MiniCart = ({ isOpen: controlledOpen, onOpen, onClose, hideButton }: MiniCartProps) => {
  const { cart, removeFromCart, updateCartQuantity } = useStore();
  const [internalOpen, setInternalOpen] = useState(false);
  const navigate = useNavigate();

  const isOpen = controlledOpen ?? internalOpen;

  const openCart = () => {
    if (controlledOpen === undefined) {
      setInternalOpen(true);
    }
    onOpen?.();
  };

  const closeCart = () => {
    if (controlledOpen === undefined) {
      setInternalOpen(false);
    }
    onClose?.();
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const total = subtotal + (subtotal > 100 ? 0 : 10);

  const handleCheckout = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <>
      {/* Cart Button */}
      {!hideButton && (
        <button
          onClick={openCart}
          className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Open cart"
        >
          <ShoppingBag className="w-6 h-6 dark:text-white" />
          {cart.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
            </motion.span>
          )}
        </button>
      )}

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Your Cart ({cart.reduce((sum, item) => sum + (item.quantity || 1), 0)})
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 dark:text-gray-400" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">Your cart is empty</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Add some products to get started
                  </p>
                  <Link
                    to="/"
                    onClick={closeCart}
                    className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-3"
                    >
                      <Link
                        to={`/product/${item.id}`}
                        onClick={closeCart}
                        className="flex-shrink-0"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.id}`}
                          onClick={closeCart}
                          className="font-semibold dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  Math.max(1, (item.quantity || 1) - 1),
                                  item.selectedColor,
                                  item.selectedSize
                                )
                              }
                              className="w-7 h-7 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3 dark:text-white" />
                            </button>
                            <span className="w-8 text-center font-medium dark:text-white">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  (item.quantity || 1) + 1,
                                  item.selectedColor,
                                  item.selectedSize
                                )
                              }
                              className="w-7 h-7 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3 dark:text-white" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-primary-600 dark:text-primary-400">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t dark:border-gray-700 p-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{subtotal > 100 ? 'Free' : '$10.00'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold dark:text-white pt-3 border-t dark:border-gray-700">
                  <span>Total</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Proceed to Checkout
                </motion.button>

                <button
                  onClick={closeCart}
                  className="w-full text-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
