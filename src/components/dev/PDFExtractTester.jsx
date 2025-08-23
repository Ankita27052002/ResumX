import React, { useState } from 'react';
import { extractTextFromPDF } from '@utils/pdfUtils';
import { analyzeResume } from '@services/aiService';

const PDFExtractTester = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stage, setStage] = useState(null);

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setExtractedText('');
      setAnalysis('');
      setError(null);
    }
  };

  const handleExtract = async () => {
    if (!file) {
      setError('Please select a PDF file first');
      return;
    }

    setLoading(true);
    setStage('extracting');
    setError(null);

    try {
      const text = await extractTextFromPDF(file);
      setExtractedText(text);
    } catch (err) {
      console.error('Error extracting text:', err);
      setError(err.message || 'Failed to extract text');
    } finally {
      setLoading(false);
      setStage(null);
    }
  };

  const handleAnalyze = async () => {
    if (!extractedText) {
      setError('Please extract text first');
      return;
    }

    setLoading(true);
    setStage('analyzing');
    setError(null);

    try {
      const result = await analyzeResume(extractedText);
      setAnalysis(result);
    } catch (err) {
      console.error('Error analyzing text:', err);
      setError(err.message || 'Failed to analyze text');
    } finally {
      setLoading(false);
      setStage(null);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">PDF Text Extraction and Analysis Tester</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Upload PDF</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={handleExtract}
          disabled={!file || loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {loading && stage === 'extracting' ? 'Extracting...' : 'Extract Text'}
        </button>

        <button
          onClick={handleAnalyze}
          disabled={!extractedText || loading}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {loading && stage === 'analyzing' ? 'Analyzing...' : 'Analyze Text'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {extractedText && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Extracted Text:</h3>
          <div className="bg-gray-100 p-4 rounded-md max-h-60 overflow-auto">
            <pre className="whitespace-pre-wrap">{extractedText}</pre>
          </div>
          <div className="text-sm text-gray-600 mt-2">Character count: {extractedText.length}</div>
        </div>
      )}

      {analysis && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Analysis Result:</h3>
          <div className="bg-gray-100 p-4 rounded-md max-h-80 overflow-auto">
            <div className="whitespace-pre-wrap">{analysis}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFExtractTester;
