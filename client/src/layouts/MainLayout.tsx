import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-gray-900 font-heading font-bold">PurePen</span>
              <span className="text-gray-500 text-sm ml-2">© {new Date().getFullYear()} All rights reserved</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-600 hover:text-primary-600">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary-600">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary-600">Contact</a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary-600">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;