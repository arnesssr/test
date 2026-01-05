import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { ShoppingBag, Search, User, Grid3x3, House } from 'lucide-react';
import { useEffect } from 'react';

export default function BottomNavigation() {
  const { activeTab, setActiveTab, cart } = useStore();
  
  const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  useEffect(() => {
    // Sync active tab with current page
    const path = window.location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path.includes('/categories')) setActiveTab('categories');
    else if (path.includes('/search')) setActiveTab('search');
    else if (path.includes('/cart')) setActiveTab('cart');
    else if (path.includes('/profile')) setActiveTab('profile');
  }, []);

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: House,
      path: '/',
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: Grid3x3,
      path: '/categories',
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      path: '/search',
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingBag,
      path: '/cart',
      badge: cartItemCount,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile',
    },
  ];

  const handleTabClick = (tabId: string, path: string) => {
    setActiveTab(tabId as any);
    // Navigate to the path
    window.location.href = path;
  };

  return (
    <nav 
      role="navigation" 
      aria-label="Bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg"
    >
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              onClick={() => handleTabClick(tab.id, tab.path)}
              whileTap={{ scale: 0.9 }}
              className={`
                relative flex flex-col items-center justify-center
                w-full h-full min-h-[44px] px-2
                rounded-lg transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${isActive 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              <motion.div
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
                className="relative"
              >
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                
                {tab.badge && tab.badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    aria-label={`${tab.badge} items in cart`}
                  >
                    {tab.badge}
                  </motion.span>
                )}
              </motion.div>
              
              <span className="text-xs font-medium mt-1">
                {tab.label}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute bottom-0 w-8 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}