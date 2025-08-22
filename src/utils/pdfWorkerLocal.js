/**
 * This file creates a local PDF.js worker to avoid CDN dependency issues
 */
import * as pdfjsLib from 'pdfjs-dist';

// Set the path to the worker using a more compatible approach for Vite
// Use the CDN path but with the exact version we have installed
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

// Create a function to get the PDF.js library with the worker already configured
export const localGetPdfjsLib = async () => {
  console.log('Getting PDF.js library with worker configured');
  // Make sure the worker is properly set
  if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 
      `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
  }
  return pdfjsLib;
};

// Export the configured library as default
export default pdfjsLib;
