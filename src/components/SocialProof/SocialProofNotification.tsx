import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ShoppingCart, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SocialProofEvent {
  id: string;
  type: 'purchase' | 'view';
  productName: string;
  location: string;
  time: string;
  image?: string;
}

const mockProducts = [
  'Wireless Headphones',
  'Smart Watch Pro',
  'Bluetooth Speaker',
  'USB-C Cable',
  'Laptop Stand',
  'Mechanical Keyboard',
  'Webcam HD',
  'Mouse Pad XL',
];

const locations = [
  'New York, USA',
  'London, UK',
  'Toronto, Canada',
  'Sydney, Australia',
  'Berlin, Germany',
  'Tokyo, Japan',
  'Paris, France',
  'Mumbai, India',
];

const generateRandomEvent = (): SocialProofEvent => {
  const isPurchase = Math.random() > 0.5;
  const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const time = `${Math.floor(Math.random() * 5) + 1} min ago`;

  return {
    id: `event-${Date.now()}-${Math.random()}`,
    type: isPurchase ? 'purchase' : 'view',
    productName: product,
    location,
    time,
  };
};

export const SocialProofNotification = () => {
  const [currentEvent, setCurrentEvent] = useState<SocialProofEvent | null>(null);

  useEffect(() => {
    // Show first event after 10 seconds
    const initialTimer = setTimeout(() => {
      const newEvent = generateRandomEvent();
      setCurrentEvent(newEvent);

      // Auto-hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setCurrentEvent(null);
      }, 5000);

      return () => clearTimeout(hideTimer);
    }, 10000);

    // Show new events every 30-60 seconds
    const interval = setInterval(() => {
      const newEvent = generateRandomEvent();
      setCurrentEvent(newEvent);

      setTimeout(() => {
        setCurrentEvent(null);
      }, 5000);
    }, Math.random() * 30000 + 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!currentEvent) return null;

  return (
    <AnimatePresence>
      {currentEvent && (
        <motion.div
          initial={{ opacity: 0, x: 400, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 400, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 border dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  {currentEvent.type === 'purchase' ? (
                    <ShoppingCart className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  {currentEvent.type === 'purchase' ? 'Someone purchased' : 'Someone viewed'}{' '}
                  <span className="font-semibold">{currentEvent.productName}</span>
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {currentEvent.location}
                  </p>
                  <span className="text-xs text-gray-400">•</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {currentEvent.time}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCurrentEvent(null)}
                className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-3 pt-3 border-t dark:border-gray-700 flex items-center justify-center gap-1">
              <svg className="w-3 h-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="w-3 h-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="w-3 h-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="w-3 h-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="w-3 h-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">Verified purchases</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
