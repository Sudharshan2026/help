import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { School } from 'lucide-react';

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-[#bd9607] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="logo">
                <Link to="/" className="block">
                  <img 
                    src="https://ai.sairam.edu.in/wp-content/themes/sairamdept/sd-assets/images/logo.png" 
                    className="h-12 lg:h-16 object-contain hidden lg:block" 
                    alt="Sri Sairam Engineering College"
                  />
                  <img 
                    src="https://ai.sairam.edu.in/wp-content/themes/sairamdept/sd-assets/images/logo_mobile.png" 
                    className="h-12 object-contain lg:hidden" 
                    alt="Sri Sairam Engineering College"
                  />
                </Link>
                <p className="text-xs text-white/90">
                  An <span className="animate-pulse font-semibold">Autonomous</span> Institution
                </p>
              </div>
              <div className="ml-4 hidden lg:block">
                <span className="text-xs text-white/80">Department of</span>
                <h6 className="text-sm font-bold">
                  Artificial Intelligence and Data Science (AI-DS)
                </h6>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className={`hover:text-gray-200 ${location.pathname === '/' ? 'font-bold' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/od"
              className={`hover:text-gray-200 ${location.pathname === '/od' ? 'font-bold' : ''}`}
            >
              OD Request
            </Link>
            <Link
              to="/leave"
              className={`hover:text-gray-200 ${location.pathname === '/leave' ? 'font-bold' : ''}`}
            >
              Leave Request
            </Link>
            <Link
              to="/status"
              className={`hover:text-gray-200 ${location.pathname === '/status' ? 'font-bold' : ''}`}
            >
              Check Status
            </Link>
            <Link
              to="/admin"
              className={`hover:text-gray-200 ${location.pathname === '/admin' ? 'font-bold' : ''}`}
            >
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-[#a68206] focus:outline-none focus:ring-2 focus:ring-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu (hidden by default) */}
        <div className="md:hidden mt-4 hidden">
          <nav className="flex flex-col space-y-2">
            <Link
              to="/"
              className={`hover:text-gray-200 ${location.pathname === '/' ? 'font-bold' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/od"
              className={`hover:text-gray-200 ${location.pathname === '/od' ? 'font-bold' : ''}`}
            >
              OD Request
            </Link>
            <Link
              to="/leave"
              className={`hover:text-gray-200 ${location.pathname === '/leave' ? 'font-bold' : ''}`}
            >
              Leave Request
            </Link>
            <Link
              to="/status"
              className={`hover:text-gray-200 ${location.pathname === '/status' ? 'font-bold' : ''}`}
            >
              Check Status
            </Link>
            <Link
              to="/admin"
              className={`hover:text-gray-200 ${location.pathname === '/admin' ? 'font-bold' : ''}`}
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};