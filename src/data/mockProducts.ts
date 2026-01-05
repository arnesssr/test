import { Product } from '@/types';

const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Toys'];
const brands = ['TechPro', 'StyleHub', 'HomeEssentials', 'FitGear', 'ReadMore', 'PlayTime', 'LuxeBrand', 'EcoChoice'];
const colors = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Red', hex: '#EF4444' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Green', hex: '#10B981' },
  { name: 'Gray', hex: '#6B7280' },
  { name: 'Navy', hex: '#1E3A8A' },
  { name: 'Pink', hex: '#EC4899' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const generateProduct = (id: number): Product => {
  const category = categories[id % categories.length];
  const brand = brands[id % brands.length];
  const basePrice = Math.round((Math.random() * 500 + 20) * 100) / 100;
  const hasDiscount = Math.random() > 0.7;
  
  return {
    id: `prod-${id}`,
    name: `${brand} ${category} Item ${id}`,
    description: `Premium ${category.toLowerCase()} product with exceptional quality and design. Features advanced technology and sustainable materials. Perfect for everyday use and special occasions.`,
    price: hasDiscount ? Math.round(basePrice * 0.8 * 100) / 100 : basePrice,
    originalPrice: hasDiscount ? basePrice : undefined,
    category,
    subcategory: `${category} Sub ${(id % 3) + 1}`,
    brand,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 500 + 10),
    images: [
      `https://picsum.photos/seed/${id}-1/800/800`,
      `https://picsum.photos/seed/${id}-2/800/800`,
      `https://picsum.photos/seed/${id}-3/800/800`,
      `https://picsum.photos/seed/${id}-4/800/800`,
    ],
    colors: colors.slice(0, Math.floor(Math.random() * 4) + 2),
    sizes: category === 'Fashion' ? sizes.slice(0, Math.floor(Math.random() * 4) + 3) : [],
    stock: Math.floor(Math.random() * 100 + 10),
    tags: [
      'Bestseller',
      'New Arrival',
      'Eco-Friendly',
      'Premium',
      'Limited Edition',
    ].slice(0, Math.floor(Math.random() * 3) + 1),
    features: [
      'High-quality materials',
      'Durable construction',
      'Modern design',
      'Easy to use',
      'Warranty included',
      'Fast shipping',
    ].slice(0, Math.floor(Math.random() * 4) + 2),
    specifications: {
      Material: ['Cotton', 'Polyester', 'Metal', 'Plastic', 'Wood'][id % 5],
      Weight: `${Math.round(Math.random() * 5 + 0.5)}kg`,
      Dimensions: `${Math.round(Math.random() * 50 + 10)}x${Math.round(Math.random() * 50 + 10)}x${Math.round(Math.random() * 30 + 5)}cm`,
      Origin: ['USA', 'Germany', 'Japan', 'Italy', 'China'][id % 5],
    },
    volumePricing: [
      { quantity: 1, price: basePrice, discount: 0 },
      { quantity: 5, price: Math.round(basePrice * 0.95 * 100) / 100, discount: 5 },
      { quantity: 10, price: Math.round(basePrice * 0.9 * 100) / 100, discount: 10 },
      { quantity: 20, price: Math.round(basePrice * 0.85 * 100) / 100, discount: 15 },
    ],
  };
};

export const mockProducts: Product[] = Array.from({ length: 120 }, (_, i) => generateProduct(i + 1));

export const featuredProducts = mockProducts.slice(0, 8);
export const trendingProducts = mockProducts.slice(8, 16);
export const newArrivals = mockProducts.slice(16, 24);
