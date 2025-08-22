import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// Context
import { ResumeProvider } from '@context/ResumeContext';

// Pages
import HomePage from '@pages/HomePage';
import AnalyzePage from '@pages/AnalyzePage';
import AboutPage from '@pages/AboutPage';
import NotFoundPage from '@pages/NotFoundPage';
import DiagnosticsPage from '@pages/dev/DiagnosticsPage';
import DevTools from '@pages/DevTools';

// Components
import { ErrorFallback } from '@components/common/ErrorBoundary';
import DebugMenu from '@components/dev/DebugMenu';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ResumeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Development tools route - only works in dev mode */}
            <Route path="/dev/diagnostics" element={<DiagnosticsPage />} />
            <Route path="/dev/tools" element={<DevTools />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          
          {/* Debug menu - only visible in development mode */}
          <DebugMenu />
        </Router>
      </ResumeProvider>
    </ErrorBoundary>
  );
}

export default App;
