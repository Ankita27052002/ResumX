import React, { useState, useEffect } from 'react';
import '../../styles/ResumePreview.css';

const ResumePreview = ({ file }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [pageCount, setPageCount] = useState(1);

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

        // Create object URL for the PDF file
        const url = URL.createObjectURL(file);
        setPdfUrl(url);
        
        // Try to get page count (optional, fallback to 1 if fails)
        try {
          const arrayBuffer = await file.arrayBuffer();
          const text = new TextDecoder().decode(arrayBuffer);
          const pageMatches = text.match(/\/Count\s+(\d+)/);
          if (pageMatches) {
            setPageCount(parseInt(pageMatches[1]));
          }
        } catch (e) {
          // Fallback to 1 page if count detection fails
          setPageCount(1);
        }

      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load PDF preview');
      } finally {
        setLoading(false);
      }
    };

    loadPDF();

    // Cleanup function to revoke object URL
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [file]);

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
            {pageCount} page{pageCount !== 1 ? 's' : ''}
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
        
        <div className="resume-preview-pdf">
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              className="resume-preview-iframe"
              title="Resume Preview"
              style={{
                width: '100%',
                height: isExpanded ? '500px' : '300px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
