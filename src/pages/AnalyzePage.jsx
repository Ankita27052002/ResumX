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
      <div className="max-w-3xl mx-auto w-full">
        <div className="bg-white/80 shadow-xl rounded-2xl px-6 py-10 md:px-12 md:py-14 mb-12 border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Resume Analysis</h1>
            <p className="mt-4 text-lg text-gray-500">Upload your resume and get AI-powered feedback and insights</p>
          </div>

          {!hasAnalysisResults && !isAnalyzing && (
            <div className="mb-10">
              <FileUploader onFileTextReady={handleFileTextReady} />
              {fileText && (
                <div className="mt-8 flex justify-center">
                  <Button 
                    variant="primary" 
                    size="large"
                    className="w-full max-w-xs shadow-lg"
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
            <div className="">
              <AnalysisResult
                analysis={analysis}
                extractedInfo={extractedInfo}
                jobRecommendations={jobRecommendations}
                isLoading={isAnalyzing}
              />
              {hasAnalysisResults && !isAnalyzing && (
                <div className="mt-10 flex justify-center">
                  <Button 
                    variant="secondary" 
                    className="w-full max-w-xs"
                    onClick={handleReset}
                  >
                    Analyze Another Resume
                  </Button>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-8 p-5 bg-red-50 border border-red-200 text-red-700 rounded-xl max-w-lg mx-auto shadow">
              <p className="font-semibold text-base">Error: {error}</p>
              <Button 
                variant="danger" 
                className="mt-4 w-full"
                onClick={handleReset}
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withErrorBoundary(AnalyzePage);
