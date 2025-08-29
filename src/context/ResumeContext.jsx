import React, { createContext, useContext, useState, useCallback } from 'react';
import { analyzeResume, extractResumeInfo, generateJobRecommendations, calculateATSScore } from '@services/aiService';
import { extractTextFromPDF, isValidPDF } from '@utils/pdfUtils';

// Create context
const ResumeContext = createContext();

// Custom hook for using the context
export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};

// Provider component
export const ResumeProvider = ({ children }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [extractedInfo, setExtractedInfo] = useState(null);
  const [jobRecommendations, setJobRecommendations] = useState(null);
  const [atsScore, setATSScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [processingStage, setProcessingStage] = useState(null);

  // Function to handle file uploads and extract text
  const processResumeFile = useCallback(async file => {
    if (!file) {
      setError('No file provided');
      return null;
    }

    try {
      setIsAnalyzing(true);
      setProcessingStage('extracting');
      setResumeFile(file);

      let text;

      // Handle PDF files
      if (isValidPDF(file)) {
        text = await extractTextFromPDF(file);
      }
      // Handle text files
      else if (file.type === 'text/plain') {
        text = await file.text();
      }
      // Handle other file types (docx, etc.) - would need additional libraries
      else {
        throw new Error('Unsupported file format. Please upload a PDF or text file.');
      }

      setResumeText(text);
      return text;
    } catch (err) {
      console.error('Error processing resume file:', err);
      setError(err.message || 'Failed to process resume file');
      return null;
    } finally {
      setProcessingStage(null);
    }
  }, []);

  // Function to analyze the resume
  const analyzeResumeText = useCallback(
    async text => {
      if (!text && !resumeText) {
        setError('No resume text to analyze');
        return null;
      }

      const textToAnalyze = text || resumeText;

      setIsAnalyzing(true);
      setError(null);

      try {
        // Update processing stage for UI feedback
        setProcessingStage('analyzing');

        // Run core analysis first (most important)
        setProcessingStage('It may take one or two minutes...');
        const analysisResult = await analyzeResume(textToAnalyze);
        setAnalysis(analysisResult);

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Run extraction and ATS scoring in parallel (related operations)
        setProcessingStage('Extracting information and calculating ATS score...');
        const [extractedInfoResult, atsScoreResult] = await Promise.all([
          extractResumeInfo(textToAnalyze),
          calculateATSScore(textToAnalyze),
        ]);

        setExtractedInfo(extractedInfoResult);
        setATSScore(atsScoreResult);

        // Update processing stage
        setProcessingStage('Generating career recommendations...');

        // Another small delay before job recommendations
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate job recommendations based on extracted info
        const recommendations = await generateJobRecommendations(extractedInfoResult);
        setJobRecommendations(recommendations);

        return {
          analysis: analysisResult,
          extractedInfo: extractedInfoResult,
          jobRecommendations: recommendations,
          atsScore: atsScoreResult,
        };
      } catch (err) {
        setError(err.message || 'Failed to analyze resume');
        throw err;
      } finally {
        setIsAnalyzing(false);
        setProcessingStage(null);
      }
    },
    [resumeText]
  );

  // Analyze directly from file
  const analyzeResumeFile = useCallback(
    async file => {
      const extractedText = await processResumeFile(file);
      if (extractedText) {
        return analyzeResumeText(extractedText);
      }
      return null;
    },
    [processResumeFile, analyzeResumeText]
  );

  // Clear all analysis data
  const resetAnalysis = useCallback(() => {
    setResumeFile(null);
    setResumeText('');
    setAnalysis(null);
    setExtractedInfo(null);
    setJobRecommendations(null);
    setATSScore(null);
    setError(null);
    setProcessingStage(null);
  }, []);

  const value = {
    resumeFile,
    resumeText,
    analysis,
    extractedInfo,
    jobRecommendations,
    atsScore,
    isAnalyzing,
    processingStage,
    error,
    processResumeFile,
    analyzeResumeText,
    analyzeResumeFile,
    resetAnalysis,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};

export default ResumeContext;
