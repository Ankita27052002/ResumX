import React, { useState, useRef } from 'react';
import { extractTextFromPDF } from '../../utils/fileParser';
import { extractTextFromPDFFallback } from '../../utils/pdfFallback';
import pdfjsLib from '../../utils/pdfWorker';
import { localGetPdfjsLib } from '../../utils/pdfWorkerLocal';

/**
 * A developer-focused component for testing different PDF extraction methods
 * This is useful for diagnosing issues with PDF parsing
 */
const PDFDiagnosticTool = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      // Reset states
      setResults({});
      setLoading({});
      setErrors({});
    }
  };

  const testMethod = async (methodName, extractionFunction) => {
    if (!file) return;

    // Set loading state for this method
    setLoading(prev => ({ ...prev, [methodName]: true }));
    setErrors(prev => ({ ...prev, [methodName]: null }));

    try {
      console.log(`Testing ${methodName} extraction method`);
      const startTime = performance.now();
      const text = await extractionFunction(file);
      const endTime = performance.now();

      setResults(prev => ({
        ...prev,
        [methodName]: {
          text: text,
          executionTimeMs: Math.round(endTime - startTime),
          charCount: text?.length || 0,
          wordCount: text?.split(/\s+/).filter(Boolean).length || 0,
          previewText: text?.substring(0, 200) + (text?.length > 200 ? '...' : ''),
        },
      }));
    } catch (error) {
      console.error(`Error with ${methodName}:`, error);
      setErrors(prev => ({
        ...prev,
        [methodName]: {
          message: error.message || 'Unknown error',
          stack: error.stack,
        },
      }));
    } finally {
      setLoading(prev => ({ ...prev, [methodName]: false }));
    }
  };

  const testMainExtraction = () => testMethod('mainExtractor', extractTextFromPDF);
  const testFallbackExtraction = () => testMethod('fallbackExtractor', extractTextFromPDFFallback);

  const testCdnWorker = async () => {
    testMethod('cdnWorker', async file => {
      // Force using the CDN worker
      const cdnPdfjsLib = pdfjsLib;

      // Read file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Create loading task with explicit CDN worker
      const loadingTask = cdnPdfjsLib.getDocument({
        data: uint8Array,
        disableWorker: false,
      });

      // Load the PDF
      const pdf = await loadingTask.promise;
      let fullText = '';

      // Process each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str || '').join(' ');
        fullText += pageText + '\n';
      }

      return fullText.trim();
    });
  };

  const testLocalWorker = async () => {
    testMethod('localWorker', async file => {
      // Force using the local worker
      const localPdfjsLib = await localGetPdfjsLib();

      // Read file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Create loading task with local worker
      const loadingTask = localPdfjsLib.getDocument({
        data: uint8Array,
        disableWorker: false,
      });

      // Load the PDF
      const pdf = await loadingTask.promise;
      let fullText = '';

      // Process each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str || '').join(' ');
        fullText += pageText + '\n';
      }

      return fullText.trim();
    });
  };

  const testInlineWorker = async () => {
    testMethod('inlineWorker', async file => {
      // Use the library with worker disabled (runs in main thread)
      // This is slower but might be more reliable in some cases

      // Read file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Create loading task with worker disabled
      const loadingTask = pdfjsLib.getDocument({
        data: uint8Array,
        disableWorker: true, // Force running on main thread
      });

      // Load the PDF
      const pdf = await loadingTask.promise;
      let fullText = '';

      // Process each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str || '').join(' ');
        fullText += pageText + '\n';
      }

      return fullText.trim();
    });
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow">
      <h2 className="text-xl font-bold mb-4">PDF Extraction Diagnostic Tool</h2>
      <p className="text-gray-600 mb-4">
        This tool helps diagnose issues with PDF text extraction by testing multiple approaches.
        Upload a PDF file and run the different extraction methods to compare results.
      </p>

      {/* File input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Test PDF File</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
        />
        {file && (
          <p className="mt-2 text-sm text-gray-500">
            Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </p>
        )}
      </div>

      {/* Test buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={testMainExtraction}
          disabled={!file || loading.mainExtractor}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading.mainExtractor ? 'Testing...' : 'Test Main Extractor'}
        </button>

        <button
          onClick={testFallbackExtraction}
          disabled={!file || loading.fallbackExtractor}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading.fallbackExtractor ? 'Testing...' : 'Test Fallback Extractor'}
        </button>

        <button
          onClick={testCdnWorker}
          disabled={!file || loading.cdnWorker}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          {loading.cdnWorker ? 'Testing...' : 'Test CDN Worker'}
        </button>

        <button
          onClick={testLocalWorker}
          disabled={!file || loading.localWorker}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50"
        >
          {loading.localWorker ? 'Testing...' : 'Test Local Worker'}
        </button>

        <button
          onClick={testInlineWorker}
          disabled={!file || loading.inlineWorker}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {loading.inlineWorker ? 'Testing...' : 'Test Inline Worker (No Worker)'}
        </button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(results).map(methodName => (
          <div key={methodName} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold text-lg mb-2 capitalize">{methodName}</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Time:</span> {results[methodName].executionTimeMs}ms
              </p>
              <p>
                <span className="font-medium">Characters:</span> {results[methodName].charCount}
              </p>
              <p>
                <span className="font-medium">Words:</span> {results[methodName].wordCount}
              </p>
              <div>
                <p className="font-medium">Preview:</p>
                <pre className="mt-1 p-2 bg-white border border-gray-300 rounded text-xs overflow-auto max-h-40">
                  {results[methodName].previewText}
                </pre>
              </div>
            </div>
          </div>
        ))}

        {/* Errors */}
        {Object.keys(errors)
          .filter(k => errors[k])
          .map(methodName => (
            <div key={methodName} className="border border-red-200 rounded-lg p-4 bg-red-50">
              <h3 className="font-semibold text-lg mb-2 text-red-700 capitalize">
                {methodName} Error
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-red-600">{errors[methodName].message}</p>
                <details>
                  <summary className="cursor-pointer text-red-700">Error Details</summary>
                  <pre className="mt-1 p-2 bg-white border border-red-300 rounded text-xs overflow-auto max-h-40 text-red-800">
                    {errors[methodName].stack}
                  </pre>
                </details>
              </div>
            </div>
          ))}
      </div>

      {/* Environment info */}
      <div className="mt-6 p-3 bg-gray-100 rounded-lg text-xs">
        <h4 className="font-semibold mb-2">Environment Information</h4>
        <pre className="overflow-auto">
          PDF.js Version: {pdfjsLib?.version || 'Unknown'}\n User Agent: {navigator.userAgent}
        </pre>
      </div>
    </div>
  );
};

export default PDFDiagnosticTool;
