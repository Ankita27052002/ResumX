import React from 'react';
import Layout from '@components/layout/Layout';
import Button from '@components/common/Button';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="max-w-xl mx-auto text-center py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <svg className="h-24 w-24 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Page not found</h1>
        <p className="mt-4 text-lg text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10">
          <Button 
            variant="primary"
            onClick={() => window.location.href = '/'}
          >
            Go back home
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
