import { Truck, Package, Clock, CheckCircle } from 'lucide-react';
import { ShippingInfo } from '@/types';

interface ShippingInfoDisplayProps {
  shippingInfo: ShippingInfo;
}

export const ShippingInfoDisplay = ({ shippingInfo }: ShippingInfoDisplayProps) => {
  const [minDays, maxDays] = shippingInfo.estimatedDays;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h4 className="font-semibold text-gray-900 dark:text-white">Shipping & Delivery</h4>
      </div>

      <div className="flex items-start gap-2">
        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {shippingInfo.freeShipping ? 'FREE Shipping' : `$${shippingInfo.cost} Shipping`}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Estimated delivery: {minDays}–{maxDays} business days
          </div>
        </div>
      </div>

      {shippingInfo.methods && shippingInfo.methods.length > 0 && (
        <div className="border-t border-blue-200 dark:border-blue-800 pt-3 mt-3">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Other shipping options:</div>
          <div className="space-y-2">
            {shippingInfo.methods.map((method, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <Package className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-gray-900 dark:text-white font-medium">{method.name}</span> – $
                  {method.cost.toFixed(2)}
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {method.estimatedDays[0]}–{method.estimatedDays[1]} days
                    {method.description && ` • ${method.description}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
