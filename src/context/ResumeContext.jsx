import React, { createContext, useContext, useState, useCallback } from 'react';
import { analyzeResume, extractResumeInfo, generateJobRecommendations } from '@services/aiService';

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
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [extractedInfo, setExtractedInfo] = useState(null);
  const [jobRecommendations, setJobRecommendations] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  // Function to analyze the resume
  const analyzeResumeText = useCallback(async text => {
    if (!text) return;
    console.log('Text', text);

    setResumeText(text);
    setIsAnalyzing(true);
    setError(null);

    try {
      // Run analysis in parallel
      const [analysisResult, extractedInfoResult] = await Promise.all([
        analyzeResume(text),
        extractResumeInfo(text),
      ]);

      setAnalysis(analysisResult);
      setExtractedInfo(extractedInfoResult);

      console.log('Analysis Result', analysisResult);

      // Generate job recommendations based on extracted info
      const recommendations = await generateJobRecommendations(extractedInfoResult);
      setJobRecommendations(recommendations);

      return {
        analysis: analysisResult,
        extractedInfo: extractedInfoResult,
        jobRecommendations: recommendations,
      };
    } catch (err) {
      setError(err.message || 'Failed to analyze resume');
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  // Clear all analysis data
  const resetAnalysis = useCallback(() => {
    setResumeText('');
    setAnalysis(null);
    setExtractedInfo(null);
    setJobRecommendations(null);
    setError(null);
  }, []);

  // Context value
  const value = {
    resumeText,
    setResumeText,
    analysis,
    extractedInfo,
    jobRecommendations,
    isAnalyzing,
    error,
    analyzeResumeText,
    resetAnalysis,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};

export default ResumeContext;
