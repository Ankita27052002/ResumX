import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import '../../styles/ResumePreview.css';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs';

const ResumePreview = ({ file }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const canvasRefs = useRef([]);

  useEffect(() => {
    if (!file) {
      setLoading(false);
      return;
    }

    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);

        // Only process PDF files
        if (file.type !== 'application/pdf') {
          setError('Preview only available for PDF files');
          setLoading(false);
          return;
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        const pagePromises = [];
        const numPages = Math.min(pdf.numPages, 10); // Limit to 10 pages for performance

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          pagePromises.push(renderPage(pdf, pageNum));
        }

        const renderedPages = await Promise.all(pagePromises);
        setPages(renderedPages.filter(page => page !== null));
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load PDF preview');
      } finally {
        setLoading(false);
      }
    };

    loadPDF();
  }, [file]);

  const renderPage = async (pdf, pageNumber) => {
    try {
      const page = await pdf.getPage(pageNumber);
      const scale = 0.3; // Small scale for preview
      const viewport = page.getViewport({ scale });

      return {
        pageNumber,
        page,
        viewport,
        width: viewport.width,
        height: viewport.height,
      };
    } catch (err) {
      console.error(`Error preparing page ${pageNumber}:`, err);
      return null;
    }
  };

  const renderCanvas = async (canvas, pageData) => {
    if (!canvas || !pageData) return;
    
    const context = canvas.getContext('2d');
    canvas.height = pageData.viewport.height;
    canvas.width = pageData.viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: pageData.viewport,
    };

    try {
      await pageData.page.render(renderContext).promise;
    } catch (err) {
      console.error('Error rendering canvas:', err);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!file) {
    return null;
  }

  if (loading) {
    return (
      <div className="resume-preview-container">
        <div className="resume-preview-header">
          <h3 className="resume-preview-title">Resume Preview</h3>
        </div>
        <div className="resume-preview-loading">
          <div className="resume-preview-spinner"></div>
          <p>Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="resume-preview-container">
        <div className="resume-preview-header">
          <h3 className="resume-preview-title">Resume Preview</h3>
        </div>
        <div className="resume-preview-error">
          <p>{error}</p>
          <div className="resume-preview-file-info">
            <p className="resume-preview-filename">{file.name}</p>
            <p className="resume-preview-filesize">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`resume-preview-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="resume-preview-header">
        <h3 className="resume-preview-title">Resume Preview</h3>
        <div className="resume-preview-controls">
          <span className="resume-preview-page-count">
            {pages.length} page{pages.length !== 1 ? 's' : ''}
          </span>
          <button
            className="resume-preview-toggle"
            onClick={toggleExpanded}
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
      </div>
      
      <div className="resume-preview-content">
        <div className="resume-preview-file-info">
          <p className="resume-preview-filename">{file.name}</p>
          <p className="resume-preview-filesize">
            {(file.size / 1024).toFixed(1)} KB
          </p>
        </div>
        
        <div className="resume-preview-pages">
          {pages.map((pageData, index) => (
            pageData && (
              <div key={index} className="resume-preview-page">
                <div className="resume-preview-page-label">
                  Page {pageData.pageNumber}
                </div>
                <canvas
                  ref={(canvas) => {
                    if (canvas && pageData) {
                      renderCanvas(canvas, pageData);
                    }
                  }}
                  className="resume-preview-page-canvas"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
