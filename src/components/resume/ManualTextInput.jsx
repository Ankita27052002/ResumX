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
    <div className="mt-8 bg-white/90 border border-gray-200 rounded-2xl p-8 shadow-xl max-w-xl mx-auto">
      <h3 className="text-xl font-bold text-gray-900 mb-3">Manually Enter Resume Text</h3>
      <p className="text-base text-gray-600 mb-6">If file upload is not working, you can paste your resume text directly here.</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your resume text here..."
          className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base resize-none"
          required
        />
        <div className="flex justify-end mt-5">
          <Button 
            type="submit"
            variant="primary"
            className="px-8 py-2 text-lg shadow-md"
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
