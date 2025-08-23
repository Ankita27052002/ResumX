import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf.mjs';

// Flag to determine which worker loading method to use
const USE_LOCAL_WORKER = false; // Set to false to use CDN directly

// Function to set up local worker via CDN with our exact version
function setupLocalWorker() {
  try {
    const workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    GlobalWorkerOptions.workerSrc = workerSrc;
    return true;
  } catch (error) {
    console.error('Error setting up PDF.js worker:', error);
    return false;
  }
}

function setupCdnWorker() {
  try {
    console.log('Using CDN PDF.js worker with version:', pdfjsLib.version);
    const pdfWorkerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
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
