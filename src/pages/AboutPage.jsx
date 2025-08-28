import React from 'react';
import Layout from '@components/layout/Layout';
import Button from '@components/common/Button';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <Layout>
      <div className="about-page-container">
        {/* Hero Section */}
        <div className="about-hero-section">
          <div className="about-hero-content">
            <h1 className="about-main-title">About ResumX</h1>
            <p className="about-subtitle">
              AI-powered resume analysis and career insights platform
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="about-main-content">
          
          {/* Introduction Section */}
          <section className="about-section about-introduction">
            <div className="about-section-content">
              <p className="about-intro-text">
                ResumX is an innovative platform that leverages artificial intelligence to help job seekers optimize their resumes and advance their careers. Our mission is to empower individuals with actionable insights and guidance throughout their professional journey.
              </p>
            </div>
          </section>

          {/* Technology Section */}
          <section className="about-section">
            <div className="about-section-content">
              <h2 className="about-section-title">Our Technology</h2>
              <div className="about-text-content">
                <p>
                  We utilize state-of-the-art natural language processing and machine learning technologies to analyze resumes comprehensively. Our AI models are trained on diverse datasets representing various industries, job roles, and career levels.
                </p>
                <p>
                  Through OpenRouter, we access some of the most advanced language models available, allowing us to provide nuanced and context-aware feedback that goes beyond simple keyword matching.
                </p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="about-section about-features">
            <div className="about-section-content">
              <h2 className="about-section-title">What Sets Us Apart</h2>
              <div className="about-features-grid">
                <div className="about-feature-card">
                  <div className="about-feature-icon">📊</div>
                  <h3 className="about-feature-title">Comprehensive Analysis</h3>
                  <p className="about-feature-description">
                    We evaluate not just keywords, but also structure, impact statements, quantifiable achievements, and overall narrative effectiveness.
                  </p>
                </div>
                <div className="about-feature-card">
                  <div className="about-feature-icon">🎯</div>
                  <h3 className="about-feature-title">ATS Optimization</h3>
                  <p className="about-feature-description">
                    Our platform provides specific recommendations to help your resume pass through Applicant Tracking Systems used by most employers.
                  </p>
                </div>
                <div className="about-feature-card">
                  <div className="about-feature-icon">🚀</div>
                  <h3 className="about-feature-title">Career Pathway Insights</h3>
                  <p className="about-feature-description">
                    Beyond immediate resume feedback, we offer personalized career development suggestions based on your skills and experience.
                  </p>
                </div>
                <div className="about-feature-card">
                  <div className="about-feature-icon">🔒</div>
                  <h3 className="about-feature-title">Privacy-Focused</h3>
                  <p className="about-feature-description">
                    Your resume data is processed securely and not stored permanently in our systems.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="about-section about-tips">
            <div className="about-section-content">
              <h2 className="about-section-title">How to Get the Most from ResumX</h2>
              <div className="about-tips-content">
                <p className="about-tips-intro">
                  For optimal results, we recommend uploading a complete, up-to-date resume in PDF format. While our system can process other formats, PDFs typically preserve formatting better. Consider these tips:
                </p>
                <div className="about-tips-grid">
                  <div className="about-tip-item">
                    <span className="about-tip-number">1</span>
                    <p>Include your full work history, education, and skills sections</p>
                  </div>
                  <div className="about-tip-item">
                    <span className="about-tip-number">2</span>
                    <p>Be specific about your achievements and responsibilities</p>
                  </div>
                  <div className="about-tip-item">
                    <span className="about-tip-number">3</span>
                    <p>Quantify your impact where possible (e.g., percentages, numbers)</p>
                  </div>
                  <div className="about-tip-item">
                    <span className="about-tip-number">4</span>
                    <p>After receiving feedback, make targeted improvements and consider a follow-up analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="about-section about-cta">
            <div className="about-cta-card">
              <h2 className="about-cta-title">Ready to optimize your resume?</h2>
              <p className="about-cta-description">
                Try our AI-powered resume analysis tool today and get personalized feedback to help you stand out to employers.
              </p>
              <div className="about-cta-button">
                <Button 
                  variant="primary" 
                  size="large"
                  onClick={() => window.location.href = '/analyze'}
                >
                  Analyze My Resume
                </Button>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="about-section about-faq">
            <div className="about-section-content">
              <h2 className="about-section-title">Frequently Asked Questions</h2>
              <div className="about-faq-list">
                <div className="about-faq-item">
                  <h3 className="about-faq-question">Is my resume data secure?</h3>
                  <p className="about-faq-answer">
                    Yes. We process your resume data securely and do not store it permanently. Your privacy is our priority.
                  </p>
                </div>
                <div className="about-faq-item">
                  <h3 className="about-faq-question">How accurate is the AI analysis?</h3>
                  <p className="about-faq-answer">
                    Our AI models are highly accurate and continuously improving. However, we recommend using the feedback as guidance rather than absolute rules. The AI provides suggestions based on best practices and trends in hiring.
                  </p>
                </div>
                <div className="about-faq-item">
                  <h3 className="about-faq-question">Which file formats are supported?</h3>
                  <p className="about-faq-answer">
                    We currently support PDF, DOCX, and TXT file formats. For best results, we recommend uploading a PDF.
                  </p>
                </div>
                <div className="about-faq-item">
                  <h3 className="about-faq-question">Is there a limit to how many resumes I can analyze?</h3>
                  <p className="about-faq-answer">
                    In the current version, there are no specific limits. However, we may introduce usage tiers in the future.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
