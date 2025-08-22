import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white">ResumX</h1>
          <span className="ml-2 bg-white text-indigo-600 px-2 py-1 rounded-md text-xs font-semibold">
            AI Powered
          </span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="text-white hover:text-indigo-100 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/analyze" className="text-white hover:text-indigo-100 transition-colors">
                Analyze Resume
              </a>
            </li>
            <li>
              <a href="/about" className="text-white hover:text-indigo-100 transition-colors">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
