import React, { useEffect } from 'react';
import FileParserTester from '@components/dev/FileParserTester';

/**
 * A developer-only page for testing and debugging file parsing functionality
 */
const DiagnosticsPage = () => {
  // Only show in development environment
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Add script to check PDF.js details
  useEffect(() => {
    // Only run in the browser
    if (typeof window !== 'undefined') {
      // Dynamic import PDF.js to check version
      import('@utils/pdfWorker').then(pdfjsLib => {
        // Update version
        const versionElement = document.getElementById('pdfjs-version');
        if (versionElement) {
          versionElement.textContent = pdfjsLib.default.version || 'Unknown';
        }
        
        // Check worker status
        const workerElement = document.getElementById('worker-status');
        if (workerElement) {
          const workerSrc = pdfjsLib.default.GlobalWorkerOptions?.workerSrc;
          workerElement.textContent = workerSrc ? 
            `Configured (${workerSrc})` : 
            'Not configured properly';
        }
        
        // Check browser compatibility
        const compatElement = document.getElementById('browser-compat');
        if (compatElement) {
          // Simple check for basic requirements
          const hasPromise = typeof Promise !== 'undefined';
          const hasArrayBuffer = typeof ArrayBuffer !== 'undefined';
          const hasBlob = typeof Blob !== 'undefined';
          
          if (hasPromise && hasArrayBuffer && hasBlob) {
            compatElement.textContent = 'Compatible';
          } else {
            const missing = [];
            if (!hasPromise) missing.push('Promise');
            if (!hasArrayBuffer) missing.push('ArrayBuffer');
            if (!hasBlob) missing.push('Blob');
            compatElement.textContent = `Missing: ${missing.join(', ')}`;
          }
        }
      }).catch(err => {
        console.error('Error loading PDF.js:', err);
      });
    }
  }, []);
  
  if (!isDevelopment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">
          This page is only available in development mode.
        </h1>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Developer Diagnostics</h1>
        <p className="text-gray-600">
          This page contains utilities for testing and debugging application functionality.
        </p>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              These diagnostic tools are only for development purposes. Do not include them in production builds.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FileParserTester />
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              PDF.js Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Details about the PDF.js library configuration.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  PDF.js Version
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" id="pdfjs-version">
                  Checking...
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Worker Status
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" id="worker-status">
                  Checking...
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Browser Compatibility
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" id="browser-compat">
                  Checking...
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsPage;
