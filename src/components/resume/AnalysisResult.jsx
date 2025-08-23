import React from 'react';

const AnalysisResult = ({ analysis, extractedInfo, jobRecommendations, isLoading }) => {
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
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white/90 shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">Resume Analysis Results</h2>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a href="#analysis" className="px-5 py-2 rounded-full font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 shadow-sm hover:bg-indigo-100 transition">Analysis</a>
            <a href="#profile" className="px-5 py-2 rounded-full font-semibold text-gray-700 bg-gray-50 border border-gray-200 shadow-sm hover:bg-gray-100 transition">Resume Profile</a>
            <a href="#recommendations" className="px-5 py-2 rounded-full font-semibold text-gray-700 bg-gray-50 border border-gray-200 shadow-sm hover:bg-gray-100 transition">Career Recommendations</a>
          </div>

          {/* Analysis Tab Content */}
          <div id="analysis" className="prose max-w-none bg-indigo-50/60 rounded-xl p-6 mb-8 border border-indigo-100 shadow-sm">
            {analysis && (
              <div dangerouslySetInnerHTML={{ 
                __html: analysis.replace(/\n/g, '<br />') 
                               .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                               .replace(/\*(.*?)\*/g, '<em>$1</em>')
                               .replace(/^#+\s(.*?)$/gm, match => {
                                 const level = match.match(/^#+/)[0].length;
                                 const text = match.replace(/^#+\s/, '');
                                 return `<h${level} class='text-gray-800 font-bold mb-3 mt-6'>${text}</h${level}>`;
                               })
              }} />
            )}
          </div>

          {/* Profile Tab Content (Hidden by default) */}
          <div id="profile" className="hidden">
            {extractedInfo && (
              <div className="space-y-8">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{extractedInfo.contact.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{extractedInfo.contact.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{extractedInfo.contact.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{extractedInfo.contact.location}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Summary</h3>
                  <p className="text-gray-700">{extractedInfo.summary}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {extractedInfo.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Work Experience</h3>
                  <div className="space-y-6">
                    {extractedInfo.workExperience.map((job, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-4 pb-2">
                        <h4 className="font-semibold text-gray-800">{job.position}</h4>
                        <p className="text-gray-600">{job.company} • {job.location}</p>
                        <p className="text-sm text-gray-500">{job.duration}</p>
                        <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                          {job.responsibilities.map((resp, i) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Education</h3>
                  <div className="space-y-4">
                    {extractedInfo.education.map((edu, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-gray-800">{edu.institution}</h4>
                        <p className="text-gray-700">{edu.degree} in {edu.field}</p>
                        <p className="text-sm text-gray-500">{edu.graduation}</p>
                        {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                      </div>
                    ))}
                  </div>
                </div>
                
                {extractedInfo.projects && extractedInfo.projects.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Projects</h3>
                    <div className="space-y-4">
                      {extractedInfo.projects.map((project, index) => (
                        <div key={index}>
                          <h4 className="font-semibold text-gray-800">{project.title}</h4>
                          <p className="text-gray-700">{project.description}</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {project.technologies.map((tech, i) => (
                              <span 
                                key={i} 
                                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-indigo-600 hover:text-indigo-800 mt-1 inline-block"
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
          <div id="recommendations" className="hidden">
            {jobRecommendations && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Roles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobRecommendations.recommendedRoles.map((role, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="text-lg font-semibold text-indigo-700">{role.title}</h4>
                        <p className="text-gray-700 mt-2">{role.description}</p>
                        
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-800">Why it's a good fit:</h5>
                          <p className="text-sm text-gray-600 mt-1">{role.fitReason}</p>
                        </div>
                        
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-800">Skills you have:</h5>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {role.skillsMatch.map((skill, i) => (
                              <span 
                                key={i} 
                                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {role.skillsToAcquire && role.skillsToAcquire.length > 0 && (
                          <div className="mt-4">
                            <h5 className="text-sm font-medium text-gray-800">Skills to acquire:</h5>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {role.skillsToAcquire.map((skill, i) => (
                                <span 
                                  key={i} 
                                  className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded"
                                >
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
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Suitable Industries</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {jobRecommendations.suitableIndustries.map((industry, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800">{industry.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{industry.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Career Pathways</h3>
                  <div className="space-y-6">
                    {jobRecommendations.careerPathways.map((pathway, index) => (
                      <div key={index} className="border-l-2 border-indigo-300 pl-4">
                        <h4 className="font-semibold text-gray-800">{pathway.path}</h4>
                        <p className="text-gray-600 mt-1">{pathway.description}</p>
                        <p className="text-sm text-gray-500 mt-2">Estimated timeline: {pathway.timelineEstimate}</p>
                        
                        <div className="mt-3">
                          <h5 className="text-sm font-medium text-gray-800">Next steps:</h5>
                          <ul className="mt-1 space-y-1 list-disc list-inside text-sm text-gray-700">
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
    </div>
  );
};

export default AnalysisResult;
