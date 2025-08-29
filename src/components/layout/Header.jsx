import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Function to determine if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg">
      <div className=" px-16">
        <div className="flex justify-between items-center h-16 py-2">
          {/* Logo Section - Left Side */}
          <div className="flex items-center header-logo">
            <Link 
              to="/" 
              className="flex items-center logo-link"
              title="Go to Home Page"
            >
              <h1 className="text-2xl font-bold text-white tracking-wide logo-title">
                ResumX
              </h1>
              <div className="ai-powered-badge">
                <span className="ai-powered-text">AI Powered</span>
                <div className="ai-powered-glow"></div>
              </div>
            </Link>
          </div>
          
          {/* Navigation Section - Right Side */}
          <nav className="hidden md:flex nav-menu">
            <div className="nav-links">
              <Link 
                to="/" 
                className={`nav-item ${isActive('/') ? 'nav-item-active' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/analyze" 
                className={`nav-item ${isActive('/analyze') ? 'nav-item-active' : ''}`}
              >
                Analyze Resume
              </Link>
              <Link 
                to="/about" 
                className={`nav-item ${isActive('/about') ? 'nav-item-active' : ''}`}
              >
                About
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white hover:text-blue-200 p-2 rounded-md hover:bg-white/20 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-sm rounded-lg mx-4 mb-4">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md text-white text-sm font-medium ${
                  isActive('/') ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/analyze" 
                className={`block px-3 py-2 rounded-md text-white text-sm font-medium ${
                  isActive('/analyze') ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Analyze Resume
              </Link>
              <Link 
                to="/about" 
                className={`block px-3 py-2 rounded-md text-white text-sm font-medium ${
                  isActive('/about') ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
