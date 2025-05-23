import React from 'react';
import { Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import PremiumIcon from './PremiumIcon';

const ThemeToggle: React.FC = () => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors relative"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      ) : (
        <div className="relative">
          <svg 
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446A9 9 0 1112 3z"
            />
          </svg>
          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full p-0.5">
            <PremiumIcon className="h-2.5 w-2.5 text-white" />
          </div>
        </div>
      )}
    </button>
  );
};

export default ThemeToggle;