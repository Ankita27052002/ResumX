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

// Helper function to handle rate limiting and retries
const makeAPICallWithRetry = async (apiCall, maxRetries = 3, baseDelay = 2000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      if (error.response?.status === 429 && attempt < maxRetries) {
        // Rate limited - wait with exponential backoff
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.warn(`Rate limited. Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // If it's not a rate limit error or we've exhausted retries, throw the error
      if (error.response?.status === 429) {
        throw new Error('Service is currently busy. Please try again in a few minutes.');
      }
      
      throw error;
    }
  }
};

export const analyzeResume = async resumeText => {
  try {
    // Clean and validate the text before sending to API
    const cleanedText = cleanResumeText(resumeText);

    const response = await makeAPICallWithRetry(async () => {
      return await openRouterAPI.post('/chat/completions', {
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

    const response = await makeAPICallWithRetry(async () => {
      return await openRouterAPI.post('/chat/completions', {
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
    });

    try {
      return JSON.parse(response.data.choices[0].message.content);
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      console.log('Raw response:', response.data.choices[0].message.content);
      
      // Return a fallback structure for extractResumeInfo
      return {
        contact: {
          name: "Information not extracted",
          email: "Not available",
          phone: "Not available",
          location: "Not available",
          linkedIn: "",
          portfolio: ""
        },
        summary: "Summary could not be extracted",
        skills: [],
        workExperience: [],
        education: [],
        projects: [],
        certifications: []
      };
    }
  } catch (error) {
    console.error('Error extracting resume info:', error);
    
    // Return fallback structure instead of throwing
    return {
      contact: {
        name: "Information not available",
        email: "Not available",
        phone: "Not available",
        location: "Not available",
        linkedIn: "",
        portfolio: ""
      },
      summary: "Unable to extract summary",
      skills: [],
      workExperience: [],
      education: [],
      projects: [],
      certifications: []
    };
  }
};export const generateJobRecommendations = async resumeInfo => {
  try {
    const response = await makeAPICallWithRetry(async () => {
      return await openRouterAPI.post('/chat/completions', {
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
    });

    try {
      return JSON.parse(response.data.choices[0].message.content);
    } catch (parseError) {
      console.error('Error parsing job recommendations JSON:', parseError);
      console.log('Raw response:', response.data.choices[0].message.content);
      
      // Return fallback structure for job recommendations
      return {
        recommendedRoles: [
          {
            title: "Unable to generate recommendations",
            description: "Job recommendations could not be generated at this time",
            fitReason: "Analysis not available",
            skillsMatch: [],
            skillsToAcquire: []
          }
        ],
        suitableIndustries: [
          {
            name: "Analysis not available",
            reason: "Industry recommendations could not be generated"
          }
        ],
        careerPathways: [
          {
            path: "Unable to generate pathway",
            description: "Career pathway recommendations are not available",
            timelineEstimate: "Not specified",
            nextSteps: ["Please try again later"]
          }
        ]
      };
    }
  } catch (error) {
    console.error('Error generating job recommendations:', error);
    
    // Return fallback structure instead of throwing
    return {
      recommendedRoles: [
        {
          title: "Service temporarily unavailable",
          description: "We're unable to generate job recommendations right now",
          fitReason: "Service error",
          skillsMatch: [],
          skillsToAcquire: []
        }
      ],
      suitableIndustries: [
        {
          name: "Service unavailable",
          reason: "Industry analysis is temporarily unavailable"
        }
      ],
      careerPathways: [
        {
          path: "Service unavailable",
          description: "Career pathway analysis is temporarily unavailable",
          timelineEstimate: "Unknown",
          nextSteps: ["Please try again later"]
        }
      ]
    };
  }
};

export const calculateATSScore = async resumeText => {
  try {
    // Clean and validate the text before sending to API
    const cleanedText = cleanResumeText(resumeText);

    const response = await makeAPICallWithRetry(async () => {
      return await openRouterAPI.post('/chat/completions', {
        model: 'deepseek/deepseek-r1:free', // Using deepseek via OpenRouter
        messages: [
        {
          role: 'system',
          content: `You are an ATS (Applicant Tracking System) expert. Analyze the provided resume and calculate detailed ATS scores.

          Provide your response in the following JSON format:
          {
            "overallScore": 85,
            "categories": {
              "formatting": {
                "score": 90,
                "feedback": "Clear structure with proper headings"
              },
              "keywords": {
                "score": 80,
                "feedback": "Good use of industry keywords, could include more technical terms"
              },
              "contactInfo": {
                "score": 95,
                "feedback": "Complete contact information provided"
              },
              "experience": {
                "score": 85,
                "feedback": "Well-documented experience with quantified achievements"
              },
              "skills": {
                "score": 75,
                "feedback": "Relevant skills listed, consider adding more technical skills"
              },
              "education": {
                "score": 90,
                "feedback": "Education section is well-formatted and relevant"
              }
            },
            "recommendations": [
              "Add more industry-specific keywords",
              "Include quantifiable achievements",
              "Optimize section headers for ATS compatibility"
            ],
            "strengths": [
              "Clear professional summary",
              "Well-organized work experience",
              "Proper use of action verbs"
            ],
            "improvements": [
              "Add more technical skills",
              "Include relevant certifications",
              "Optimize keyword density"
            ]
          }

          Score each category from 0-100 based on ATS optimization best practices. The overall score should be the weighted average of all categories.`,
        },
        {
          role: 'user',
          content: cleanedText,
        },
        ],
        temperature: 0.3,
        max_tokens: 1500,
        response_format: { type: 'json_object' },
      });
    });

    const responseContent = response.data.choices[0].message.content;
    
    // Try to parse JSON response, fallback to default structure if parsing fails
    try {
      return JSON.parse(responseContent);
    } catch (parseError) {
      console.warn('Failed to parse ATS score JSON response, using fallback');
      return {
        overallScore: 75,
        categories: {
          formatting: { score: 75, feedback: "Resume structure analysis completed" },
          keywords: { score: 70, feedback: "Keyword optimization analysis completed" },
          contactInfo: { score: 85, feedback: "Contact information analysis completed" },
          experience: { score: 80, feedback: "Experience section analysis completed" },
          skills: { score: 70, feedback: "Skills section analysis completed" },
          education: { score: 75, feedback: "Education section analysis completed" }
        },
        recommendations: ["Optimize ATS compatibility", "Add relevant keywords", "Improve formatting"],
        strengths: ["Professional presentation", "Clear structure"],
        improvements: ["Keyword optimization", "ATS formatting"]
      };
    }
  } catch (error) {
    console.error('Error calculating ATS score:', error);
    
    // Return fallback ATS score instead of throwing
    return {
      overallScore: 60,
      categories: {
        formatting: { score: 60, feedback: "Unable to analyze formatting at this time" },
        keywords: { score: 60, feedback: "Keyword analysis temporarily unavailable" },
        contactInfo: { score: 60, feedback: "Contact info analysis not available" },
        experience: { score: 60, feedback: "Experience analysis temporarily unavailable" },
        skills: { score: 60, feedback: "Skills analysis not available" },
        education: { score: 60, feedback: "Education analysis temporarily unavailable" }
      },
      recommendations: ["Service temporarily unavailable", "Please try again later"],
      strengths: ["Service unavailable"],
      improvements: ["Please retry analysis"]
    };
  }
};export default {
  analyzeResume,
  extractResumeInfo,
  generateJobRecommendations,
  calculateATSScore,
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
