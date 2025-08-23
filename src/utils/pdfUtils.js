import * as pdfjs from 'pdfjs-dist';
/**
 * Extract text from a PDF file
 * @param {File|Blob|ArrayBuffer} pdfFile - The PDF file to extract text from
 * @returns {Promise<string>} - The extracted text
 */
export const extractTextFromPDF = async pdfFile => {
  try {
    let pdfData;

    if (pdfFile instanceof File || pdfFile instanceof Blob) {
      // Convert the file to ArrayBuffer
      pdfData = await pdfFile.arrayBuffer();
    } else if (pdfFile instanceof ArrayBuffer) {
      pdfData = pdfFile;
    } else if (typeof pdfFile === 'string') {
      // Handle base64 string
      try {
        const binary = atob(pdfFile.replace(/^data:application\/pdf;base64,/, ''));
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        pdfData = bytes.buffer;
      } catch (error) {
        console.error('Error converting base64 to ArrayBuffer:', error);
        return pdfFile; // Return the original string if it's not a valid base64
      }
    } else {
      throw new Error('Unsupported PDF format');
    }

    // Enable the built-in worker fallbacks
    const loadingTask = pdfjs.getDocument({
      data: pdfData,
      useWorkerFetch: false, // Prevents worker from making network requests
      isEvalSupported: false, // Prevents eval which may be blocked in some browsers
      disableFontFace: true, // Prevents font loading issues
    });

    const pdf = await loadingTask.promise;
    let extractedText = '';

    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      extractedText += pageText + '\n\n';
    }

    if (extractedText.trim().length === 0) {
      throw new Error(
        'No text could be extracted from this PDF. It may be a scanned document or image-based PDF.'
      );
    }

    return extractedText.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error(
      'Failed to extract text from the PDF file. Please try again or use a different file format.'
    );
  }
};

/**
 * Check if a file is a valid PDF
 * @param {File} file - The file to check
 * @returns {boolean} - Whether the file is a valid PDF
 */
export const isValidPDF = file => {
  return file && file.type === 'application/pdf';
};

/**
 * Clean and validate extracted text
 * @param {string} text - The text to clean
 * @returns {string} - The cleaned text
 */
export const cleanResumeText = text => {
  if (!text) return '';

  // Check if the text contains PDF binary markers
  if (
    text.includes('%PDF-') ||
    text.includes('endstream') ||
    text.includes('endobj') ||
    text.includes('FlateDecode')
  ) {
    throw new Error('The text contains raw PDF binary data. Please use proper text extraction.');
  }

  // Remove any control characters and normalize whitespace
  const cleaned = text
    .replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Validate the cleaned text
  if (cleaned.length < 50) {
    throw new Error('The extracted text is too short to be a valid resume.');
  }

  return cleaned;
};
