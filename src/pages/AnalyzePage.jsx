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
    atsScore,
    isAnalyzing,
    processingStage,
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

  const hasAnalysisResults = analysis || extractedInfo || jobRecommendations || atsScore;

  return (
    <Layout>
      <div className="w-full analyze-page-container">
        <div className="analyze-page-content">
          <div className="analyze-header-section">
            <h1 className="analyze-title">Resume Analysis</h1>
            <p className="analyze-subtitle">Upload your resume and get AI-powered feedback and insights</p>
          </div>

          {!hasAnalysisResults && !isAnalyzing && (
            <div className="analyze-upload-section">
              <FileUploader onFileTextReady={handleFileTextReady} />
              {fileText && (
                <div className="analyze-button-container">
                  <Button 
                    variant="primary" 
                    size="large"
                    className="analyze-button"
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
            <div className="analyze-results-section">
              <AnalysisResult
                analysis={analysis}
                extractedInfo={extractedInfo}
                jobRecommendations={jobRecommendations}
                atsScore={atsScore}
                isLoading={isAnalyzing}
                processingStage={processingStage}
              />
              {hasAnalysisResults && !isAnalyzing && (
                <div className="analyze-reset-container">
                  <Button 
                    variant="secondary" 
                    className="analyze-reset-button"
                    onClick={handleReset}
                  >
                    Analyze Another Resume
                  </Button>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="analyze-error-section">
              <p className="analyze-error-text">Error: {error}</p>
              <Button 
                variant="danger" 
                className="analyze-error-button"
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
