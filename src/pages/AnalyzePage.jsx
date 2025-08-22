import React, { useState, useCallback } from 'react';
import { withErrorBoundary } from '@components/common/ErrorBoundary';
import Layout from '@components/layout/Layout';
import FileUploader from '@components/resume/FileUploader';
import AnalysisResult from '@components/resume/AnalysisResult';
import Button from '@components/common/Button';
import { useResumeContext } from '@context/ResumeContext';

const AnalyzePage = () => {
  const [fileText, setFileText] = useState('');
  const {
    analysis,
    extractedInfo,
    jobRecommendations,
    isAnalyzing,
    error,
    analyzeResumeText,
    resetAnalysis
  } = useResumeContext();

  const handleFileTextReady = useCallback((text) => {
    setFileText(text);
  }, []);

  const handleAnalyzeClick = useCallback(async () => {
    if (!fileText) return;
    
    try {
      await analyzeResumeText(fileText);
    } catch (err) {
      console.error('Failed to analyze resume:', err);
    }
  }, [fileText, analyzeResumeText]);

  const handleReset = useCallback(() => {
    setFileText('');
    resetAnalysis();
  }, [resetAnalysis]);

  const hasAnalysisResults = analysis || extractedInfo || jobRecommendations;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Resume Analysis</h1>
          <p className="mt-3 text-lg text-gray-500">
            Upload your resume and get AI-powered feedback and insights
          </p>
        </div>
        
        {!hasAnalysisResults && !isAnalyzing && (
          <div className="mb-10">
            <FileUploader onFileTextReady={handleFileTextReady} />
            
            {fileText && (
              <div className="mt-8 text-center">
                <Button 
                  variant="primary" 
                  size="large"
                  onClick={handleAnalyzeClick}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze My Resume'}
                </Button>
              </div>
            )}
          </div>
        )}
        
        {(hasAnalysisResults || isAnalyzing) && (
          <div>
            <AnalysisResult
              analysis={analysis}
              extractedInfo={extractedInfo}
              jobRecommendations={jobRecommendations}
              isLoading={isAnalyzing}
            />
            
            {hasAnalysisResults && !isAnalyzing && (
              <div className="mt-10 text-center">
                <Button 
                  variant="secondary" 
                  onClick={handleReset}
                >
                  Analyze Another Resume
                </Button>
              </div>
            )}
          </div>
        )}
        
        {error && (
          <div className="mt-8 p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg max-w-lg mx-auto">
            <p className="font-medium">Error: {error}</p>
            <Button 
              variant="danger" 
              className="mt-3"
              onClick={handleReset}
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withErrorBoundary(AnalyzePage);
