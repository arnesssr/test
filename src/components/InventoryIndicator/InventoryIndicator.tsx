import { AlertTriangle, Package, CheckCircle, Clock } from 'lucide-react';

interface InventoryIndicatorProps {
  stock: number;
  lowStockThreshold?: number;
}

export const InventoryIndicator = ({ 
  stock, 
  lowStockThreshold = 10 
}: InventoryIndicatorProps) => {
  if (stock === 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-red-800 dark:text-red-300">Out of Stock</p>
          <p className="text-xs text-red-600 dark:text-red-400">Expected back in 2-3 weeks</p>
        </div>
      </div>
    );
  }

  if (stock <= lowStockThreshold) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg animate-pulse">
        <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
            Only {stock} left in stock!
          </p>
          <p className="text-xs text-orange-600 dark:text-orange-400">Order soon to avoid disappointment</p>
        </div>
      </div>
    );
  }

  if (stock <= 50) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <Package className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
            Low stock - {stock} remaining
          </p>
          <p className="text-xs text-yellow-600 dark:text-yellow-400">Don't miss out</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
      <div>
        <p className="text-sm font-medium text-green-800 dark:text-green-300">
          In Stock - Ready to ship
        </p>
        <p className="text-xs text-green-600 dark:text-green-400">Order today for fast delivery</p>
      </div>
    </div>
  );
};

export const BackInStockIndicator = ({ restockDate }: { restockDate: string }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
      <div>
        <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Back in Stock</p>
        <p className="text-xs text-blue-600 dark:text-blue-400">Available by {restockDate}</p>
      </div>
    </div>
  );
};
