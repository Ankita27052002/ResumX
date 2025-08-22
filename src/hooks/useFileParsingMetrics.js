import { useEffect, useState } from 'react';

/**
 * Custom hook to track and analyze file parsing metrics
 * This is used to improve the reliability of the file parsing system
 */
const useFileParsingMetrics = () => {
  // Store metrics in localStorage to persist across sessions
  const [metrics, setMetrics] = useState(() => {
    // Retrieve existing metrics or initialize with defaults
    const storedMetrics = localStorage.getItem('file_parsing_metrics');
    return storedMetrics ? JSON.parse(storedMetrics) : {
      totalAttempts: 0,
      successfulParses: 0,
      failedParses: 0,
      typeStats: {
        pdf: { attempts: 0, successes: 0, failures: 0 },
        docx: { attempts: 0, successes: 0, failures: 0 },
        txt: { attempts: 0, successes: 0, failures: 0 }
      },
      recentErrors: [],
      lastUpdated: new Date().toISOString()
    };
  });
  
  // Update localStorage whenever metrics change
  useEffect(() => {
    localStorage.setItem('file_parsing_metrics', JSON.stringify(metrics));
  }, [metrics]);
  
  // Track a file parsing attempt
  const trackAttempt = (fileType) => {
    setMetrics(prev => {
      const updatedTypeStats = { ...prev.typeStats };
      
      // Ensure we have an entry for this file type
      if (!updatedTypeStats[fileType]) {
        updatedTypeStats[fileType] = { attempts: 0, successes: 0, failures: 0 };
      }
      
      // Update metrics
      return {
        ...prev,
        totalAttempts: prev.totalAttempts + 1,
        typeStats: {
          ...updatedTypeStats,
          [fileType]: {
            ...updatedTypeStats[fileType],
            attempts: updatedTypeStats[fileType].attempts + 1
          }
        },
        lastUpdated: new Date().toISOString()
      };
    });
  };
  
  // Track a successful parse
  const trackSuccess = (fileType) => {
    setMetrics(prev => {
      const updatedTypeStats = { ...prev.typeStats };
      
      // Ensure we have an entry for this file type
      if (!updatedTypeStats[fileType]) {
        updatedTypeStats[fileType] = { attempts: 1, successes: 0, failures: 0 };
      }
      
      // Update metrics
      return {
        ...prev,
        successfulParses: prev.successfulParses + 1,
        typeStats: {
          ...updatedTypeStats,
          [fileType]: {
            ...updatedTypeStats[fileType],
            successes: updatedTypeStats[fileType].successes + 1
          }
        },
        lastUpdated: new Date().toISOString()
      };
    });
  };
  
  // Track a failed parse
  const trackFailure = (fileType, errorMessage) => {
    setMetrics(prev => {
      const updatedTypeStats = { ...prev.typeStats };
      
      // Ensure we have an entry for this file type
      if (!updatedTypeStats[fileType]) {
        updatedTypeStats[fileType] = { attempts: 1, successes: 0, failures: 0 };
      }
      
      // Keep only the 10 most recent errors
      const recentErrors = [
        { 
          fileType, 
          error: errorMessage, 
          timestamp: new Date().toISOString() 
        },
        ...prev.recentErrors
      ].slice(0, 10);
      
      // Update metrics
      return {
        ...prev,
        failedParses: prev.failedParses + 1,
        typeStats: {
          ...updatedTypeStats,
          [fileType]: {
            ...updatedTypeStats[fileType],
            failures: updatedTypeStats[fileType].failures + 1
          }
        },
        recentErrors,
        lastUpdated: new Date().toISOString()
      };
    });
  };
  
  // Calculate success rate
  const getSuccessRate = (fileType = null) => {
    if (fileType) {
      const typeStat = metrics.typeStats[fileType];
      if (!typeStat || typeStat.attempts === 0) return 0;
      return (typeStat.successes / typeStat.attempts) * 100;
    }
    
    if (metrics.totalAttempts === 0) return 0;
    return (metrics.successfulParses / metrics.totalAttempts) * 100;
  };
  
  // Reset metrics
  const resetMetrics = () => {
    setMetrics({
      totalAttempts: 0,
      successfulParses: 0,
      failedParses: 0,
      typeStats: {
        pdf: { attempts: 0, successes: 0, failures: 0 },
        docx: { attempts: 0, successes: 0, failures: 0 },
        txt: { attempts: 0, successes: 0, failures: 0 }
      },
      recentErrors: [],
      lastUpdated: new Date().toISOString()
    });
  };
  
  return {
    metrics,
    trackAttempt,
    trackSuccess,
    trackFailure,
    getSuccessRate,
    resetMetrics
  };
};

export default useFileParsingMetrics;
