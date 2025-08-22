import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf.mjs';

// Flag to determine which worker loading method to use
const USE_LOCAL_WORKER = false; // Set to false to use CDN directly

// Function to set up local worker via CDN with our exact version
function setupLocalWorker() {
  try {
    console.log('Setting up PDF.js worker with specific version');
    
    // Use the CDN path but with the exact version we have installed
    const workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
    GlobalWorkerOptions.workerSrc = workerSrc;
    
    console.log('PDF.js worker set up successfully with version:', pdfjsLib.version);
    return true;
  } catch (error) {
    console.error('Error setting up PDF.js worker:', error);
    return false;
  }
}

function setupCdnWorker() {
  try {
    console.log('Using CDN PDF.js worker with version:', pdfjsLib.version);
    const pdfWorkerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
    GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
    return true;
  } catch (error) {
    console.error('Error setting up CDN PDF.js worker:', error);
    return false;
  }
}

// Initialize with the appropriate worker
setupLocalWorker();

// Simple console check to confirm worker is set
console.log('PDF.js worker source set to:', GlobalWorkerOptions.workerSrc);

export default pdfjsLib;
