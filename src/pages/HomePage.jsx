import React from 'react';
import Layout from '@components/layout/Layout';
import Button from '@components/common/Button';

const HomePage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              <span className="block">Optimize your resume with</span>
              <span className="block text-indigo-600">AI-powered insights</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
              ResumX uses advanced AI to analyze your resume, provide personalized feedback, and help you stand out to employers and applicant tracking systems.
            </p>
            <div className="mt-10">
              <Button 
                variant="primary" 
                size="large"
                onClick={() => window.location.href = '/analyze'}
              >
                Analyze My Resume
              </Button>
              <Button 
                variant="secondary"
                size="large"
                className="ml-4"
                onClick={() => window.location.href = '/about'}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How ResumX Helps You</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our AI-powered platform provides comprehensive resume analysis and optimization.
            </p>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-indigo-100 p-2 rounded-lg inline-block">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">ATS Optimization</h3>
                <p className="mt-2 text-base text-gray-500">
                  Ensure your resume passes through Applicant Tracking Systems with our AI-powered keyword analysis.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-indigo-100 p-2 rounded-lg inline-block">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Content Improvement</h3>
                <p className="mt-2 text-base text-gray-500">
                  Receive detailed feedback on how to strengthen your resume's content, structure, and impact.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-indigo-100 p-2 rounded-lg inline-block">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Career Recommendations</h3>
                <p className="mt-2 text-base text-gray-500">
                  Get personalized job recommendations and career path insights based on your skills and experience.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 rounded-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Simple steps to improve your resume and boost your job search.
            </p>
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto">
            <ol className="relative border-l border-gray-300">
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full -left-4 ring-4 ring-white text-white">
                  1
                </span>
                <h3 className="text-lg font-semibold text-gray-900">Upload your resume</h3>
                <p className="mt-1 text-base text-gray-500">
                  Upload your resume in PDF, DOCX, or TXT format. Our system will extract the text for analysis.
                </p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full -left-4 ring-4 ring-white text-white">
                  2
                </span>
                <h3 className="text-lg font-semibold text-gray-900">AI-powered analysis</h3>
                <p className="mt-1 text-base text-gray-500">
                  Our AI engine analyzes your resume's content, structure, keywords, and overall effectiveness.
                </p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full -left-4 ring-4 ring-white text-white">
                  3
                </span>
                <h3 className="text-lg font-semibold text-gray-900">Receive detailed feedback</h3>
                <p className="mt-1 text-base text-gray-500">
                  Get comprehensive feedback and specific suggestions to improve your resume's impact.
                </p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full -left-4 ring-4 ring-white text-white">
                  4
                </span>
                <h3 className="text-lg font-semibold text-gray-900">Explore career insights</h3>
                <p className="mt-1 text-base text-gray-500">
                  Discover job recommendations, suitable industries, and potential career paths based on your experience.
                </p>
              </li>
            </ol>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Ready to improve your resume?</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Get started with ResumX today and take your job search to the next level.
          </p>
          <div className="mt-8">
            <Button 
              variant="primary" 
              size="large"
              onClick={() => window.location.href = '/analyze'}
            >
              Analyze My Resume Now
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
