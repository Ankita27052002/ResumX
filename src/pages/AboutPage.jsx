import React from 'react';
import Layout from '@components/layout/Layout';
import Button from '@components/common/Button';

const AboutPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">About ResumX</h1>
          <p className="mt-4 text-lg text-gray-500">
            AI-powered resume analysis and career insights platform
          </p>
        </div>
        
        <div className="prose prose-indigo prose-lg mx-auto mb-10">
          <p>
            ResumX is an innovative platform that leverages artificial intelligence to help job seekers optimize their resumes and advance their careers. Our mission is to empower individuals with actionable insights and guidance throughout their professional journey.
          </p>
          
          <h2>Our Technology</h2>
          <p>
            We utilize state-of-the-art natural language processing and machine learning technologies to analyze resumes comprehensively. Our AI models are trained on diverse datasets representing various industries, job roles, and career levels.
          </p>
          <p>
            Through OpenRouter, we access some of the most advanced language models available, allowing us to provide nuanced and context-aware feedback that goes beyond simple keyword matching.
          </p>
          
          <h2>What Sets Us Apart</h2>
          <ul>
            <li>
              <strong>Comprehensive Analysis:</strong> We evaluate not just keywords, but also structure, impact statements, quantifiable achievements, and overall narrative effectiveness.
            </li>
            <li>
              <strong>ATS Optimization:</strong> Our platform provides specific recommendations to help your resume pass through Applicant Tracking Systems used by most employers.
            </li>
            <li>
              <strong>Career Pathway Insights:</strong> Beyond immediate resume feedback, we offer personalized career development suggestions based on your skills and experience.
            </li>
            <li>
              <strong>Privacy-Focused:</strong> Your resume data is processed securely and not stored permanently in our systems.
            </li>
          </ul>
          
          <h2>How to Get the Most from ResumX</h2>
          <p>
            For optimal results, we recommend uploading a complete, up-to-date resume in PDF format. While our system can process other formats, PDFs typically preserve formatting better. Consider these tips:
          </p>
          <ul>
            <li>Include your full work history, education, and skills sections</li>
            <li>Be specific about your achievements and responsibilities</li>
            <li>Quantify your impact where possible (e.g., percentages, numbers)</li>
            <li>After receiving feedback, make targeted improvements and consider a follow-up analysis</li>
          </ul>
        </div>
        
        <div className="bg-indigo-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to optimize your resume?</h2>
          <p className="text-gray-600 mb-6">
            Try our AI-powered resume analysis tool today and get personalized feedback to help you stand out to employers.
          </p>
          <div className="flex justify-center">
            <Button 
              variant="primary" 
              size="large"
              onClick={() => window.location.href = '/analyze'}
            >
              Analyze My Resume
            </Button>
          </div>
        </div>
        
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="text-left space-y-6 mt-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Is my resume data secure?</h3>
              <p className="mt-2 text-gray-600">
                Yes. We process your resume data securely and do not store it permanently. Your privacy is our priority.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">How accurate is the AI analysis?</h3>
              <p className="mt-2 text-gray-600">
                Our AI models are highly accurate and continuously improving. However, we recommend using the feedback as guidance rather than absolute rules. The AI provides suggestions based on best practices and trends in hiring.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Which file formats are supported?</h3>
              <p className="mt-2 text-gray-600">
                We currently support PDF, DOCX, and TXT file formats. For best results, we recommend uploading a PDF.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Is there a limit to how many resumes I can analyze?</h3>
              <p className="mt-2 text-gray-600">
                In the current version, there are no specific limits. However, we may introduce usage tiers in the future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
