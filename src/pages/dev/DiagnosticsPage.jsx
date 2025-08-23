import React from 'react';
import FileParserTester from '@components/dev/FileParserTester';
import PDFExtractTester from '@components/dev/PDFExtractTester';

const DiagnosticsPage = () => {
  // Only show in development environment
  const isDevelopment = process.env.NODE_ENV === 'development';

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
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              These diagnostic tools are only for development purposes. Do not include them in
              production builds.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* PDF Extract and Analysis Tester */}
        <PDFExtractTester />

        {/* Existing File Parser Tester */}
        <FileParserTester />
      </div>
    </div>
  );
};

export default DiagnosticsPage;
