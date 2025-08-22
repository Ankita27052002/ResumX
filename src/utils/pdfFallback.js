/**
 * This module provides a fallback approach for extracting text from PDFs
 * when the PDF.js library fails to work properly
 */

/**
 * Basic text extraction from PDF content using direct inspection
 * Note: This is a very limited and rudimentary approach that only works
 * for the simplest PDFs with clearly defined text structures
 * 
 * @param {ArrayBuffer} pdfData - The PDF data as ArrayBuffer
 * @returns {string} - The extracted text
 */
export const extractTextFallback = (pdfData) => {
  try {
    // Convert to Uint8Array for processing
    const data = new Uint8Array(pdfData);
    let extracted = '';
    
    // Look for text markers in the PDF
    const textMarkers = ['/Text', '/Contents', '/TJ', '/Tj', ' Tj', ' TJ'];
    const parensPattern = /\(([^\)]+)\)/g;
    const hexPattern = /<([0-9A-Fa-f]+)>/g;
    
    // Convert the PDF data to a string for pattern matching
    // This only converts the parts that are likely ASCII text
    let pdfStr = '';
    for (let i = 0; i < data.length; i++) {
      // Only include likely text characters
      if (data[i] >= 32 && data[i] <= 126) {
        pdfStr += String.fromCharCode(data[i]);
      } else {
        pdfStr += ' ';
      }
    }
    
    // Find sections that look like text blocks
    textMarkers.forEach(marker => {
      const parts = pdfStr.split(marker);
      for (let i = 1; i < parts.length; i++) {
        // Extract text within parentheses
        const matches = parts[i].match(parensPattern);
        if (matches) {
          matches.forEach(match => {
            // Remove the parentheses
            const text = match.substring(1, match.length - 1);
            if (text.length > 1) {
              extracted += text + ' ';
            }
          });
        }
        
        // Extract text from hex encoded blocks
        const hexMatches = parts[i].match(hexPattern);
        if (hexMatches) {
          hexMatches.forEach(match => {
            // Convert hex to text
            try {
              const hex = match.substring(1, match.length - 1);
              let hexText = '';
              for (let j = 0; j < hex.length; j += 2) {
                if (j + 1 < hex.length) {
                  const charCode = parseInt(hex.substr(j, 2), 16);
                  if (charCode >= 32 && charCode <= 126) {
                    hexText += String.fromCharCode(charCode);
                  }
                }
              }
              if (hexText.length > 1) {
                extracted += hexText + ' ';
              }
            } catch (e) {
              // Ignore conversion errors
            }
          });
        }
      }
    });
    
    // Clean up the extracted text
    extracted = extracted
      .replace(/\\r|\\n/g, ' ')  // Replace escaped newlines
      .replace(/\s+/g, ' ')      // Replace multiple spaces with a single space
      .trim();
    
    return extracted;
  } catch (error) {
    console.error('Fallback extraction failed:', error);
    return '';
  }
};

/**
 * Extracts text from a PDF file using the fallback method
 * 
 * @param {File} file - The PDF file
 * @returns {Promise<string>} - The extracted text
 */
export const extractTextFromPDFFallback = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    return extractTextFallback(arrayBuffer);
  } catch (error) {
    console.error('PDF fallback extraction error:', error);
    throw new Error('Fallback extraction failed: ' + (error.message || 'Unknown error'));
  }
};

export default {
  extractTextFallback,
  extractTextFromPDFFallback
};
