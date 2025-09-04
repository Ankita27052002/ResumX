import React from 'react';
import Layout from '@components/layout/Layout';
import Button from '@components/common/Button';

const HomePage = () => {
  return (
    <Layout>
      <div className="w-full main-content-spacing">
        {/* Hero Section - Full Width */}
        <section className="w-full bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-20 lg:py-28">
          <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24 text-center flex flex-col items-center">
            <div className="bg-white/80 backdrop-blur-sm p-12 lg:p-16 xl:p-20 border border-white/50 w-full max-w-none flex flex-col items-center">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight text-center">
                Transform Your Resume with <span className="text-indigo-600">AI Intelligence</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-medium text-center w-full max-w-4xl hero-content-spacing">
                Get instant, professional feedback to make your resume stand out. Our AI analyzes content, structure, and keywords to help you land your dream job.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
                <Button 
                  variant="primary" 
                  size="large"
                  className="hero-btn-primary"
                  onClick={() => window.location.href = '/analyze'}
                >
                  Start Analysis
                </Button>
                <Button 
                  variant="secondary"
                  size="large"
                  className="hero-btn-secondary"
                  onClick={() => window.location.href = '/about'}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Full Width */}
        <section className="w-full py-16 lg:py-20 bg-white features-section-spacing center-section section-bottom-spacing">
          <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24 center-section">
            <div className="center-section">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 center-section section-title-spacing">Why Choose ResumX?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto center-section section-subtitle-spacing">
                Professional-grade analysis powered by cutting-edge AI technology.
              </p>
            </div>
            <div className="grid md:grid-cols-3 max-w-7xl mx-auto center-section cards-container-spacing">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 center-section card-content-spacing">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto card-icon-spacing">
                <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 center-section card-title-spacing">ATS Optimization</h3>
              <p className="text-gray-600 center-section card-text-spacing">
                Ensure your resume passes Applicant Tracking Systems with smart keyword analysis and formatting tips.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 center-section card-content-spacing">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto card-icon-spacing">
                <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 center-section card-title-spacing">Content Enhancement</h3>
              <p className="text-gray-600 center-section card-text-spacing">
                Get detailed feedback on content structure, impact statements, and professional presentation.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 center-section card-content-spacing">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto card-icon-spacing">
                <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 center-section card-title-spacing">Career Insights</h3>
              <p className="text-gray-600 center-section card-text-spacing">
                Discover personalized job recommendations and career opportunities based on your experience.
              </p>
            </div>
          </div>
          </div>
        </section>

        {/* How It Works Section - Full Width */}
        <section className="w-full py-16 lg:py-20 bg-white section-top-spacing how-it-works-section section-bottom-spacing">
          <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 how-it-works-title">How It Works</h2>
              <p className="text-lg text-gray-600 mx-auto how-it-works-subtitle">
                Four simple steps to a better resume and stronger job applications.
              </p>
            </div>
            <div className="how-it-works-grid">
                <div className="how-it-works-step">
                  <span className="w-12 h-12 bg-indigo-600 rounded-full text-white text-lg font-bold step-number">1</span>
                  <div className="step-content">
                    <h3 className="text-lg font-semibold text-gray-900 step-title">Upload Resume</h3>
                    <p className="text-gray-600 step-description">Upload your resume in PDF or TXT format for instant analysis.</p>
                  </div>
                </div>
                <div className="how-it-works-step">
                  <span className="w-12 h-12 bg-indigo-600 rounded-full text-white text-lg font-bold step-number">2</span>
                  <div className="step-content">
                    <h3 className="text-lg font-semibold text-gray-900 step-title">AI Analysis</h3>
                    <p className="text-gray-600 step-description">Our AI analyzes content, structure, keywords, and overall effectiveness.</p>
                  </div>
                </div>
                <div className="how-it-works-step">
                  <span className="w-12 h-12 bg-indigo-600 rounded-full text-white text-lg font-bold step-number">3</span>
                  <div className="step-content">
                    <h3 className="text-lg font-semibold text-gray-900 step-title">Get Feedback</h3>
                    <p className="text-gray-600 step-description">Receive comprehensive feedback with specific improvement suggestions.</p>
                  </div>
                </div>
                <div className="how-it-works-step">
                  <span className="w-12 h-12 bg-indigo-600 rounded-full text-white text-lg font-bold step-number">4</span>
                  <div className="step-content">
                    <h3 className="text-lg font-semibold text-gray-900 step-title">Apply & Succeed</h3>
                    <p className="text-gray-600 step-description">Use insights to improve your resume and boost your job search success.</p>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Full Width */}
        <section className="w-full py-16 lg:py-20 text-center bg-white section-top-spacing cta-section">
          <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
            <div className="cta-container">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 cta-title">Ready to Get Started?</h2>
              <p className="text-lg text-gray-600 cta-description">
                Join thousands of professionals who have improved their resumes with ResumX.
              </p>
              <Button 
                variant="primary" 
                size="large"
                className="cta-button"
                onClick={() => window.location.href = '/analyze'}
              >
                Start Your Analysis
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;

