import React, { useState, useEffect } from 'react';
import { Moon, Sun, Info, Hash, ShieldCheck } from 'lucide-react';
import WarningBanner from './components/WarningBanner';
import InfoModal from './components/InfoModal';
import HashGenerator from './components/HashGenerator';
import HashVerifier from './components/HashVerifier';

function App() {
  const [activeTab, setActiveTab] = useState<'generate' | 'verify'>('generate');
  const [darkMode, setDarkMode] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  // Initialize theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <WarningBanner />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-brand-500 rounded-lg shadow-lg shadow-brand-500/20 text-white">
                <Hash className="w-6 h-6" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                SecureHash
              </h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Modern şifre hashleme ve doğrulama aracı.
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowInfo(true)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              aria-label="Bilgi"
            >
              <Info className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              aria-label="Temayı değiştir"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800 mb-8 flex gap-1 shadow-sm">
            <button
                onClick={() => setActiveTab('generate')}
                className={`
                    flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all
                    ${activeTab === 'generate' 
                        ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 shadow-sm' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}
                `}
            >
                <Hash className="w-4 h-4" />
                Hash Oluşturucu
            </button>
            <button
                onClick={() => setActiveTab('verify')}
                className={`
                    flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all
                    ${activeTab === 'verify' 
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}
                `}
            >
                <ShieldCheck className="w-4 h-4" />
                Doğrulayıcı (Verify)
            </button>
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {activeTab === 'generate' ? <HashGenerator /> : <HashVerifier />}
        </div>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-600">
        <p>React & Tailwind CSS ile yapılmıştır. Sadece istemci taraflı (client-side) işlem.</p>
      </footer>

      <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} />
    </div>
  );
}

export default App;