import { useStore } from '@/store/useStore';
import { Link } from 'react-router-dom';

export const Comparison = () => {
  const { comparisonList, removeFromComparison, clearComparison } = useStore();

  if (comparisonList.length === 0) {
    return (
      <div className="text-center py-16">
        <svg
          className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <h2 className="text-2xl font-bold mb-2">No products to compare</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Add products to compare features and specifications
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const allSpecs = Array.from(
    new Set(
      comparisonList.flatMap((p) => Object.keys(p.specifications))
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Compare Products ({comparisonList.length}/4)</h1>
        <button
          onClick={clearComparison}
          className="text-sm text-red-600 dark:text-red-400 hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="p-4 text-left font-semibold">Product</th>
              {comparisonList.map((product) => (
                <th key={product.id} className="p-4">
                  <div className="relative">
                    <button
                      onClick={() => removeFromComparison(product.id)}
                      className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-600"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                    </Link>
                    <h3 className="font-semibold mt-2 text-sm">{product.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.brand}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:border-gray-700">
              <td className="p-4 font-medium">Price</td>
              {comparisonList.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    ${product.price}
                  </span>
                </td>
              ))}
            </tr>
            <tr className="border-b dark:border-gray-700">
              <td className="p-4 font-medium">Rating</td>
              {comparisonList.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviewCount})</span>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-b dark:border-gray-700">
              <td className="p-4 font-medium">Category</td>
              {comparisonList.map((product) => (
                <td key={product.id} className="p-4 text-center text-sm">
                  {product.category}
                </td>
              ))}
            </tr>
            <tr className="border-b dark:border-gray-700">
              <td className="p-4 font-medium">Stock</td>
              {comparisonList.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
              ))}
            </tr>
            {allSpecs.map((spec) => (
              <tr key={spec} className="border-b dark:border-gray-700">
                <td className="p-4 font-medium">{spec}</td>
                {comparisonList.map((product) => (
                  <td key={product.id} className="p-4 text-center text-sm">
                    {product.specifications[spec] || '-'}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-4 font-medium">Features</td>
              {comparisonList.map((product) => (
                <td key={product.id} className="p-4">
                  <ul className="text-sm space-y-1 text-left">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
