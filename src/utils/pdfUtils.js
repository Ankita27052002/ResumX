import { extractTextFromPDF } from './fileParser';

/**
 * A utility for handling various PDF specific operations
 * that might be required for the resume analyzer
 */
export class PDFUtils {
  /**
   * Detects if a PDF might be scanned or image-based
   * by checking if text extraction yields little to no text
   * 
   * @param {ArrayBuffer} pdfData - The PDF data as an ArrayBuffer
   * @returns {Promise<boolean>} - True if the PDF appears to be scanned
   */
  static async isScannedPDF(pdfData) {
    // Simple heuristic: If we extract very little text relative to file size,
    // it's probably a scanned document
    try {
      const textDensity = await this.calculateTextDensity(pdfData);
      return textDensity < 0.01; // Threshold: 1% text density
    } catch (error) {
      console.error('Error detecting scanned PDF:', error);
      return false;
    }
  }
  
  /**
   * Calculate the "text density" of a PDF
   * (characters of text / bytes of file)
   * 
   * @param {ArrayBuffer} pdfData - The PDF data
   * @returns {Promise<number>} - The text density ratio
   */
  static async calculateTextDensity(pdfData) {
    // Create a blob from the array buffer
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    
    // Create a File object which can be passed to extractTextFromPDF
    const file = new File([blob], 'temp.pdf', { type: 'application/pdf' });
    
    try {
      const extractedText = await extractTextFromPDF(file);
      const textLength = extractedText.length;
      const fileSize = pdfData.byteLength;
      
      return textLength / fileSize;
    } catch (error) {
      console.error('Error calculating text density:', error);
      return 0;
    }
  }
  
  /**
   * Provides guidance for handling problematic PDFs
   * 
   * @returns {string} - Guidance text
   */
  static getScannedPDFGuidance() {
    return `
      Your PDF appears to be scanned or image-based, which makes text extraction difficult.
      For better results, try:
      
      1. Using a text-based PDF rather than a scanned document
      2. Converting your document to text format (.txt)
      3. Copying and pasting the text directly instead of uploading a file
    `;
  }
}

export default PDFUtils;
