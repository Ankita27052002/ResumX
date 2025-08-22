import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-red-50 text-red-800 border border-red-200 max-w-2xl mx-auto my-8">
      <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
      <p className="text-sm mb-4">We apologize for the inconvenience. Please try again or contact support if the issue persists.</p>
      <div className="bg-red-100 p-4 rounded mb-4 max-w-full overflow-auto">
        <pre className="text-xs">{error.message}</pre>
      </div>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
};

const withErrorBoundary = (Component) => {
  const WrappedComponent = (props) => (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  // Set display name for better debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WrappedComponent.displayName = `withErrorBoundary(${displayName})`;
  
  return WrappedComponent;
};

export { ErrorFallback, withErrorBoundary };
