import React from 'react';
import { Crown } from 'lucide-react';

const UpgradeToggle: React.FC = () => {
  return (
    <button
      onClick={() => window.location.href = '/profile'}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors relative"
      aria-label="Upgrade to premium"
    >
      <Crown className="h-5 w-5 text-amber-500 dark:text-amber-400" />
    </button>
  );
};

export default UpgradeToggle;