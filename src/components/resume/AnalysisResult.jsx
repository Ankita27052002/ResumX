import React, { useEffect } from 'react';
import '../../styles/AnalysisResult.css';

const AnalysisResult = ({ analysis, extractedInfo, jobRecommendations, isLoading }) => {
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
  }, [analysis, extractedInfo, jobRecommendations]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-700">Analyzing your resume...</h3>
        <p className="text-gray-500 mt-2">This may take a minute or two.</p>
      </div>
    );
  }

  if (!analysis && !extractedInfo) {
    return null;
  }

  return (
    <div className="analysis-results-container">
      <div className="analysis-results-card">
        <div className="analysis-results-header">
          <h2 className="analysis-results-title">Resume Analysis Results</h2>
          {/* Tabs */}
          <div className="analysis-tabs">
            <a href="#analysis" className="analysis-tab analysis-tab-active">Analysis</a>
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
                             .replace(/\*(.*?)\*/g, '<em>$1</em>')
                             .replace(/^#+\s(.*?)$/gm, match => {
                               const level = match.match(/^#+/)[0].length;
                               const text = match.replace(/^#+\s/, '');
                               return `<h${level} class='analysis-heading analysis-heading-${level}'>${text}</h${level}>`;
                             })
            }} />
          )}
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
                    <p className="contact-value">{extractedInfo.contact.name}</p>
                  </div>
                  <div className="contact-item">
                    <p className="contact-label">Email</p>
                    <p className="contact-value">{extractedInfo.contact.email}</p>
                  </div>
                  <div className="contact-item">
                    <p className="contact-label">Phone</p>
                    <p className="contact-value">{extractedInfo.contact.phone}</p>
                  </div>
                  <div className="contact-item">
                    <p className="contact-label">Location</p>
                    <p className="contact-value">{extractedInfo.contact.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="profile-section">
                <h3 className="profile-section-title">Summary</h3>
                <p className="profile-text">{extractedInfo.summary}</p>
              </div>
              
              <div className="profile-section">
                <h3 className="profile-section-title">Skills</h3>
                <div className="skills-container">
                  {extractedInfo.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="profile-section">
                <h3 className="profile-section-title">Work Experience</h3>
                <div className="experience-list">
                  {extractedInfo.workExperience.map((job, index) => (
                    <div key={index} className="experience-item">
                      <h4 className="experience-position">{job.position}</h4>
                      <p className="experience-company">{job.company} • {job.location}</p>
                      <p className="experience-duration">{job.duration}</p>
                      <ul className="experience-responsibilities">
                        {job.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="profile-section">
                <h3 className="profile-section-title">Education</h3>
                <div className="education-list">
                  {extractedInfo.education.map((edu, index) => (
                    <div key={index} className="education-item">
                      <h4 className="education-institution">{edu.institution}</h4>
                      <p className="education-degree">{edu.degree} in {edu.field}</p>
                      <p className="education-graduation">{edu.graduation}</p>
                      {edu.gpa && <p className="education-gpa">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </div>
              
              {extractedInfo.projects && extractedInfo.projects.length > 0 && (
                <div className="profile-section">
                  <h3 className="profile-section-title">Projects</h3>
                  <div className="projects-list">
                    {extractedInfo.projects.map((project, index) => (
                      <div key={index} className="project-item">
                        <h4 className="project-title">{project.title}</h4>
                        <p className="project-description">{project.description}</p>
                        <div className="project-technologies">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                        {project.link && (
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
                  {jobRecommendations.recommendedRoles.map((role, index) => (
                    <div key={index} className="role-card">
                      <h4 className="role-title">{role.title}</h4>
                      <p className="role-description">{role.description}</p>
                      
                      <div className="role-fit">
                        <h5 className="role-subsection-title">Why it's a good fit:</h5>
                        <p className="role-fit-reason">{role.fitReason}</p>
                      </div>
                      
                      <div className="role-skills">
                        <h5 className="role-subsection-title">Skills you have:</h5>
                        <div className="skills-match">
                          {role.skillsMatch.map((skill, i) => (
                            <span key={i} className="skill-match-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {role.skillsToAcquire && role.skillsToAcquire.length > 0 && (
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
                  ))}
                </div>
              </div>
              
              <div className="recommendations-section">
                <h3 className="recommendations-section-title">Suitable Industries</h3>
                <div className="industries-grid">
                  {jobRecommendations.suitableIndustries.map((industry, index) => (
                    <div key={index} className="industry-card">
                      <h4 className="industry-name">{industry.name}</h4>
                      <p className="industry-reason">{industry.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="recommendations-section">
                <h3 className="recommendations-section-title">Career Pathways</h3>
                <div className="pathways-list">
                  {jobRecommendations.careerPathways.map((pathway, index) => (
                    <div key={index} className="pathway-item">
                      <h4 className="pathway-title">{pathway.path}</h4>
                      <p className="pathway-description">{pathway.description}</p>
                      <p className="pathway-timeline">Estimated timeline: {pathway.timelineEstimate}</p>
                      
                      <div className="pathway-steps">
                        <h5 className="pathway-steps-title">Next steps:</h5>
                        <ul className="pathway-steps-list">
                          {pathway.nextSteps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
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
