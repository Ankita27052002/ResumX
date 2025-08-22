import React from 'react';
import PDFDiagnosticTool from '@components/dev/PDFDiagnosticTool';

/**
 * Development tools page for diagnosing PDF parsing issues
 * This route should only be accessible in development mode
 */
const DevTools = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Development Tools</h1>
        <p className="text-gray-600">
          These tools are intended for developers to diagnose and fix issues with the application.
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
              <strong>Warning:</strong> These tools are for development purposes only and should not be accessible in production.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">PDF Parsing Diagnostics</h2>
          <PDFDiagnosticTool />
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Environment Information</h2>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-2">Build Information</h3>
            <div className="bg-gray-100 p-3 rounded overflow-auto">
              <pre className="text-sm">
                {JSON.stringify(
                  {
                    'React Version': React.version,
                    'Mode': import.meta.env.MODE,
                    'Development': import.meta.env.DEV ? 'Yes' : 'No',
                    'Base URL': import.meta.env.BASE_URL,
                    'User Agent': navigator.userAgent,
                    'Platform': navigator.platform,
                    'Viewport': `${window.innerWidth}x${window.innerHeight}`,
                    'Device Pixel Ratio': window.devicePixelRatio,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DevTools;
