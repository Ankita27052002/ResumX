import React, { useState } from 'react';
import Button from '@components/common/Button';

/**
 * Component that allows manual text input as a fallback when file uploads fail
 */
const ManualTextInput = ({ onTextSubmit, defaultText = '' }) => {
  const [text, setText] = useState(defaultText);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setIsSubmitting(true);
    
    // Add a small delay to simulate processing
    setTimeout(() => {
      onTextSubmit(text);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="mt-6 border border-gray-300 rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Manually Enter Resume Text
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        If file upload is not working, you can paste your resume text directly here.
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your resume text here..."
          className="w-full h-40 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <div className="flex justify-end mt-3">
          <Button 
            type="submit"
            variant="primary"
            disabled={isSubmitting || !text.trim()}
          >
            {isSubmitting ? 'Processing...' : 'Use This Text'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManualTextInput;
