import React, { useState } from 'react';
import { Play, Trash2 } from 'lucide-react';
import HashCard from './HashCard';
import AlgorithmSelector from './AlgorithmSelector';
import { generateHash } from '../utils/crypto';
import { ALGORITHM_OPTIONS } from '../constants';
import { AlgorithmType, HashResult } from '../types';

const HashGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<AlgorithmType[]>([
    AlgorithmType.SHA256,
    AlgorithmType.BCRYPT,
  ]);
  const [results, setResults] = useState<HashResult[]>([]);
  const [isHashing, setIsHashing] = useState(false);
  const [inputError, setInputError] = useState('');

  const handleHash = async () => {
    if (!password.trim()) {
      setInputError('Lütfen önce bir şifre girin');
      return;
    }
    setInputError('');
    setIsHashing(true);
    setResults([]);

    const initialResults: HashResult[] = selectedAlgorithms.map(algo => ({
      algorithm: algo,
      hash: '',
      loading: true
    }));
    setResults(initialResults);

    const promises = selectedAlgorithms.map(async (algo) => {
      try {
        const hash = await generateHash(password, algo);
        setResults(prev => prev.map(r => 
          r.algorithm === algo ? { ...r, hash, loading: false } : r
        ));
        return { algorithm: algo, hash, loading: false };
      } catch (error) {
        console.error(error);
        const errResult = { algorithm: algo, hash: 'Hash oluşturma hatası', loading: false, error: 'Failed' };
        setResults(prev => prev.map(r => 
          r.algorithm === algo ? errResult : r
        ));
        return errResult;
      }
    });

    await Promise.all(promises);
    setIsHashing(false);
  };

  const handleClear = () => {
    setPassword('');
    setResults([]);
    setInputError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleHash();
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-gray-800 p-6 md:p-8 mb-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="gen-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Şifre Girişi
            </label>
            <div className="relative">
              <input
                id="gen-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if(e.target.value) setInputError('');
                }}
                onKeyDown={handleKeyPress}
                placeholder="Hashlenecek şifreyi girin..."
                className={`
                  w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 
                  border focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all
                  text-gray-900 dark:text-white placeholder-gray-400
                  ${inputError ? 'border-red-500 dark:border-red-500/50' : 'border-gray-200 dark:border-gray-700'}
                `}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {inputError && (
              <p className="mt-2 text-sm text-red-500 animate-in slide-in-from-left-2">{inputError}</p>
            )}
          </div>

          <AlgorithmSelector selected={selectedAlgorithms} onChange={setSelectedAlgorithms} />

          <div className="flex gap-4">
            <button
              onClick={handleHash}
              disabled={isHashing}
              className={`
                flex-1 py-3.5 px-6 rounded-xl text-white font-medium shadow-lg shadow-brand-500/25
                flex items-center justify-center gap-2
                transition-all duration-200 active:scale-[0.98]
                ${isHashing 
                  ? 'bg-brand-400 cursor-not-allowed' 
                  : 'bg-brand-600 hover:bg-brand-500 hover:shadow-brand-500/40'}
              `}
            >
              {isHashing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>İşleniyor...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Hash Oluştur</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleClear}
              className="px-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
              title="Hepsini temizle"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((result) => {
          const option = ALGORITHM_OPTIONS.find(opt => opt.id === result.algorithm);
          if (!option) return null;
          return (
            <HashCard
              key={result.algorithm}
              algorithm={result.algorithm}
              hash={result.hash}
              loading={result.loading}
              secure={option.secure}
              description={option.description}
            />
          );
        })}
      </div>
    </>
  );
};

export default HashGenerator;