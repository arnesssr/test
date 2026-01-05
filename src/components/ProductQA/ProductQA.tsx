import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ThumbsUp, User, Send, ShieldCheck } from 'lucide-react';
import { ProductQuestion } from '@/types';
import { cn } from '@/lib/utils';

interface ProductQAProps {
  productId: string;
  sellerName?: string;
}

const storageKey = (productId: string) => `product-qa:${productId}`;

const generateSeedQuestions = (productId: string, sellerName?: string): ProductQuestion[] => {
  const seed = productId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const questions = [
    {
      q: 'Is this item covered by a warranty?',
      a: 'Yes — it includes a 12-month limited warranty. Please keep your receipt.',
    },
    {
      q: 'Does this come with all accessories shown in the pictures?',
      a: 'It ships with the standard accessories listed in the product description. Photos may include optional add-ons.',
    },
    {
      q: 'Can I return this if it doesn\'t fit/meet expectations?',
      a: 'Yes — we offer a 30-day return policy for unused items in original packaging.',
    },
    {
      q: 'How fast can you ship this?',
      a: 'Most orders ship within 24–48 hours. Delivery speed depends on your selected shipping method.',
    },
  ];

  const picked = [questions[seed % questions.length], questions[(seed + 1) % questions.length]];

  return picked.map((item, idx) => ({
    id: `seed-${productId}-${idx}`,
    userId: 'seed-user',
    userName: ['Alex', 'Jordan', 'Sam', 'Taylor'][(seed + idx) % 4],
    question: item.q,
    date: new Date(Date.now() - (idx + 2) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    answer: {
      text: item.a,
      answeredBy: sellerName ? `${sellerName} (Seller)` : 'Seller',
      date: new Date(Date.now() - (idx + 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    },
    helpful: (seed + idx) % 12,
  }));
};

export const ProductQA = ({ productId, sellerName }: ProductQAProps) => {
  const [questions, setQuestions] = useState<ProductQuestion[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState('');

  const initial = useMemo(() => generateSeedQuestions(productId, sellerName), [productId, sellerName]);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey(productId));
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as ProductQuestion[];
        setQuestions(parsed);
        return;
      } catch {
        // ignore
      }
    }
    setQuestions(initial);
  }, [initial, productId]);

  useEffect(() => {
    if (questions.length === 0) return;
    localStorage.setItem(storageKey(productId), JSON.stringify(questions.slice(0, 50)));
  }, [productId, questions]);

  const handleAsk = () => {
    if (!draft.trim()) return;

    const q: ProductQuestion = {
      id: `q-${Date.now()}`,
      userId: 'current-user',
      userName: 'You',
      question: draft.trim(),
      date: new Date().toLocaleDateString(),
      helpful: 0,
    };

    setQuestions((prev) => [q, ...prev]);
    setDraft('');
    setShowForm(false);
  };

  const markHelpful = (id: string) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, helpful: q.helpful + 1 } : q)));
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-primary-600" />
          Customer Q&A
        </h2>

        <button
          onClick={() => setShowForm((v) => !v)}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          Ask a question
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6"
          >
            <label className="block text-sm font-medium mb-2 dark:text-white">
              Your question
            </label>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white h-24"
              placeholder="Ask about sizing, shipping, compatibility, warranty…"
            />
            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAsk}
                className={cn(
                  'px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium flex items-center gap-2',
                  !draft.trim() && 'opacity-50 pointer-events-none'
                )}
              >
                <Send className="w-4 h-4" />
                Submit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold dark:text-white">{q.userName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{q.date}</div>
                  </div>

                  <button
                    onClick={() => markHelpful(q.id)}
                    className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({q.helpful})
                  </button>
                </div>

                <div className="mt-3 font-medium dark:text-white">Q: {q.question}</div>

                {q.answer ? (
                  <div className="mt-3 border-l-2 border-primary-500 pl-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      <span className="font-medium">{q.answer.answeredBy}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">· {q.answer.date}</span>
                    </div>
                    <div className="mt-1 text-gray-700 dark:text-gray-200">A: {q.answer.text}</div>
                  </div>
                ) : (
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    No answer yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
