import React from 'react';
import { X, ShieldCheck, FileKey, Shuffle } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-800">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Hashlemeyi Anlamak</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                <Shuffle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Tek Yönlü Fonksiyon</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hashleme, veriyi sabit bir metin dizisine dönüştürür. Şifrelemenin aksine, orijinal şifreyi ortaya çıkarmak için geri döndürülemez.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Bütünlük Kontrolü</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Girdideki en ufak bir değişiklik bile tamamen farklı bir hash üretir. Bu, veri bütünlüğünü doğrulamak için yararlıdır.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2">
                <FileKey className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Tuzlama (Salting)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bcrypt gibi modern algoritmalar, gökkuşağı tablosu (rainbow table) saldırılarına karşı korunmak için hashlemeden önce rastgele veri ("tuz") ekler.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
            <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-2">Neden yavaş hashler kullanılır?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              MD5 veya SHA-1 gibi hızlı algoritmalar şifreler için tehlikelidir çünkü hackerlar saniyede milyarlarca şifre deneyebilir. Bcrypt veya Argon2 gibi yavaş algoritmalar bu süreci aşırı maliyetli hale getirir.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Anladım
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;