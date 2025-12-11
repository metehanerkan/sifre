import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle, Copy, AlertTriangle, ShieldCheck } from 'lucide-react';
import { verifyHash } from '../utils/crypto';
import { ALGORITHM_OPTIONS } from '../constants';
import { AlgorithmType } from '../types';

const HashVerifier: React.FC = () => {
  const [password, setPassword] = useState('');
  const [hash, setHash] = useState('');
  const [algorithm, setAlgorithm] = useState<AlgorithmType>(AlgorithmType.BCRYPT);
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<'match' | 'no-match' | null>(null);

  const handleVerify = async () => {
    if (!password.trim() || !hash.trim()) return;
    
    setIsVerifying(true);
    setResult(null);

    // Simulate a brief delay for UX so user sees something happening
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const isMatch = await verifyHash(password, hash, algorithm);
      setResult(isMatch ? 'match' : 'no-match');
    } catch (error) {
      console.error(error);
      setResult('no-match');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(hash);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-gray-800 p-6 md:p-8">
      
      <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-3 text-sm text-blue-800 dark:text-blue-300">
        <AlertTriangle className="w-5 h-5 shrink-0" />
        <p>
          <strong>Bilgi:</strong> Hashleme geri alınamaz (irreversible). Bu araç şifre çözmez (decrypt yapmaz). 
          Sadece girdiğiniz şifrenin, girdiğiniz hash ile eşleşip eşleşmediğini kontrol eder.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Password Input */}
          <div>
            <label htmlFor="verify-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Denenen Şifre (Plaintext)
            </label>
            <div className="relative">
              <input
                id="verify-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setResult(null);
                }}
                placeholder="Örn: gizlisifre123"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Algorithm Selection */}
          <div>
            <label htmlFor="verify-algo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kullanılan Algoritma
            </label>
            <div className="relative">
                <select
                    id="verify-algo"
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-gray-900 dark:text-white appearance-none cursor-pointer"
                >
                    {ALGORITHM_OPTIONS.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
          </div>
        </div>

        {/* Hash Input */}
        <div>
          <label htmlFor="verify-hash" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Karşılaştırılacak Hash
          </label>
          <div className="relative">
            <textarea
              id="verify-hash"
              value={hash}
              onChange={(e) => {
                  setHash(e.target.value);
                  setResult(null);
              }}
              placeholder="Hash değerini buraya yapıştırın..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none font-mono text-sm text-gray-600 dark:text-gray-300 break-all resize-none"
            />
            <button
                onClick={handleCopyHash}
                className="absolute top-2 right-2 p-1.5 rounded-lg text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white dark:hover:bg-gray-700 transition-all"
                title="Kopyala"
            >
                <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          onClick={handleVerify}
          disabled={isVerifying || !password || !hash}
          className={`
            w-full py-4 rounded-xl text-white font-medium shadow-lg
            flex items-center justify-center gap-2
            transition-all duration-200 active:scale-[0.98]
            ${(isVerifying || !password || !hash)
              ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed shadow-none' 
              : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25'}
          `}
        >
          {isVerifying ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <ShieldCheck className="w-5 h-5" />
          )}
          <span>Doğrula (Verify)</span>
        </button>

        {/* Results Display */}
        {result && (
          <div className={`
            rounded-xl p-4 border flex items-start gap-4 animate-in slide-in-from-bottom-2
            ${result === 'match' 
                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' 
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}
          `}>
            <div className={`
                p-2 rounded-full shrink-0
                ${result === 'match' ? 'bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-200' : 'bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-200'}
            `}>
                {result === 'match' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
            </div>
            <div>
                <h3 className={`font-bold text-lg mb-1 ${result === 'match' ? 'text-emerald-900 dark:text-emerald-100' : 'text-red-900 dark:text-red-100'}`}>
                    {result === 'match' ? 'Eşleşme Başarılı!' : 'Eşleşme Yok!'}
                </h3>
                <p className={`text-sm ${result === 'match' ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                    {result === 'match' 
                        ? 'Harika! Girdiğiniz şifre bu hash değeri ile matematiksel olarak uyuşuyor.' 
                        : 'Üzgünüm. Bu şifre bu hash değeri ile uyuşmuyor. Algoritmayı veya şifreyi kontrol edin.'}
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HashVerifier;