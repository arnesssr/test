import { TrendingUp, Award, Sparkles, Flame, PackageOpen, Tag } from 'lucide-react';
import { ProductBadge } from '@/types';

interface ProductBadgesProps {
  badges: ProductBadge[];
}

const badgeConfig = {
  'best-seller': {
    label: 'Best Seller',
    icon: Award,
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  },
  'limited-stock': {
    label: 'Limited Stock',
    icon: PackageOpen,
    className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  },
  'new-arrival': {
    label: 'New Arrival',
    icon: Sparkles,
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  'trending': {
    label: 'Trending',
    icon: TrendingUp,
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  'featured': {
    label: 'Featured',
    icon: Flame,
    className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  },
  'sale': {
    label: 'On Sale',
    icon: Tag,
    className: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  },
};

export const ProductBadges = ({ badges }: ProductBadgesProps) => {
  if (!badges || badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => {
        const config = badgeConfig[badge];
        if (!config) return null;

        const Icon = config.icon;

        return (
          <span
            key={badge}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}
          >
            <Icon className="w-3 h-3" />
            {config.label}
          </span>
        );
      })}
    </div>
  );
};
