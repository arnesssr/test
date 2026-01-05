import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import BottomNavigation from './BottomNavigation';
import MobileSearchOverlay from './MobileSearchOverlay';
import MobileCategorySheet from './MobileCategorySheet';
import FloatingSearchButton from './FloatingSearchButton';

interface BottomNavContextType {
  showBottomNav: () => void;
  hideBottomNav: () => void;
  isBottomNavVisible: boolean;
}

const BottomNavContext = createContext<BottomNavContextType | null>(null);

export const useBottomNav = () => {
  const context = useContext(BottomNavContext);
  if (!context) {
    throw new Error('useBottomNav must be used within a BottomNavProvider');
  }
  return context;
};

interface BottomNavProviderProps {
  children: ReactNode;
}

export default function BottomNavProvider({ children }: BottomNavProviderProps) {
  const {
    activeTab,
    mobileSearchOpen,
    mobileCategoryOpen,
    setMobileSearchOpen,
    setMobileCategoryOpen,
    setActiveTab,
  } = useStore();

  // Handle deep linking and URL sync
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      
      if (path === '/' || hash === '#home') {
        setActiveTab('home');
      } else if (path.includes('/categories') || hash === '#categories') {
        setActiveTab('categories');
      } else if (path.includes('/search') || hash === '#search' || mobileSearchOpen) {
        setActiveTab('search');
      } else if (path.includes('/cart') || hash === '#cart') {
        setActiveTab('cart');
      } else if (path.includes('/profile') || path.includes('/login') || hash === '#profile') {
        setActiveTab('profile');
      }
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, [setActiveTab, mobileSearchOpen]);

  // Disable body scroll when overlays are open
  useEffect(() => {
    if (mobileSearchOpen || mobileCategoryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileSearchOpen, mobileCategoryOpen]);

  const showBottomNav = () => {
    // Implementation would handle showing the bottom nav
  };

  const hideBottomNav = () => {
    // Implementation would handle hiding the bottom nav
  };

  const contextValue: BottomNavContextType = {
    showBottomNav,
    hideBottomNav,
    isBottomNavVisible: true,
  };

  return (
    <BottomNavContext.Provider value={contextValue}>
      {children}
      
      {/* Mobile Navigation Components */}
      <div className="sm:hidden">
        <BottomNavigation />
        <FloatingSearchButton />
        <MobileSearchOverlay />
        <MobileCategorySheet />
      </div>
      
      {/* Add bottom padding to account for fixed navigation */}
      <div className="h-16 sm:hidden" />
    </BottomNavContext.Provider>
  );
}