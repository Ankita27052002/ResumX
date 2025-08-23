import axios from 'axios';
import { cleanResumeText } from '@utils/pdfUtils';

// Create an axios instance for OpenRouter API
const openRouterAPI = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
  },
});

export const analyzeResume = async resumeText => {
  try {
    // Clean and validate the text before sending to API
    const cleanedText = cleanResumeText(resumeText);

    const response = await openRouterAPI.post('/chat/completions', {
      model: 'deepseek/deepseek-r1:free', // Using deepseek via OpenRouter
      messages: [
        {
          role: 'system',
          content: `You are an expert resume analyzer and career coach. 
          Analyze the provided resume and give constructive feedback in the following categories:
          1. Overall Structure and Formatting
          2. Professional Summary/Objective
          3. Skills Section
          4. Work Experience
          5. Education
          6. Project Descriptions
          7. Achievements and Impact
          8. Keywords and ATS Optimization
          9. Action Verbs and Language
          10. Suggestions for Improvement
          
          Format your response with clear headings for each section. Be specific with examples from the resume.
          Provide actionable feedback that can help improve the resume immediately.`,
        },
        {
          role: 'user',
          content: cleanedText,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error(error.message || 'Failed to analyze resume. Please try again later.');
  }
};

export const extractResumeInfo = async resumeText => {
  try {
    // Clean and validate the text before sending to API
    const cleanedText = cleanResumeText(resumeText);

    const response = await openRouterAPI.post('/chat/completions', {
      model: 'deepseek/deepseek-r1:free', // Using deepseek via OpenRouter
      messages: [
        {
          role: 'system',
          content: `Extract and organize the following key information from the resume in JSON format:
          {
            "contact": {
              "name": "",
              "email": "",
              "phone": "",
              "location": "",
              "linkedIn": "",
              "portfolio": ""
            },
            "summary": "",
            "skills": [],
            "workExperience": [
              {
                "company": "",
                "position": "",
                "duration": "",
                "location": "",
                "responsibilities": []
              }
            ],
            "education": [
              {
                "institution": "",
                "degree": "",
                "field": "",
                "graduation": "",
                "gpa": ""
              }
            ],
            "projects": [
              {
                "title": "",
                "description": "",
                "technologies": [],
                "link": ""
              }
            ],
            "certifications": []
          }
          
          Return only the JSON with no additional text.`,
        },
        {
          role: 'user',
          content: cleanedText,
        },
      ],
      temperature: 0.1,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    try {
      return JSON.parse(response.data.choices[0].message.content);
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      throw new Error('Failed to parse resume information. Invalid format received.');
    }
  } catch (error) {
    console.error('Error extracting resume info:', error);
    throw new Error(
      error.message || 'Failed to extract resume information. Please try again later.'
    );
  }
};

export const generateJobRecommendations = async resumeInfo => {
  try {
    const response = await openRouterAPI.post('/chat/completions', {
      model: 'deepseek/deepseek-r1:free', // Using GPT-4o via OpenRouter
      messages: [
        {
          role: 'system',
          content: `Based on the provided resume information, recommend suitable job roles, industries, and potential career paths.
          Format your response in JSON as follows:
          {
            "recommendedRoles": [
              {
                "title": "",
                "description": "",
                "fitReason": "",
                "skillsMatch": [],
                "skillsToAcquire": []
              }
            ],
            "suitableIndustries": [
              {
                "name": "",
                "reason": ""
              }
            ],
            "careerPathways": [
              {
                "path": "",
                "description": "",
                "timelineEstimate": "",
                "nextSteps": []
              }
            ]
          }`,
        },
        {
          role: 'user',
          content: JSON.stringify(resumeInfo),
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error generating job recommendations:', error);
    throw new Error('Failed to generate job recommendations. Please try again later.');
  }
};

export default {
  analyzeResume,
  extractResumeInfo,
  generateJobRecommendations,
};

// import axios from 'axios';

// // Create an axios instance for OpenRouter API
// const openRouterAPI = axios.create({
//   baseURL: 'https://openrouter.ai/api/v1',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
//   },
// });

// export const analyzeResume = async resumeText => {
//   try {
//     const response = await openRouterAPI.post('/chat/completions', {
//       model: 'deepseek/deepseek-r1:free', // Using GPT-4o via OpenRouter
//       messages: [
//         {
//           role: 'system',
//           content: `You are an expert resume analyzer and career coach.
//           Analyze the provided resume and give constructive feedback in the following categories:
//           1. Overall Structure and Formatting
//           2. Professional Summary/Objective
//           3. Skills Section
//           4. Work Experience
//           5. Education
//           6. Project Descriptions
//           7. Achievements and Impact
//           8. Keywords and ATS Optimization
//           9. Action Verbs and Language
//           10. Suggestions for Improvement

//           Format your response with clear headings for each section. Be specific with examples from the resume.
//           Provide actionable feedback that can help improve the resume immediately.`,
//         },
//         {
//           role: 'user',
//           content: resumeText,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 2500,
//     });

//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error('Error analyzing resume:', error);
//     throw new Error('Failed to analyze resume. Please try again later.');
//   }
// };

// export const extractResumeInfo = async resumeText => {
//   try {
//     const response = await openRouterAPI.post('/chat/completions', {
//       model: 'deepseek/deepseek-r1:free', // Using GPT-4o via OpenRouter
//       messages: [
//         {
//           role: 'system',
//           content: `Extract and organize the following key information from the resume in JSON format:
//           {
//             "contact": {
//               "name": "",
//               "email": "",
//               "phone": "",
//               "location": "",
//               "linkedIn": "",
//               "portfolio": ""
//             },
//             "summary": "",
//             "skills": [],
//             "workExperience": [
//               {
//                 "company": "",
//                 "position": "",
//                 "duration": "",
//                 "location": "",
//                 "responsibilities": []
//               }
//             ],
//             "education": [
//               {
//                 "institution": "",
//                 "degree": "",
//                 "field": "",
//                 "graduation": "",
//                 "gpa": ""
//               }
//             ],
//             "projects": [
//               {
//                 "title": "",
//                 "description": "",
//                 "technologies": [],
//                 "link": ""
//               }
//             ],
//             "certifications": []
//           }

//           Return only the JSON with no additional text.`,
//         },
//         {
//           role: 'user',
//           content: resumeText,
//         },
//       ],
//       temperature: 0.1,
//       max_tokens: 2000,
//       response_format: { type: 'json_object' },
//     });

//     return JSON.parse(response.data.choices[0].message.content);
//   } catch (error) {
//     console.error('Error extracting resume info:', error);
//     throw new Error('Failed to extract resume information. Please try again later.');
//   }
// };

// export const generateJobRecommendations = async resumeInfo => {
//   try {
//     const response = await openRouterAPI.post('/chat/completions', {
//       model: 'deepseek/deepseek-r1:free', // Using GPT-4o via OpenRouter
//       messages: [
//         {
//           role: 'system',
//           content: `Based on the provided resume information, recommend suitable job roles, industries, and potential career paths.
//           Format your response in JSON as follows:
//           {
//             "recommendedRoles": [
//               {
//                 "title": "",
//                 "description": "",
//                 "fitReason": "",
//                 "skillsMatch": [],
//                 "skillsToAcquire": []
//               }
//             ],
//             "suitableIndustries": [
//               {
//                 "name": "",
//                 "reason": ""
//               }
//             ],
//             "careerPathways": [
//               {
//                 "path": "",
//                 "description": "",
//                 "timelineEstimate": "",
//                 "nextSteps": []
//               }
//             ]
//           }`,
//         },
//         {
//           role: 'user',
//           content: JSON.stringify(resumeInfo),
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 2000,
//       response_format: { type: 'json_object' },
//     });

//     return JSON.parse(response.data.choices[0].message.content);
//   } catch (error) {
//     console.error('Error generating job recommendations:', error);
//     throw new Error('Failed to generate job recommendations. Please try again later.');
//   }
// };

// export default {
//   analyzeResume,
//   extractResumeInfo,
//   generateJobRecommendations,
// };
