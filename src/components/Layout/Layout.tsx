import { ReactNode } from 'react';
import { Header } from './Header';
import { WhatsAppChat } from '@/components/WhatsAppChat/WhatsAppChat';
import { useStore } from '@/store/useStore';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, RotateCcw, Award } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const isDarkMode = useStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Header />
      <main>{children}</main>
      
      {/* WhatsApp Chat */}
      <WhatsAppChat 
        phoneNumber="+1234567890" 
        message="Hello! I have a question about your products."
      />
      
      {/* Enhanced Footer */}
      <footer className="mt-16 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="container mx-auto px-4 py-12">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Award className="w-8 h-8 mx-auto mb-2 text-primary-500" />
              <h4 className="font-bold text-xl mb-1">50K+</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Truck className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <h4 className="font-bold text-xl mb-1">Free</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Shipping</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <RotateCcw className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <h4 className="font-bold text-xl mb-1">30</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Day Returns</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Shield className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <h4 className="font-bold text-xl mb-1">100%</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Secure</p>
            </motion.div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 dark:text-white">ModernStore</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Your destination for premium products with cutting-edge shopping experience.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.743 0-3.851 2.809-7.398 8.168-7.398 4.292 0 7.632 3.067 7.632 7.164 0 4.272-2.704 7.704-6.44 7.704-1.257 0-2.439-.657-2.84-1.429 0 0-.613 2.347-.76 2.925-.229.881-1.021 1.981-1.512 2.657.586.155 1.212.239 1.873.239 6.624 0 11.98-5.367 11.98-11.98C24.007 5.367 18.641.001 12.017.001z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 dark:text-white">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/products" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">All Products</a></li>
                <li><a href="/new" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">New Arrivals</a></li>
                <li><a href="/trending" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Trending</a></li>
                <li><a href="/deals" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Best Deals</a></li>
                <li><a href="/categories" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Categories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 dark:text-white">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact Us</a></li>
                <li><a href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">FAQs</a></li>
                <li><a href="/shipping" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Shipping</a></li>
                <li><a href="/returns" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Returns</a></li>
                <li><a href="/size-guide" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Size Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 dark:text-white">About</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About Us</a></li>
                <li><a href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Careers</a></li>
                <li><a href="/press" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Press</a></li>
                <li><a href="/reviews" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Reviews</a></li>
                <li><a href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 ModernStore. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};