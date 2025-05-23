import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import UpgradeToggle from './UpgradeToggle';

const ThemeToggle: React.FC = () => {
  const { isDark, toggle } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <UpgradeToggle />
      <button
        onClick={toggle}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors relative"
        aria-label="Toggle theme"
      >
        <div className="relative">
          {isDark ? (
            <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <Sun className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;