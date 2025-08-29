import React from 'react';
import '../../styles/ATSScore.css';

const ATSScoreDisplay = ({ atsScore }) => {
  if (!atsScore) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="ats-score-container">
      {/* Overall Score Display */}
      <div className="ats-overall-score">
        <div className="ats-score-circle">
          <div className={`ats-score-number ${getScoreColor(atsScore.overallScore)}`}>
            {atsScore.overallScore}
          </div>
          <div className="ats-score-label">ATS Score</div>
        </div>
        <div className="ats-score-description">
          <h3 className="ats-section-title">Overall ATS Compatibility</h3>
          <p className="ats-section-text">
            Your resume scored {atsScore.overallScore}/100 for ATS compatibility.
            {atsScore.overallScore >= 80 && " Excellent! Your resume is well-optimized for ATS systems."}
            {atsScore.overallScore >= 60 && atsScore.overallScore < 80 && " Good score with room for improvement."}
            {atsScore.overallScore < 60 && " Consider optimizing your resume for better ATS compatibility."}
          </p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="ats-categories">
        <h4 className="ats-categories-title">Score Breakdown</h4>
        <div className="ats-categories-grid">
          {Object.entries(atsScore.categories).map(([category, data]) => (
            <div key={category} className="ats-category-item">
              <div className="ats-category-header">
                <span className="ats-category-name">
                  {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
                </span>
                <span className={`ats-category-score ${getScoreColor(data.score)}`}>
                  {data.score}/100
                </span>
              </div>
              <div className="ats-progress-bar">
                <div 
                  className={`ats-progress-fill ${getProgressBarColor(data.score)}`}
                  style={{ width: `${data.score}%` }}
                ></div>
              </div>
              <p className="ats-category-feedback">{data.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
      {atsScore.recommendations && atsScore.recommendations.length > 0 && (
        <div className="ats-recommendations">
          <h4 className="ats-section-title">Optimization Recommendations</h4>
          <ul className="ats-list">
            {atsScore.recommendations.map((recommendation, index) => (
              <li key={index} className="ats-list-item ats-recommendation-item">
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Strengths Section */}
      {atsScore.strengths && atsScore.strengths.length > 0 && (
        <div className="ats-strengths">
          <h4 className="ats-section-title ats-strengths-title">Strengths</h4>
          <ul className="ats-list">
            {atsScore.strengths.map((strength, index) => (
              <li key={index} className="ats-list-item ats-strength-item">
                {strength}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvements Section */}
      {atsScore.improvements && atsScore.improvements.length > 0 && (
        <div className="ats-improvements">
          <h4 className="ats-section-title ats-improvements-title">Areas for Improvement</h4>
          <ul className="ats-list">
            {atsScore.improvements.map((improvement, index) => (
              <li key={index} className="ats-list-item ats-improvement-item">
                {improvement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ATSScoreDisplay;
