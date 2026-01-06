import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Heart,
  Package,
  LogOut,
  House,
  Grid3x3,
  Layers,
  Tag,
  UserPlus,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useAuthStore } from '../../store/authStore';
import { MiniCart } from '../MiniCart/MiniCart';

export default function Header() {
  const { cart, setAuthOpen, setAuthMode, setMobileSearchOpen, setMobileMenuOpen } = useStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpenLocal] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(count);
  }, [cart]);

  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(mobileMenuOpen);
    }
  }, [mobileMenuOpen, isMobile, setMobileMenuOpen]);

  const handleAuthOpen = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthOpen(true);
    setMobileMenuOpenLocal(false);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setMobileMenuOpenLocal(false);
    window.location.href = '/';
  };

  const mobileMenuVariants: any = {
    closed: {
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut' as const,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a 
                href="/" 
                className="flex items-center gap-2 group"
                aria-label="ModernStore Home"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  ModernStore
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex items-center gap-8" role="navigation" aria-label="Main navigation">
              <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
                Home
              </a>
              <a href="/products" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
                Products
              </a>
              <a href="/categories" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
                Categories
              </a>
              <a href="/deals" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
                Deals
              </a>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden sm:flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Menu */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="User menu"
                    aria-expanded={showUserMenu}
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 py-2 z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                          <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                        
                        <a href="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <User className="w-4 h-4" />
                          Profile
                        </a>
                        
                        <a href="/orders" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <Package className="w-4 h-4" />
                          Orders
                        </a>
                        
                        <a href="/wishlist" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <Heart className="w-4 h-4" />
                          Wishlist
                        </a>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAuthOpen('login')}
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => handleAuthOpen('signup')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Sign up
                  </button>
                </div>
              )}

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    aria-label={`${cartCount} items in cart`}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center gap-3">
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setMobileMenuOpenLocal(!mobileMenuOpen)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            className="fixed inset-0 z-30 sm:hidden bg-black/50"
            onClick={() => setMobileMenuOpenLocal(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed top-0 right-0 z-40 w-full h-full max-w-sm bg-white dark:bg-gray-900 shadow-xl sm:hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Menu</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 space-y-2">
                  <a
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                    onClick={() => setMobileMenuOpenLocal(false)}
                  >
                    <House className="w-5 h-5" />
                    Home
                  </a>
                  
                  <a
                    href="/products"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                    onClick={() => setMobileMenuOpenLocal(false)}
                  >
                    <Grid3x3 className="w-5 h-5" />
                    Products
                  </a>
                  
                  <a
                    href="/categories"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                    onClick={() => setMobileMenuOpenLocal(false)}
                  >
                    <Layers className="w-5 h-5" />
                    Categories
                  </a>
                  
                  <a
                    href="/deals"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                    onClick={() => setMobileMenuOpenLocal(false)}
                  >
                    <Tag className="w-5 h-5" />
                    Deals
                  </a>
                </div>

                <div className="px-4 mt-8">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Account
                  </h3>
                  
                  <div className="space-y-2">
                    {isAuthenticated && user ? (
                      <>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {user.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                        
                        <a
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                          onClick={() => setMobileMenuOpenLocal(false)}
                        >
                          <User className="w-5 h-5" />
                          Profile
                        </a>
                        
                        <a
                          href="/orders"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                          onClick={() => setMobileMenuOpenLocal(false)}
                        >
                          <Package className="w-5 h-5" />
                          Orders
                        </a>
                        
                        <a
                          href="/wishlist"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                          onClick={() => setMobileMenuOpenLocal(false)}
                        >
                          <Heart className="w-5 h-5" />
                          Wishlist
                        </a>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-red-600"
                        >
                          <LogOut className="w-5 h-5" />
                          Sign out
                        </button>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <button
                          onClick={() => handleAuthOpen('login')}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                        >
                          <User className="w-5 h-5" />
                          Sign in
                        </button>
                        
                        <button
                          onClick={() => handleAuthOpen('signup')}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                        >
                          <UserPlus className="w-5 h-5" />
                          Sign up
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Cart ({cartCount} items)</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2)}
                  </span>
                </div>
                
                <button
                  onClick={() => {
                    setCartOpen(true);
                    setMobileMenuOpenLocal(false);
                  }}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  View Cart
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Modals and Overlays */}
      <MiniCart isOpen={cartOpen} onClose={() => setCartOpen(false)} hideButton />
    </>
  );
}
