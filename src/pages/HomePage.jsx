import React from 'react';
import Layout from '@components/layout/Layout';
import Button from '@components/common/Button';

const HomePage = () => {
  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-20">
          <div className="w-full max-w-3xl bg-white/95 rounded-3xl shadow-2xl px-10 py-16 flex flex-col items-center text-center border border-gray-100">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              Optimize your resume with <span className="block text-indigo-600">AI-powered insights</span>
            </h1>
            <p className="mt-4 text-2xl text-gray-600 mb-10">
              ResumX uses advanced AI to analyze your resume, provide personalized feedback, and help you stand out to employers and applicant tracking systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button 
                variant="primary" 
                size="large"
                className="w-full sm:w-auto px-8 py-3 text-lg shadow"
                onClick={() => window.location.href = '/analyze'}
              >
                Analyze My Resume
              </Button>
              <Button 
                variant="secondary"
                size="large"
                className="w-full sm:w-auto px-8 py-3 text-lg shadow"
                onClick={() => window.location.href = '/about'}
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How ResumX Helps You</h2>
            <p className="max-w-2xl text-xl text-gray-500 mx-auto">
              Our AI-powered platform provides comprehensive resume analysis and optimization.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch">
            <div className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center border border-gray-100 px-10 py-12 min-w-[260px]">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">ATS Optimization</h3>
              <p className="mt-3 text-base text-gray-500">
                Ensure your resume passes through Applicant Tracking Systems with our AI-powered keyword analysis.
              </p>
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center border border-gray-100 px-10 py-12 min-w-[260px]">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">Content Improvement</h3>
              <p className="mt-3 text-base text-gray-500">
                Receive detailed feedback on how to strengthen your resume's content, structure, and impact.
              </p>
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center border border-gray-100 px-10 py-12 min-w-[260px]">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">Career Recommendations</h3>
              <p className="mt-3 text-base text-gray-500">
                Get personalized job recommendations and career path insights based on your skills and experience.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50 rounded-3xl shadow-inner mb-16">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How It Works</h2>
            <p className="max-w-2xl text-xl text-gray-500 mx-auto">
              Simple steps to improve your resume and boost your job search.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <ol className="space-y-0 relative">
              <li className="flex items-start mb-10">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full text-white text-xl font-bold shadow mr-6">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Upload your resume</h3>
                  <p className="text-base text-gray-500">
                    Upload your resume in PDF, DOCX, or TXT format. Our system will extract the text for analysis.
                  </p>
                </div>
              </li>
              <li className="flex items-start mb-10">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full text-white text-xl font-bold shadow mr-6">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">AI-powered analysis</h3>
                  <p className="text-base text-gray-500">
                    Our AI engine analyzes your resume's content, structure, keywords, and overall effectiveness.
                  </p>
                </div>
              </li>
              <li className="flex items-start mb-10">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full text-white text-xl font-bold shadow mr-6">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Receive detailed feedback</h3>
                  <p className="text-base text-gray-500">
                    Get comprehensive feedback and specific suggestions to improve your resume's impact.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full text-white text-xl font-bold shadow mr-6">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Explore career insights</h3>
                  <p className="text-base text-gray-500">
                    Discover job recommendations, suitable industries, and potential career paths based on your experience.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Ready to improve your resume?</h2>
          <p className="max-w-2xl text-xl text-gray-500 mx-auto mb-8">
            Get started with ResumX today and take your job search to the next level.
          </p>
          <div className="flex justify-center">
            <Button 
              variant="primary" 
              size="large"
              className="px-10 py-3 text-lg shadow-lg"
              onClick={() => window.location.href = '/analyze'}
            >
              Analyze My Resume Now
            </Button>
          </div>
        </section>
      </main>
    </Layout>
  );
};

                      <section className="py-20">
                        <div className="text-center mb-14">
                          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How ResumX Helps You</h2>
                          <p className="max-w-2xl text-xl text-gray-500 mx-auto">
                            Our AI-powered platform provides comprehensive resume analysis and optimization.
                          </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch">
                          <div className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center border border-gray-100 px-10 py-12 min-w-[260px]">
                            <div className="bg-indigo-100 p-4 rounded-full mb-4">
                              <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <h3 className="mt-2 text-xl font-semibold text-gray-900">ATS Optimization</h3>
                            <p className="mt-3 text-base text-gray-500">
                              Ensure your resume passes through Applicant Tracking Systems with our AI-powered keyword analysis.
                            </p>
                          </div>
                          <div className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center border border-gray-100 px-10 py-12 min-w-[260px]">
                            <div className="bg-indigo-100 p-4 rounded-full mb-4">
                              <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <h3 className="mt-2 text-xl font-semibold text-gray-900">Content Improvement</h3>
                            <p className="mt-3 text-base text-gray-500">
                              Receive detailed feedback on how to strengthen your resume's content, structure, and impact.
                            </p>
                          </div>
                          <div className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center border border-gray-100 px-10 py-12 min-w-[260px]">
                            <div className="bg-indigo-100 p-4 rounded-full mb-4">
                              <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                            <h3 className="mt-2 text-xl font-semibold text-gray-900">Career Recommendations</h3>
                            <p className="mt-3 text-base text-gray-500">
                              Get personalized job recommendations and career path insights based on your skills and experience.
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* How It Works Section */}
                      <section className="py-20 bg-gray-50 rounded-3xl shadow-inner mb-16">
                        <div className="text-center mb-14">
                          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How It Works</h2>
                          <p className="max-w-2xl text-xl text-gray-500 mx-auto">
                            Simple steps to improve your resume and boost your job search.
                          </p>
                        </div>
                        <div className="max-w-3xl mx-auto">
                          <ol className="space-y-0 relative">
                            <li className="flex items-start mb-10">
                              <div className="flex-shrink-0">
                                <span className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full text-white text-xl font-bold shadow mr-6">1</span>
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">Upload your resume</h3>
                                <p className="text-base text-gray-500">
                                  Upload your resume in PDF, DOCX, or TXT format. Our system will extract the text for analysis.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start mb-10">
                              <div className="flex-shrink-0">
                                <span className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full text-white text-xl font-bold shadow mr-6">2</span>
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">AI-powered analysis</h3>
                                <p className="text-base text-gray-500">
                                  Our AI engine analyzes your resume's content, structure, keywords, and overall effectiveness.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start mb-10">
                              <div className="flex-shrink-0">
                                <span className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full text-white text-xl font-bold shadow mr-6">3</span>
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">Receive detailed feedback</h3>
                                <p className="text-base text-gray-500">
                                  Get comprehensive feedback and specific suggestions to improve your resume's impact.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <div className="flex-shrink-0">
                                <span className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full text-white text-xl font-bold shadow mr-6">4</span>
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">Explore career insights</h3>
                                <p className="text-base text-gray-500">
                                  Discover job recommendations, suitable industries, and potential career paths based on your experience.
                                </p>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </section>

                      {/* CTA Section */}
                      <section className="py-20 text-center">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Ready to improve your resume?</h2>
                        <p className="max-w-2xl text-xl text-gray-500 mx-auto mb-8">
                          Get started with ResumX today and take your job search to the next level.
                        </p>
                        <div className="flex justify-center">
                          <Button 
                            variant="primary" 
                            size="large"
                            className="px-10 py-3 text-lg shadow-lg"
                            onClick={() => window.location.href = '/analyze'}
                          >
                            Analyze My Resume Now
                          </Button>
                        </div>
                      </section>
export default HomePage;

