import React, { useEffect } from 'react';
import ATSScoreDisplay from './ATSScoreDisplay';
import ResumePreview from './ResumePreview';
import '../../styles/AnalysisResult.css';

const AnalysisResult = ({ analysis, extractedInfo, jobRecommendations, atsScore, resumeFile, isLoading, processingStage }) => {
  useEffect(() => {
    // Tab switching functionality
    const handleTabClick = (e) => {
      e.preventDefault();
      
      const target = e.target.getAttribute('href').substring(1);
      
      // Hide all content sections
      const sections = document.querySelectorAll('.analysis-content-section');
      sections.forEach(section => {
        section.classList.add('hidden');
      });
      
      // Remove active class from all tabs
      const tabs = document.querySelectorAll('.analysis-tab');
      tabs.forEach(tab => {
        tab.classList.remove('analysis-tab-active', 'active');
      });
      
      // Show target section
      const targetSection = document.getElementById(target);
      if (targetSection) {
        targetSection.classList.remove('hidden');
      }
      
      // Add active class to clicked tab
      e.target.classList.add('analysis-tab-active', 'active');
    };

    // Add event listeners to tabs
    const tabs = document.querySelectorAll('.analysis-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', handleTabClick);
    });

    // Cleanup event listeners
    return () => {
      tabs.forEach(tab => {
        tab.removeEventListener('click', handleTabClick);
      });
    };
  }, [analysis, extractedInfo, jobRecommendations, atsScore]);

  if (isLoading) {
    return (
      <div className="analysis-results-container">
        <div className="flex flex-col items-center justify-center p-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700">Analyzing your resume...</h3>
          <p className="text-gray-500 mt-2">
            {processingStage || "This may take a minute or two."}
          </p>
        </div>
        {resumeFile && <ResumePreview file={resumeFile} />}
      </div>
    );
  }

  if (!analysis && !extractedInfo && !atsScore) {
    return null;
  }

  return (
    <div className="analysis-results-container">
      {resumeFile && <ResumePreview file={resumeFile} />}
      <div className="analysis-results-card">
        <div className="analysis-results-header">
          <h2 className="analysis-results-title">Resume Analysis Results</h2>
          {/* Tabs */}
          <div className="analysis-tabs">
            <a href="#analysis" className="analysis-tab analysis-tab-active">Analysis</a>
            <a href="#ats-score" className="analysis-tab">ATS Score</a>
            <a href="#profile" className="analysis-tab">Resume Profile</a>
            <a href="#recommendations" className="analysis-tab">Career Recommendations</a>
          </div>
        </div>

        {/* Analysis Tab Content */}
        <div id="analysis" className="analysis-content-section">
          {analysis && (
            <div className="analysis-text-content" dangerouslySetInnerHTML={{ 
              __html: analysis.replace(/\n/g, '<br />') 
                             .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                             .replace(/"([^"]+?)"/g, '<em>"$1"</em>')
                             .replace(/^#+\s(.*?)$/gm, match => {
                               const level = match.match(/^#+/)[0].length;
                               const text = match.replace(/^#+\s/, '');
                               return `<h${level} class='analysis-heading analysis-heading-${level}'>${text}</h${level}>`;
                             })
            }} />
          )}
        </div>

        {/* ATS Score Tab Content (Hidden by default) */}
        <div id="ats-score" className="analysis-content-section hidden">
          <ATSScoreDisplay atsScore={atsScore} />
        </div>

        {/* Profile Tab Content (Hidden by default) */}
        <div id="profile" className="analysis-content-section hidden">
          {extractedInfo && (
            <div className="profile-sections">
              <div className="profile-contact-section">
                <h3 className="profile-section-title">Contact Information</h3>
                <div className="contact-grid">
                  <div className="contact-item">
                    <p className="contact-label">Name</p>
                    <p className="contact-value">{extractedInfo.contact?.name || 'Not provided'}</p>
                  </div>
                  <div className="contact-item">
                    <p className="contact-label">Email</p>
                    <p className="contact-value">{extractedInfo.contact?.email || 'Not provided'}</p>
                  </div>
                  <div className="contact-item">
                    <p className="contact-label">Phone</p>
                    <p className="contact-value">{extractedInfo.contact?.phone || 'Not provided'}</p>
                  </div>
                  <div className="contact-item">
                    <p className="contact-label">Location</p>
                    <p className="contact-value">{extractedInfo.contact?.location || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              
              <div className="profile-section">
                <h3 className="profile-section-title">Summary</h3>
                <p className="profile-text">{extractedInfo.summary || 'No summary available'}</p>
              </div>
              
              <div className="profile-section">
                <h3 className="profile-section-title">Skills</h3>
                <div className="skills-container">
                  {extractedInfo.skills?.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  )) || <p>No skills listed</p>}
                </div>
              </div>
              
              <div className="profile-section">
                <h3 className="profile-section-title">Work Experience</h3>
                <div className="experience-list">
                  {extractedInfo.workExperience?.length > 0 ? (
                    extractedInfo.workExperience.map((job, index) => (
                      <div key={index} className="experience-item">
                        <h4 className="experience-position">{job?.position || 'Position not specified'}</h4>
                        <p className="experience-company">{job?.company || 'Company not specified'} • {job?.location || 'Location not specified'}</p>
                        <p className="experience-duration">{job?.duration || 'Duration not specified'}</p>
                        <ul className="experience-responsibilities">
                          {job?.responsibilities?.map((resp, i) => (
                            <li key={i}>{resp}</li>
                          )) || <li>No responsibilities listed</li>}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p>No work experience listed</p>
                  )}
                </div>
              </div>
              
              <div className="profile-section">
                <h3 className="profile-section-title">Education</h3>
                <div className="education-list">
                  {extractedInfo.education?.length > 0 ? (
                    extractedInfo.education.map((edu, index) => (
                      <div key={index} className="education-item">
                        <h4 className="education-institution">{edu?.institution || 'Institution not specified'}</h4>
                        <p className="education-degree">{edu?.degree || 'Degree not specified'} {edu?.field ? `in ${edu.field}` : ''}</p>
                        <p className="education-graduation">{edu?.graduation || 'Graduation date not specified'}</p>
                        {edu?.gpa && <p className="education-gpa">GPA: {edu.gpa}</p>}
                      </div>
                    ))
                  ) : (
                    <p>No education information listed</p>
                  )}
                </div>
              </div>
              
              {extractedInfo.projects?.length > 0 && (
                <div className="profile-section">
                  <h3 className="profile-section-title">Projects</h3>
                  <div className="projects-list">
                    {extractedInfo.projects.map((project, index) => (
                      <div key={index} className="project-item">
                        <h4 className="project-title">{project?.title || 'Project title not specified'}</h4>
                        <p className="project-description">{project?.description || 'No description available'}</p>
                        <div className="project-technologies">
                          {project?.technologies?.map((tech, i) => (
                            <span key={i} className="tech-tag">
                              {tech}
                            </span>
                          )) || <span>No technologies listed</span>}
                        </div>
                        {project?.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="project-link"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Recommendations Tab Content (Hidden by default) */}
        <div id="recommendations" className="analysis-content-section hidden">
          {jobRecommendations && (
            <div className="recommendations-sections">
              <div className="recommendations-section">
                <h3 className="recommendations-section-title">Recommended Roles</h3>
                <div className="roles-grid">
                  {jobRecommendations.recommendedRoles?.length > 0 ? (
                    jobRecommendations.recommendedRoles.map((role, index) => (
                      <div key={index} className="role-card">
                        <h4 className="role-title">{role?.title || 'Role title not specified'}</h4>
                        <p className="role-description">{role?.description || 'No description available'}</p>
                        
                        <div className="role-fit">
                          <h5 className="role-subsection-title">Why it's a good fit:</h5>
                          <p className="role-fit-reason">{role?.fitReason || 'No fit reason provided'}</p>
                        </div>
                        
                        <div className="role-skills">
                          <h5 className="role-subsection-title">Skills you have:</h5>
                          <div className="skills-match">
                            {role?.skillsMatch?.length > 0 ? (
                              role.skillsMatch.map((skill, i) => (
                                <span key={i} className="skill-match-tag">
                                  {skill}
                                </span>
                              ))
                            ) : (
                              <span>No matching skills listed</span>
                            )}
                          </div>
                        </div>
                        
                        {role?.skillsToAcquire?.length > 0 && (
                          <div className="role-skills-needed">
                            <h5 className="role-subsection-title">Skills to acquire:</h5>
                            <div className="skills-needed">
                              {role.skillsToAcquire.map((skill, i) => (
                                <span key={i} className="skill-needed-tag">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No role recommendations available</p>
                  )}
                </div>
              </div>
              
              <div className="recommendations-section">
                <h3 className="recommendations-section-title">Suitable Industries</h3>
                <div className="industries-grid">
                  {jobRecommendations.suitableIndustries?.length > 0 ? (
                    jobRecommendations.suitableIndustries.map((industry, index) => (
                      <div key={index} className="industry-card">
                        <h4 className="industry-name">{industry?.name || 'Industry not specified'}</h4>
                        <p className="industry-reason">{industry?.reason || 'No reason provided'}</p>
                      </div>
                    ))
                  ) : (
                    <p>No industry recommendations available</p>
                  )}
                </div>
              </div>
              
              <div className="recommendations-section">
                <h3 className="recommendations-section-title">Career Pathways</h3>
                <div className="pathways-list">
                  {jobRecommendations.careerPathways?.length > 0 ? (
                    jobRecommendations.careerPathways.map((pathway, index) => (
                      <div key={index} className="pathway-item">
                        <h4 className="pathway-title">{pathway?.path || 'Career path not specified'}</h4>
                        <p className="pathway-description">{pathway?.description || 'No description available'}</p>
                        <p className="pathway-timeline">Estimated timeline: {pathway?.timelineEstimate || 'Not specified'}</p>
                        
                        <div className="pathway-steps">
                          <h5 className="pathway-steps-title">Next steps:</h5>
                          <ul className="pathway-steps-list">
                            {pathway?.nextSteps?.length > 0 ? (
                              pathway.nextSteps.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))
                            ) : (
                              <li>No specific steps provided</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No career pathway recommendations available</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
