import React from 'react';
import { ShieldAlert } from 'lucide-react';

const WarningBanner: React.FC = () => {
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-700 dark:text-amber-400 px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium">
      <ShieldAlert className="w-4 h-4" />
      <span>
        Güvenlik Uyarısı: Gerçek şifrelerinizi GİRMEYİN. Bu araç sadece test ve öğrenme amaçlıdır.
      </span>
    </div>
  );
};

export default WarningBanner;