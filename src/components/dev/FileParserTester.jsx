import React, { useState, useEffect } from 'react';
import { extractTextFromPDF, extractTextFromDOCX } from '@utils/fileParser';
import useFileParsingMetrics from '@hooks/useFileParsingMetrics';

/**
 * A utility component for testing file extraction methods
 * This is a development-only component to help diagnose file parsing issues
 */
const FileParserTester = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractionMethod, setExtractionMethod] = useState('auto');
  const [showMetrics, setShowMetrics] = useState(false);
  
  const { 
    metrics, 
    trackAttempt, 
    trackSuccess, 
    trackFailure, 
    resetMetrics 
  } = useFileParsingMetrics();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult('');
      setError(null);
    }
  };

  const handleExtract = async () => {
    if (!file) return;
    
    setLoading(true);
    setResult('');
    setError(null);
    
    try {
      let text;
      const fileType = file.name.split('.').pop().toLowerCase();
      
      // Track this attempt
      trackAttempt(fileType);
      
      if (extractionMethod === 'auto') {
        // Use the appropriate method based on file type
        if (fileType === 'pdf') {
          text = await extractTextFromPDF(file);
        } else if (fileType === 'docx') {
          text = await extractTextFromDOCX(file);
        } else if (fileType === 'txt') {
          text = await file.text();
        } else {
          throw new Error(`Unsupported file type: ${fileType}`);
        }
      } else if (extractionMethod === 'pdf') {
        text = await extractTextFromPDF(file);
      } else if (extractionMethod === 'docx') {
        text = await extractTextFromDOCX(file);
      } else if (extractionMethod === 'text') {
        text = await file.text();
      }
      
      setResult(text);
      
      // Track success
      trackSuccess(fileType);
    } catch (err) {
      console.error('Extraction error:', err);
      setError(err.message || 'Unknown extraction error');
      
      // Track failure
      const fileType = file.name.split('.').pop().toLowerCase();
      trackFailure(fileType, err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  // Format the date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">File Parser Tester</h2>
      <p className="text-gray-600 mb-4">
        This utility helps test the file extraction methods.
      </p>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select a file to test
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.docx,.txt"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Extraction Method
        </label>
        <select
          value={extractionMethod}
          onChange={(e) => setExtractionMethod(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="auto">Auto (based on file extension)</option>
          <option value="pdf">Force PDF extraction</option>
          <option value="docx">Force DOCX extraction</option>
          <option value="text">Force Text extraction</option>
        </select>
      </div>
      
      <button
        onClick={handleExtract}
        disabled={!file || loading}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${!file || loading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'} 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {loading ? 'Extracting...' : 'Extract Text'}
      </button>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          <p className="font-medium">Error:</p>
          <p className="mt-1">{error}</p>
        </div>
      )}
      
      {result && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Extracted Text:</h3>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md overflow-auto max-h-96">
            <pre className="whitespace-pre-wrap text-sm">{result}</pre>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Character count: {result.length}
          </div>
        </div>
      )}
      
      {/* Metrics Section */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Parser Metrics</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowMetrics(!showMetrics)}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              {showMetrics ? 'Hide Metrics' : 'Show Metrics'}
            </button>
            <button
              onClick={resetMetrics}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Reset Metrics
            </button>
          </div>
        </div>
        
        {showMetrics && (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-xs uppercase text-gray-500 font-semibold">Total Attempts</p>
                <p className="text-2xl font-bold">{metrics.totalAttempts}</p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-xs uppercase text-gray-500 font-semibold">Success Rate</p>
                <p className="text-2xl font-bold">
                  {metrics.totalAttempts > 0 
                    ? `${((metrics.successfulParses / metrics.totalAttempts) * 100).toFixed(1)}%` 
                    : 'N/A'}
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-xs uppercase text-gray-500 font-semibold">Last Updated</p>
                <p className="text-sm font-medium">
                  {formatDate(metrics.lastUpdated)}
                </p>
              </div>
            </div>
            
            <h4 className="text-sm font-semibold mb-2">File Type Statistics</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attempts</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Failure</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(metrics.typeStats).map(([type, stats]) => (
                    <tr key={type}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">{type.toUpperCase()}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm">{stats.attempts}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-green-600">{stats.successes}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-red-600">{stats.failures}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm">
                        {stats.attempts > 0 
                          ? `${((stats.successes / stats.attempts) * 100).toFixed(1)}%` 
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {metrics.recentErrors.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Recent Errors</h4>
                <div className="max-h-40 overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {metrics.recentErrors.map((err, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 whitespace-nowrap text-xs">
                            {formatDate(err.timestamp)}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs font-medium">
                            {err.fileType.toUpperCase()}
                          </td>
                          <td className="px-3 py-2 text-xs text-red-600 truncate max-w-xs">
                            {err.error}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileParserTester;
