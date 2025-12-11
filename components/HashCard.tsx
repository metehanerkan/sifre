import React, { useState } from 'react';
import { Copy, Check, Lock, Unlock } from 'lucide-react';
import { AlgorithmType } from '../types';

interface HashCardProps {
  algorithm: AlgorithmType;
  hash: string;
  loading: boolean;
  secure: boolean;
  description: string;
}

const HashCard: React.FC<HashCardProps> = ({ algorithm, hash, loading, secure, description }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!hash) return;
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 dark:text-gray-100">{algorithm}</span>
          <div className="group relative flex items-center">
            {secure ? (
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
                <Unlock className="w-3.5 h-3.5 text-red-500" />
            )}
            <span className="sr-only">{secure ? 'Güvenli' : 'Güvensiz'}</span>
          </div>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{description}</span>
      </div>
      
      <div className="p-4 relative group">
        {loading ? (
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
            </div>
        ) : (
            <div className="relative">
                <pre className="font-mono text-sm break-all text-gray-600 dark:text-gray-300 min-h-[3rem] p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800/50">
                    {hash}
                </pre>
                
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Panoya kopyala"
                >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default HashCard;