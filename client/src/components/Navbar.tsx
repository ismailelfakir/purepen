import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenLine, Menu, X, User, BarChart2, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              {/* <PenLine className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-heading font-bold text-gray-900">PurePen</span> */}
              <img src="../public/logo.png" alt="logo-pure-pen" width={200}/>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/dashboard' 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/new" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/new' 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  New Assignment
                </Link>
                <Link 
                  to="/profile" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/profile' 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/login' 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-primary-600"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="pt-2 pb-3 space-y-1 px-4">
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/dashboard' 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <BarChart2 className="inline-block mr-2 h-5 w-5" /> 
                  Dashboard
                </Link>
                <Link 
                  to="/new" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/new' 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <PenLine className="inline-block mr-2 h-5 w-5" /> 
                  New Assignment
                </Link>
                <Link 
                  to="/profile" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/profile' 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <User className="inline-block mr-2 h-5 w-5" /> 
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="mt-2 w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  <LogOut className="inline-block mr-2 h-5 w-5" /> 
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  className="block mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;