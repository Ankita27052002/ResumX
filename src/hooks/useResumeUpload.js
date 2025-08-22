import { useState, useCallback } from 'react';
import { extractTextFromFile } from '@utils/fileParser';
import PDFUtils from '@utils/pdfUtils';
import useFileParsingMetrics from './useFileParsingMetrics';

/**
 * Custom hook for handling resume file uploads
 */
const useResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileText, setFileText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileType, setFileType] = useState(null);
  
  // Use the metrics tracking hook
  const { trackAttempt, trackSuccess, trackFailure } = useFileParsingMetrics();

  const handleFileChange = useCallback(async (event) => {
    const selectedFile = event.target.files[0];
    
    if (!selectedFile) return;
    
    // Reset state
    setError(null);
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setIsLoading(true);
    
    try {
      console.log(`Processing file: ${selectedFile.name}, size: ${selectedFile.size} bytes, type: ${selectedFile.type}`);
      
      // Validate file type
      const validFileTypes = ['pdf', 'docx', 'txt'];
      const fileExt = selectedFile.name.split('.').pop().toLowerCase();
      
      if (!validFileTypes.includes(fileExt)) {
        throw new Error(`Unsupported file type: ${fileExt}. Please upload a PDF, DOCX, or TXT file.`);
      }
      
      setFileType(fileExt);
      
      // Track this attempt
      trackAttempt(fileExt);
      
      // Extra validation for PDF files
      if (fileExt === 'pdf') {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Check PDF header signature - %PDF-
        if (!(uint8Array[0] === 0x25 && uint8Array[1] === 0x50 && 
              uint8Array[2] === 0x44 && uint8Array[3] === 0x46)) {
          throw new Error('Invalid PDF format: This file does not appear to be a valid PDF.');
        }
        
        // Check if this might be a scanned PDF
        const isScanned = await PDFUtils.isScannedPDF(arrayBuffer);
        if (isScanned) {
          console.warn('This appears to be a scanned PDF, extraction might be limited');
          // We don't throw an error here, we'll try to extract what we can
        }
      }
      
      // Extract text from the file with better error handling
      console.log(`Starting text extraction for ${fileExt} file`);
      const startTime = Date.now();
      const text = await extractTextFromFile(selectedFile);
      const endTime = Date.now();
      console.log(`Text extraction completed in ${endTime - startTime}ms`);
      
      // Check if we got meaningful text content
      if (!text || text.trim() === '') {
        console.error('No text content extracted from the file');
        throw new Error('No text could be extracted from the file. It may be empty or contain only images.');
      }
      
      // Basic validation of extracted content
      if (text.length < 50 && fileExt !== 'txt') {
        console.warn('Very little text extracted, file might be problematic');
        throw new Error('Very little text could be extracted. The file might be scanned, password-protected, or contain primarily images.');
      }
      
      console.log(`Successfully extracted ${text.length} characters of text`);
      setFileText(text);
      
      // Track success
      trackSuccess(fileExt);
    } catch (err) {
      console.error('File processing error:', err);
      setError(err.message || 'Failed to process file');
      setFile(null);
      setFileName('');
      setFileText('');
      
      // Track failure if we know the file type
      if (fileType) {
        trackFailure(fileType, err.message || 'Unknown error');
      }
      
      setFileType(null);
    } finally {
      setIsLoading(false);
    }
  }, [trackAttempt, trackSuccess, trackFailure]);

  const reset = useCallback(() => {
    setFile(null);
    setFileName('');
    setFileText('');
    setError(null);
    setIsLoading(false);
    setFileType(null);
  }, []);

  return {
    file,
    fileName,
    fileText,
    isLoading,
    error,
    fileType,
    handleFileChange,
    reset
  };
};

export default useResumeUpload;