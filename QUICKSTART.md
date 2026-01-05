# Quick Start Guide

Get up and running with ModernStore in under 5 minutes!

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation

1. **Clone and Install**
```bash
git clone <repository-url>
cd modern-storefront
npm install --legacy-peer-deps
```

> **Note**: The `--legacy-peer-deps` flag is required for React Three Fiber compatibility.

2. **Start Development Server**
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## First Steps

### Explore the UI
1. Browse 120+ products on the home page
2. Try the AI-powered search (⌘K or Ctrl+K)
3. Click any product to see 3D visualization
4. Toggle between 2D and 3D views
5. Add items to cart, wishlist, or comparison

### Test Key Features

#### Search
- Press `⌘K` / `Ctrl+K` to open search
- Type "tech" or any product name
- See autocomplete suggestions
- Click on results to view products

#### Filters
- Use the left sidebar on home page
- Select categories, brands
- Adjust price range
- Filter by rating, color, size

#### 3D Viewer
- Open any product detail page
- Click "3D View" button
- Drag to rotate
- Scroll to zoom

#### Shopping
- Add products to cart
- Adjust quantities for volume pricing
- Add to wishlist (heart icon)
- Compare products (compare icon)

#### Dark Mode
- Click moon/sun icon in header
- Theme persists across sessions

## Project Overview

### Key Technologies
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Three.js** - 3D graphics
- **Zustand** - Lightweight state management
- **React Query** - Data fetching and caching

### Project Structure
```
src/
├── components/        # UI components
│   ├── ProductGrid/   # Product listing
│   ├── ProductDetail/ # Product detail view
│   ├── ThreeDViewer/  # 3D visualization
│   ├── SearchBar/     # AI search
│   ├── FilterPanel/   # Filtering UI
│   ├── ShoppingCart/  # Cart management
│   └── ...
├── hooks/             # React hooks
├── store/             # State management
├── services/          # Business logic
├── types/             # TypeScript types
├── data/              # Mock products
└── pages/             # Route pages
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server at localhost:5173

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # TypeScript type checking
```

## Development Tips

### Hot Module Replacement
Changes to any component automatically update in the browser without full reload.

### TypeScript
- All files use TypeScript
- Strict mode enabled
- Types defined in `src/types/index.ts`

### Styling
- Use Tailwind utility classes
- Dark mode: `dark:` prefix
- Responsive: `sm:`, `md:`, `lg:`, `xl:` prefixes

### State Management
Access global state:
```tsx
import { useStore } from '@/store/useStore';

const { cart, addToCart } = useStore();
```

### Data Fetching
```tsx
import { useProducts } from '@/hooks/useProducts';

const { data: products, isLoading } = useProducts();
```

## Common Tasks

### Add a New Page
1. Create file in `src/pages/`
2. Add route in `src/App.tsx`

### Create a Component
1. Create folder in `src/components/`
2. Add TypeScript types
3. Use Tailwind for styling

### Modify Mock Data
Edit `src/data/mockProducts.ts` to change products.

### Customize Theme
Update `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: { ... }
    }
  }
}
```

## Troubleshooting

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### TypeScript Errors
```bash
npm run lint
```

## Next Steps

1. **Explore Features**: Check `docs/FEATURES.md` for detailed feature docs
2. **API Integration**: See `docs/API_INTEGRATION.md` to connect to backend
3. **Customize**: Modify colors, fonts, and branding
4. **Deploy**: Build and deploy to Vercel, Netlify, or your platform

## Resources

- [Full Documentation](./README.md)
- [API Integration Guide](./docs/API_INTEGRATION.md)
- [Feature Documentation](./docs/FEATURES.md)
- [Contributing Guide](./CONTRIBUTING.md)

## Support

Need help? Open an issue or check existing documentation.

Happy coding! 🚀
