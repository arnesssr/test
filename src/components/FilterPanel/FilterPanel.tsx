import { useStore } from '@/store/useStore';
import { Product } from '@/types';

interface FilterPanelProps {
  products: Product[];
}

export const FilterPanel = ({ products }: FilterPanelProps) => {
  const { filters, setFilters, resetFilters } = useStore();

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const brands = Array.from(new Set(products.map((p) => p.brand)));
  const colors = Array.from(new Set(products.flatMap((p) => p.colors.map((c) => c.name))));
  const sizes = Array.from(new Set(products.flatMap((p) => p.sizes)));

  const toggleArrayFilter = (key: keyof typeof filters, value: string) => {
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilters({ [key]: updated });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => toggleArrayFilter('categories', category)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t dark:border-gray-700 pt-4">
          <h3 className="font-medium mb-2">Brands</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleArrayFilter('brands', brand)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t dark:border-gray-700 pt-4">
          <h3 className="font-medium mb-2">Price Range</h3>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters({ priceRange: [0, parseInt(e.target.value)] })
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="border-t dark:border-gray-700 pt-4">
          <h3 className="font-medium mb-2">Minimum Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => setFilters({ rating })}
                  className="border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div className="flex items-center space-x-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm">& up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {colors.length > 0 && (
          <div className="border-t dark:border-gray-700 pt-4">
            <h3 className="font-medium mb-2">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {colors.slice(0, 8).map((color) => (
                <button
                  key={color}
                  onClick={() => toggleArrayFilter('colors', color)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    filters.colors.includes(color)
                      ? 'bg-primary-100 dark:bg-primary-900 border-primary-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {sizes.length > 0 && (
          <div className="border-t dark:border-gray-700 pt-4">
            <h3 className="font-medium mb-2">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleArrayFilter('sizes', size)}
                  className={`px-3 py-1 text-sm rounded border ${
                    filters.sizes.includes(size)
                      ? 'bg-primary-100 dark:bg-primary-900 border-primary-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="border-t dark:border-gray-700 pt-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => setFilters({ inStock: e.target.checked })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm">In Stock Only</span>
          </label>
        </div>
      </div>
    </div>
  );
};
