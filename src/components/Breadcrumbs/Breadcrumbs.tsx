import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6 overflow-x-auto pb-2">
      <Link
        to="/"
        className="flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex-shrink-0"
      >
        <Home className="w-4 h-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export const ProductBreadcrumbs = ({ product }: { product: { category: string; subcategory: string; name: string } }) => {
  return (
    <Breadcrumbs
      items={[
        { label: product.category, href: `/category/${product.category.toLowerCase()}` },
        { label: product.subcategory, href: `/category/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}` },
        { label: product.name },
      ]}
    />
  );
};
