import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * A debug menu component that appears only in development mode
 * Provides links to diagnostic tools and debugging features
 */
const DebugMenu = () => {
  // Only show in development environment
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (!isDevelopment) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative group">
        <button 
          className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          aria-label="Debug Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        
        <div className="absolute bottom-full right-0 mb-2 w-48 transition-opacity duration-200 
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible">
          <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-200">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
              Debug Tools
            </div>
            <ul className="space-y-1">
              <li>
                <NavLink 
                  to="/dev/diagnostics" 
                  className={({ isActive }) => 
                    `block px-4 py-2 text-sm rounded-md transition-colors ${
                      isActive ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'
                    }`
                  }
                >
                  File Parser Diagnostics
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dev/tools" 
                  className={({ isActive }) => 
                    `block px-4 py-2 text-sm rounded-md transition-colors ${
                      isActive ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'
                    }`
                  }
                >
                  PDF Diagnostic Tools
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/" 
                  className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50"
                  onClick={(e) => {
                    e.preventDefault();
                    // Reset local storage for debugging
                    localStorage.clear();
                    window.location.href = '/';
                  }}
                >
                  Reset Storage & Reload
                </NavLink>
              </li>
            </ul>
            <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-center text-gray-500">
              Dev Mode Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugMenu;
