import React from 'react';
import Button from '@components/common/Button';

/**
 * Component that provides suggestions and solutions when PDF parsing fails
 * particularly for scanned or image-based PDFs
 */
const PDFParsingFallback = ({ onTryAgain, onEnterManually }) => {
  return (
    <div className="mt-6 p-5 bg-white border border-gray-300 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-red-600 mb-2">
        Unable to Extract Text from PDF
      </h3>
      
      <p className="text-gray-700 mb-4">
        We couldn't extract text from your PDF file. This usually happens with:
      </p>
      
      <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-1">
        <li>Scanned documents or image-based PDFs</li>
        <li>PDFs with security restrictions</li>
        <li>Corrupted PDF files</li>
        <li>PDFs with unusual text encoding</li>
      </ul>
      
      <div className="bg-yellow-50 p-4 rounded-md mb-4 border border-yellow-200">
        <h4 className="font-medium text-yellow-800 mb-2">Solutions</h4>
        <ol className="list-decimal pl-5 text-yellow-700 space-y-1">
          <li>Convert your PDF to text using an OCR service:</li>
          <ul className="list-disc pl-5 ml-2 mt-1 mb-2 text-sm">
            <li>
              <a 
                href="https://www.adobe.com/acrobat/online/pdf-to-text.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Adobe PDF to Text Converter
              </a>
            </li>
            <li>
              <a 
                href="https://www.onlineocr.net/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Online OCR
              </a>
            </li>
          </ul>
          <li>Try saving your resume as a plain text (.txt) file</li>
          <li>Copy and paste your resume text directly</li>
        </ol>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button 
          variant="secondary"
          onClick={onTryAgain}
        >
          Try Another File
        </Button>
        <Button 
          variant="primary"
          onClick={onEnterManually}
        >
          Enter Text Manually
        </Button>
      </div>
    </div>
  );
};

export default PDFParsingFallback;
