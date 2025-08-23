import React, { useState, useRef } from 'react';
import { useResumeContext } from '@context/ResumeContext';

const FileUploader = () => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const { analyzeResumeFile, isAnalyzing, processingStage, error } = useResumeContext();

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await analyzeResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async e => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await analyzeResumeFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`p-6 border-2 ${dragActive ? 'border-blue-600 bg-blue-50' : 'border-dashed border-gray-300'} 
                    rounded-lg text-center cursor-pointer transition-all duration-200 hover:bg-gray-50`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt"
          onChange={handleChange}
          className="hidden"
          disabled={isAnalyzing}
        />

        {isAnalyzing ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-gray-700 font-medium">
              {processingStage === 'extracting' && 'Extracting text from your resume...'}
              {processingStage === 'analyzing' && 'Analyzing your resume...'}
              {processingStage === 'generating' && 'Generating recommendations...'}
              {!processingStage && 'Processing your resume...'}
            </p>
          </div>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mt-2 text-lg font-medium text-gray-700">
              Drag and drop your resume or click to browse
            </p>
            <p className="mt-1 text-sm text-gray-500">Supports PDF and Text files</p>
          </>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;

// import React, { useRef, useState } from 'react';
// import useResumeUpload from '@hooks/useResumeUpload';
// import Button from '@components/common/Button';
// import ManualTextInput from './ManualTextInput';
// import PDFParsingFallback from './PDFParsingFallback';
// import PDFErrorHelper from './PDFErrorHelper';

// const FileUploader = ({ onFileTextReady }) => {
//   const fileInputRef = useRef(null);
//   const [showManualInput, setShowManualInput] = useState(false);
//   const {
//     fileName,
//     fileText,
//     isLoading,
//     error,
//     fileType,
//     handleFileChange,
//     reset
//   } = useResumeUpload();

//   // When file text is ready, notify parent component
//   React.useEffect(() => {
//     if (fileText && !isLoading) {
//       onFileTextReady(fileText);
//     }
//   }, [fileText, isLoading, onFileTextReady]);

//   const handleBrowseClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleReset = () => {
//     reset();
//     setShowManualInput(false);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleManualTextSubmit = (text) => {
//     if (text && text.trim()) {
//       onFileTextReady(text);
//     }
//   };

//   const toggleManualInput = () => {
//     setShowManualInput(prev => !prev);
//   };

//   // Check if the error is PDF-specific
//   const isPDFError = error && fileType === 'pdf';

//   return (
//     <div className="w-full max-w-xl mx-auto">
//       <div className={`border-2 border-dashed ${error ? 'border-red-300' : 'border-gray-300'} rounded-lg p-6 text-center hover:border-indigo-500 transition-colors`}>
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           accept=".pdf,.docx,.txt"
//           className="hidden"
//         />

//         {isLoading ? (
//           <div className="py-8">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Extracting text from your resume...</p>
//           </div>
//         ) : fileName ? (
//           <div className="py-4">
//             <div className="flex items-center justify-center mb-4">
//               <svg
//                 className="w-10 h-10 text-green-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//             <p className="text-lg font-medium text-gray-900">{fileName}</p>
//             <p className="mt-1 text-sm text-gray-500">Successfully uploaded</p>
//             <button
//               onClick={handleReset}
//               className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
//             >
//               Upload a different file
//             </button>
//           </div>
//         ) : (
//           <div className="py-8">
//             <svg
//               className="mx-auto h-14 w-14 text-gray-400 mb-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//               />
//             </svg>
//             <p className="text-lg font-medium text-gray-900">Upload your resume</p>
//             <p className="mt-1 text-sm text-gray-500">PDF, DOCX, or TXT files only (max 5MB)</p>
//             <Button
//               variant="primary"
//               onClick={handleBrowseClick}
//               className="mt-4"
//             >
//               Browse Files
//             </Button>

//             <div className="mt-4 border-t border-gray-200 pt-4">
//               <button
//                 onClick={toggleManualInput}
//                 className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
//               >
//                 Or enter resume text manually
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {error && !isPDFError && (
//         <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
//           <div className="flex items-start">
//             <svg className="h-5 w-5 text-red-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <div>
//               <p className="font-medium">Error: {error}</p>
//               {error.includes('scanned') || error.includes('images') ? (
//                 <div className="mt-1 text-sm">
//                   <p>Tips for better results:</p>
//                   <ul className="list-disc pl-5 mt-1">
//                     <li>Use a text-based PDF rather than scanned images</li>
//                     <li>Convert your document to plain text (.txt) format</li>
//                     <li>Try copying and pasting the text directly</li>
//                   </ul>
//                 </div>
//               ) : (
//                 <p className="mt-1 text-sm">Try converting your file to a plain text (.txt) format or uploading a different file.</p>
//               )}
//               <div className="mt-3 flex space-x-3">
//                 <Button
//                   variant="danger"
//                   size="small"
//                   onClick={handleReset}
//                 >
//                   Try Again
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   size="small"
//                   onClick={toggleManualInput}
//                 >
//                   Enter Text Manually
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {isPDFError && (
//         <div>
//           <PDFErrorHelper errorMessage={error} />
//           <div className="mt-3 flex space-x-3 justify-center">
//             <Button
//               variant="danger"
//               size="small"
//               onClick={handleReset}
//             >
//               Try Again
//             </Button>
//             <Button
//               variant="secondary"
//               size="small"
//               onClick={toggleManualInput}
//             >
//               Enter Text Manually
//             </Button>
//           </div>
//         </div>
//       )}

//       {showManualInput && (
//         <ManualTextInput onTextSubmit={handleManualTextSubmit} />
//       )}
//     </div>
//   );
// };

// export default FileUploader;
