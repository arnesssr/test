import { Shield, Lock, CreditCard, Award, CheckCircle2 } from 'lucide-react';

export const TrustBadges = () => {
  return (
    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
      <h4 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
        <Shield className="w-4 h-4" />
        Shop with Confidence
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-start gap-2">
          <Lock className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Secure Checkout</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">256-bit SSL encryption</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">30-Day Returns</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">No questions asked</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Multiple Payment</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Cards, PayPal, BNPL</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Award className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Buyer Protection</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Full refund guarantee</p>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-green-200 dark:border-green-800">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <svg className="w-8 h-5" viewBox="0 0 32 20" fill="currentColor">
              <rect width="32" height="20" fill="#1A1F71" rx="2"/>
              <text x="16" y="13" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">VISA</text>
            </svg>
            <svg className="w-8 h-5" viewBox="0 0 32 20" fill="currentColor">
              <rect width="32" height="20" fill="#EB001B" rx="2"/>
              <circle cx="12" cy="10" r="6" fill="#EB001B"/>
              <circle cx="20" cy="10" r="6" fill="#F79E1B"/>
              <path d="M16 5a6 6 0 000 10 6 6 0 000-10z" fill="#FF5F00"/>
            </svg>
            <svg className="w-8 h-5" viewBox="0 0 32 20" fill="currentColor">
              <rect width="32" height="20" fill="#006FCF" rx="2"/>
              <text x="16" y="13" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">AMEX</text>
            </svg>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
            <Lock className="w-3 h-3" />
            <span>SSL Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
};
