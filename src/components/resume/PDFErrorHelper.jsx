import React, { useState } from 'react';
import { AlertCircle, ArrowRight, HelpCircle, FileText, Download } from 'lucide-react';

/**
 * A component that displays helpful information when PDF parsing fails
 * Provides users with alternatives and troubleshooting steps
 */
const PDFErrorHelper = ({ errorMessage }) => {
  const [expanded, setExpanded] = useState(false);

  // Determine what kind of error we're dealing with
  const isWorkerError = errorMessage?.includes('worker failed') || 
                        errorMessage?.includes('Failed to fetch') ||
                        errorMessage?.includes('dynamically imported module');
  
  const isScannedPDFError = errorMessage?.includes('scanned') || 
                           errorMessage?.includes('image-based') ||
                           errorMessage?.includes('No text could be extracted');
  
  const isPasswordError = errorMessage?.includes('password protected');
  
  const isCorruptedError = errorMessage?.includes('Invalid PDF') || 
                          errorMessage?.includes('corrupted');

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">
            PDF Processing Error
          </h3>
          <p className="mt-1 text-sm text-red-700">
            {errorMessage || "We encountered a problem processing your PDF file."}
          </p>
          
          <button 
            onClick={() => setExpanded(!expanded)}
            className="mt-2 inline-flex items-center text-sm font-medium text-red-700 hover:text-red-900"
          >
            {expanded ? "Hide troubleshooting tips" : "Show troubleshooting tips"}
            <ArrowRight className={`ml-1 h-4 w-4 transform transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </button>
          
          {expanded && (
            <div className="mt-3 space-y-4 text-sm text-gray-700">
              {isWorkerError && (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Network or Browser Issue
                  </h4>
                  <p>The PDF processor is having trouble loading required resources. This can happen due to:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Network connectivity problems</li>
                    <li>Browser content blocking or security settings</li>
                    <li>Corporate firewalls or content filters</li>
                  </ul>
                  <div className="pt-2">
                    <p className="font-medium">Try these solutions:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Check your internet connection</li>
                      <li>Try a different web browser</li>
                      <li>Convert your PDF to a plain text (TXT) file and upload that instead</li>
                      <li>Copy and paste the text directly into a text input field</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {isScannedPDFError && (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Scanned or Image-based PDF
                  </h4>
                  <p>Your PDF appears to be a scanned document or contains images of text rather than actual text. Our system can only extract actual text from PDFs.</p>
                  <div className="pt-2">
                    <p className="font-medium">Try these solutions:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Use an OCR (Optical Character Recognition) tool to convert your scanned PDF to text</li>
                      <li>Try online services like <a href="https://www.onlineocr.net/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OnlineOCR</a> to extract text</li>
                      <li>Copy and paste the text manually if you have access to the original text</li>
                      <li>Upload a different version of your resume that contains actual text</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {isPasswordError && (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Password Protected PDF
                  </h4>
                  <p>Your PDF is password protected, which prevents us from accessing its contents.</p>
                  <div className="pt-2">
                    <p className="font-medium">Try these solutions:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Remove the password protection from your PDF using the software you used to create it</li>
                      <li>Use online tools to create an unprotected version of your PDF</li>
                      <li>Save your document in a different format like DOCX or plain text</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {isCorruptedError && (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Corrupted or Invalid PDF
                  </h4>
                  <p>Your PDF file appears to be corrupted or in an invalid format.</p>
                  <div className="pt-2">
                    <p className="font-medium">Try these solutions:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Re-save or export your resume as a PDF</li>
                      <li>Try using a PDF repair tool to fix the file</li>
                      <li>Upload a different version of your resume</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Generic advice for all cases */}
              <div className="pt-2 border-t border-gray-200">
                <h4 className="font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  Alternative Submission Methods
                </h4>
                <div className="pt-2">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Try converting your resume to a .DOCX file</li>
                    <li>Save your resume as a plain text (.txt) file</li>
                    <li>Copy and paste your resume text directly</li>
                    <li>Use our <a href="#" className="text-blue-600 hover:underline">manual text input option</a> if available</li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-3 flex justify-center">
                <a 
                  href="https://www.adobe.com/acrobat/online/compress-pdf.html" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Try Adobe's PDF Tools
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFErrorHelper;
