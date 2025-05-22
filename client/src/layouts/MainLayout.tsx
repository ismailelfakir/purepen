import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900 transition-colors">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-gray-900 dark:text-white font-heading font-bold">PurePen</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">© {new Date().getFullYear()} All rights reserved</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Contact</a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;