# ResumX - AI Resume Analyzer

ResumX is an AI-powered resume analysis tool built with React, Vite, and Tailwind CSS. It helps job seekers optimize their resumes with personalized feedback and career insights.

## Features

- **Resume Analysis:** Upload your resume and get comprehensive AI-powered feedback on structure, content, impact statements, and more.
- **ATS Optimization:** Receive recommendations to help your resume pass through Applicant Tracking Systems.
- **Skills Assessment:** Identify your key skills and areas for improvement.
- **Career Recommendations:** Get personalized job role and industry recommendations based on your experience.
- **Career Pathway Insights:** Explore potential career paths and next steps for professional growth.

## Tech Stack

- **Frontend Framework:** React.js
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **HTTP Client:** Axios
- **Error Handling:** React Error Boundary
- **PDF Processing:** PDF.js
- **AI Integration:** OpenRouter API (for access to advanced language models)

## Project Structure

```
src/
├── assets/           # Static assets
├── components/       # Reusable components
│   ├── common/       # Common UI components
│   ├── layout/       # Layout components
│   └── resume/       # Resume-specific components
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── pages/            # Application pages
├── services/         # API services
├── styles/           # Global styles
└── utils/            # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/resumx.git
   cd resumx
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your OpenRouter API key:
   ```
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Navigate to the "Analyze Resume" page
2. Upload your resume (PDF, DOCX, or TXT format)
3. Click "Analyze My Resume"
4. Review the detailed analysis, resume profile, and career recommendations

## Best Practices Implemented

- **Folder Structure:** Organized components, pages, and utilities for scalability
- **Error Handling:** Used React Error Boundary for graceful error recovery
- **Context API:** Implemented for state management across components
- **Custom Hooks:** Created for reusable logic
- **Path Aliases:** Configured for cleaner imports
- **Responsive Design:** Mobile-friendly UI with Tailwind CSS
- **Component Composition:** Reusable and composable UI components
- **Loading States:** Clear feedback during async operations
- **Environment Variables:** Secure API key management

## License

[MIT](LICENSE)

## Acknowledgements

- OpenRouter for AI model access
- React and Vite communities for excellent documentation
- Tailwind CSS for the styling frameworkte

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
