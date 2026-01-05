import { useState } from 'react';
import { Copy, Share2, Check } from 'lucide-react';

interface ShareProductProps {
  url?: string;
}

export const ShareProduct = ({ url }: ShareProductProps) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopy = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <h4 className="font-semibold text-gray-900 dark:text-white">Share</h4>
      </div>

      <div className="flex items-center gap-2">
        <input
          value={shareUrl}
          readOnly
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
        />
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
};
