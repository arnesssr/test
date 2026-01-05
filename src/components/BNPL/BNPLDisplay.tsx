import { Clock, CreditCard } from 'lucide-react';

interface BNPLDisplayProps {
  price: number;
  installments?: number;
  provider?: string;
}

export const BNPLDisplay = ({ 
  price, 
  installments = 4, 
  provider = 'Klarna' 
}: BNPLDisplayProps) => {
  const installmentAmount = price / installments;

  return (
    <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <span className="text-sm font-medium text-purple-800 dark:text-purple-300">
          Or {installments} payments of
        </span>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">
          ${installmentAmount.toFixed(2)}
        </span>
        <span className="text-sm text-purple-600 dark:text-purple-400">with {provider}</span>
      </div>
      <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
        0% interest. No hidden fees.
      </p>
    </div>
  );
};

export const BNPLBadge = ({ price }: { price: number }) => {
  return (
    <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-medium rounded-full">
      <CreditCard className="w-3 h-3" />
      <span>4 payments of ${(price / 4).toFixed(2)}</span>
    </div>
  );
};
