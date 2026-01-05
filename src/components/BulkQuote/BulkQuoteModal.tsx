import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Building2, Mail, Hash, MessageSquare } from 'lucide-react';
import { BulkQuoteRequest } from '@/types';

interface BulkQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  initialQuantity?: number;
  onSubmit?: (request: BulkQuoteRequest) => void;
}

export const BulkQuoteModal = ({
  isOpen,
  onClose,
  productId,
  initialQuantity = 10,
  onSubmit,
}: BulkQuoteModalProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!email.includes('@') || quantity < 1) return;

    const payload: BulkQuoteRequest = {
      productId,
      quantity,
      email,
      company: company.trim() || undefined,
      message: message.trim() || undefined,
    };

    onSubmit?.(payload);
    onClose();

    setEmail('');
    setCompany('');
    setMessage('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold dark:text-white">Request a Bulk Quote</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-300" />
              </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Buying in bulk? Send a quote request and we’ll get back with pricing, lead time, and shipping options.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Quantity</label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Company (optional)</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company name"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Message (optional)</label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us your target price, destination, needed delivery date…"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white h-24"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium"
                >
                  Submit
                </button>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                This is a demo workflow (no backend). Requests are stored only in your session.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
