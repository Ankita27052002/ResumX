import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg">
      <div className=" px-16">
        <div className="flex justify-between items-center h-16 py-2">
          {/* Logo Section - Left Side */}
          <div className="flex items-center header-logo">
              <h1 className="text-2xl font-bold text-white tracking-wide">
                ResumX
              </h1>
              <span className="bg-emerald-400 text-emerald-900 px-3 py-1 rounded-full text-xs font-medium shadow-md">
                AI Powered
              </span>
          </div>
          
          {/* Navigation Section - Right Side */}
          <nav className="hidden md:flex nav-menu">
            <div className="flex items-center gap-6">
              <a 
                href="/" 
                className="bg-white/20 text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-white/30 transition-colors duration-200"
              >
                Home
              </a>
              <a 
                href="/analyze" 
                className="text-white/90 hover:text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-white/20 transition-colors duration-200"
              >
                Analyze Resume
              </a>
              <a 
                href="/about" 
                className="text-white/90 hover:text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-white/20 transition-colors duration-200"
              >
                About
              </a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-200 p-2 rounded-md hover:bg-white/20 transition-colors duration-200">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
