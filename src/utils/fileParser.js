import pdfjsLib from './pdfWorker';
import { extractTextFromPDFFallback } from './pdfFallback';

/**
 * Extract text from a PDF file
 * @param {File} file - The PDF file to extract text from
 * @returns {Promise<string>} - The extracted text
 */
export const extractTextFromPDF = async file => {
  try {
    console.log('Starting PDF extraction with primary method');

    // Read file as ArrayBuffer directly - more reliable approach
    const arrayBuffer = await file.arrayBuffer();
    console.log('File loaded as ArrayBuffer, size:', arrayBuffer.byteLength);

    // Create a typed array from the buffer
    const uint8Array = new Uint8Array(arrayBuffer);

    // Check PDF header signature - %PDF-
    if (
      !(
        uint8Array[0] === 0x25 &&
        uint8Array[1] === 0x50 &&
        uint8Array[2] === 0x44 &&
        uint8Array[3] === 0x46
      )
    ) {
      throw new Error('Invalid PDF format: Missing PDF signature');
    }

    console.log('Valid PDF format detected, loading document');

    // Make sure the PDF.js library is properly initialized
    if (!pdfjsLib || !pdfjsLib.getDocument) {
      throw new Error('PDF.js library not properly initialized');
    }

    try {
      // Set additional options for more reliable loading
      const loadingOptions = {
        data: uint8Array,
        // Disable worker to use main thread if we have issues
        disableWorker: false,
        // Add CMap support for more PDF types
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@' + pdfjsLib.version + '/cmaps/',
        cMapPacked: true,
        // Disable range requests which might cause issues
        disableRange: true,
        // Disable streaming for more reliable loading
        disableStream: true,
      };

      // Create the loading task
      console.log('PDF loading task created');
      const loadingTask = pdfjsLib.getDocument(loadingOptions);

      // Set a timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('PDF loading timed out after 30 seconds')), 30000);
      });

      // Load the PDF with timeout
      const pdf = await Promise.race([loadingTask.promise, timeoutPromise]);
      console.log('PDF document loaded successfully');

      let fullText = '';

      // Get the total number of pages
      const numPages = pdf.numPages;
      console.log(`PDF has ${numPages} pages`);

      // Extract text from each page
      for (let i = 1; i <= numPages; i++) {
        try {
          console.log(`Processing page ${i} of ${numPages}`);
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();

          if (!textContent || !textContent.items || textContent.items.length === 0) {
            console.warn(`No text content found on page ${i}`);
            continue;
          }

          const pageText = textContent.items.map(item => item.str || '').join(' ');

          fullText += pageText + '\n';
          console.log(`Extracted ${pageText.length} characters from page ${i}`);
        } catch (pageError) {
          console.warn(`Error extracting text from page ${i}:`, pageError);
        }
      }

      // Clean up the text
      fullText = fullText.trim();

      if (!fullText) {
        console.warn('No text extracted from PDF, the file might be scanned or image-based');
        throw new Error('No text could be extracted. The PDF might be scanned or image-based.');
      }

      console.log('Successfully extracted text from PDF:', fullText.substring(0, 50) + '...');
      return fullText;
    } catch (pdfJsError) {
      // If PDF.js extraction fails, try the fallback method
      console.warn('PDF.js extraction failed, trying fallback method:', pdfJsError);

      // Use our fallback extractor
      console.log('Attempting fallback PDF text extraction');
      const fallbackText = await extractTextFromPDFFallback(file);

      if (fallbackText && fallbackText.trim().length > 0) {
        console.log('Fallback extraction succeeded with', fallbackText.length, 'characters');
        return fallbackText;
      } else {
        throw pdfJsError; // Re-throw if fallback also failed
      }
    }
  } catch (error) {
    console.error('Error extracting text from PDF:', error);

    // Provide specific error messages
    if (error.name === 'PasswordException') {
      throw new Error('This PDF is password protected. Please upload an unprotected PDF.');
    } else if (error.name === 'InvalidPDFException' || error.message.includes('Invalid PDF')) {
      throw new Error('Invalid or corrupted PDF file. Please check the file and try again.');
    } else if (error.message.includes('No text could be extracted')) {
      throw new Error('No text could be extracted. The PDF might be scanned or image-based.');
    } else if (
      error.message.includes('worker failed') ||
      error.message.includes('Worker') ||
      error.message.includes('Failed to fetch')
    ) {
      throw new Error(
        'PDF processing failed. Please try converting to a plain text format or try another file.'
      );
    }

    throw new Error('Failed to extract text from PDF file: ' + (error.message || 'Unknown error'));
  }
};

/**
 * Extract text from a DOCX file
 * @param {File} file - The DOCX file to extract text from
 * @returns {Promise<string>} - The extracted text
 */
export const extractTextFromDOCX = async file => {
  try {
    console.log('Starting DOCX extraction');

    // A better approach for DOCX files in a browser environment
    const arrayBuffer = await file.arrayBuffer();

    // Convert ArrayBuffer to Uint8Array
    const uint8Array = new Uint8Array(arrayBuffer);

    // First, check if the file starts with the DOCX signature (PK..)
    if (!(uint8Array[0] === 0x50 && uint8Array[1] === 0x4b)) {
      throw new Error('Invalid DOCX file format');
    }

    console.log('Valid DOCX format detected, extracting text');

    // Look for "document.xml" content which contains the main text
    // DOCX files are ZIP files with XML content
    let textStartIndex = -1;
    let documentXmlStart = -1;

    // Find the document.xml part in the DOCX (ZIP) file
    const documentXmlSignature = 'document.xml';
    for (let i = 0; i < uint8Array.length - documentXmlSignature.length; i++) {
      let found = true;
      for (let j = 0; j < documentXmlSignature.length; j++) {
        if (uint8Array[i + j] !== documentXmlSignature.charCodeAt(j)) {
          found = false;
          break;
        }
      }
      if (found) {
        documentXmlStart = i;
        break;
      }
    }

    if (documentXmlStart === -1) {
      console.log('document.xml not found, trying content extraction directly');
      // Fallback to searching for <w:t> tags directly
      textStartIndex = 0;
    } else {
      // If we found document.xml, start from there
      textStartIndex = documentXmlStart;
      console.log('Found document.xml at position:', documentXmlStart);
    }

    // Extract text from DOCX XML content
    let result = '';
    let inTag = false;
    let currentTag = '';
    let skipUntilTagEnd = false;

    // Search for text between XML tags, starting from where we think content begins
    for (let i = textStartIndex; i < uint8Array.length; i++) {
      // Convert byte to character
      const char = String.fromCharCode(uint8Array[i]);

      if (char === '<') {
        inTag = true;
        currentTag = '';
      } else if (char === '>') {
        inTag = false;
        if (currentTag === '/w:t' || currentTag === '/w:p') {
          result += ' '; // Add space between text segments or paragraphs
        }
        skipUntilTagEnd = ['w:instrText', 'mc:Choice', 'mc:Fallback'].some(tag =>
          currentTag.includes(tag)
        );
      } else if (inTag) {
        currentTag += char;
      } else if (
        !skipUntilTagEnd &&
        (currentTag.includes('w:t') || currentTag === 'text:p') &&
        !inTag
      ) {
        // Grab text in w:t tags (Word) or text:p tags (some other formats)
        result += char;
      }
    }

    // Clean up the extracted text
    result = result.replace(/\s+/g, ' ').trim();

    if (!result) {
      console.log('No text extracted, trying simpler approach');

      // Last resort: just look for any readable text in the file
      result = '';
      let inText = false;
      let textBuffer = '';

      for (let i = 0; i < uint8Array.length; i++) {
        const byte = uint8Array[i];
        // Check for readable ASCII characters
        if (byte >= 32 && byte <= 126) {
          const char = String.fromCharCode(byte);
          textBuffer += char;
          inText = true;
        } else if (inText) {
          // If we have accumulated some text and hit a non-ASCII char
          if (textBuffer.length > 5) {
            // Only keep text fragments of reasonable length
            result += textBuffer + ' ';
          }
          textBuffer = '';
          inText = false;
        }
      }

      result = result.replace(/\s+/g, ' ').trim();
    }

    if (!result) {
      throw new Error('Could not extract text from the DOCX file.');
    }

    console.log('Successfully extracted text from DOCX:', result.substring(0, 50) + '...');
    return result;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error(
      'Failed to extract text from DOCX file. Please try converting to PDF or TXT format.'
    );
  }
};

/**
 * Extract text from a file based on its type
 * @param {File} file - The file to extract text from
 * @returns {Promise<string>} - The extracted text
 */
export const extractTextFromFile = async file => {
  // Validate file size (5MB limit)
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size exceeds the 5MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.`
    );
  }

  const fileType = file.name.split('.').pop().toLowerCase();

  switch (fileType) {
    case 'pdf':
      return extractTextFromPDF(file);
    case 'docx':
      return extractTextFromDOCX(file);
    case 'txt':
      return await file.text();
    default:
      throw new Error(
        `Unsupported file type: ${fileType}. Please upload a PDF, DOCX, or TXT file.`
      );
  }
};

export default {
  extractTextFromFile,
  extractTextFromPDF,
  extractTextFromDOCX,
};
