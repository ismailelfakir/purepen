// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import TextEditor from '../components/TextEditor';

// const NewAssignment: React.FC = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();
  
//   const handleSubmit = async (title: string, text: string) => {
//     setIsSubmitting(true);
    
//     // Simulate API call
//     try {
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Generate a random ID for the new submission
//       const newSubmissionId = Math.random().toString(36).substring(2, 15);
      
//       // Normally here we would post to an API
//       console.log('Submitting assignment:', { title, text });
      
//       // Redirect to feedback page
//       navigate(`/feedback/${newSubmissionId}`, { 
//         state: { 
//           title,
//           content: text,
//           isNew: true
//         }
//       });
//     } catch (error) {
//       console.error('Error submitting assignment:', error);
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">New Assignment</h1>
//       <p className="text-gray-600 mb-6">
//         Submit your writing for an academic integrity check.
//       </p>
      
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <TextEditor
//           onSubmit={handleSubmit}
//           isSubmitting={isSubmitting}
//         />
//       </div>
      
//       <div className="mt-8 bg-primary-50 rounded-lg border border-primary-100 p-6">
//         <h2 className="text-lg font-medium text-primary-900 mb-4">How it works</h2>
//         <ol className="list-decimal list-inside space-y-3 text-gray-700">
//           <li>
//             <span className="font-medium">Submit your text:</span> Either paste your content or upload a text file.
//           </li>
//           <li>
//             <span className="font-medium">AI analysis:</span> Our system checks your writing for potential plagiarism and citation issues.
//           </li>
//           <li>
//             <span className="font-medium">Review feedback:</span> Get detailed suggestions on how to improve your writing's academic integrity.
//           </li>
//           <li>
//             <span className="font-medium">Make improvements:</span> Apply the suggestions to improve your integrity score.
//           </li>
//         </ol>
//         <div className="mt-4 text-sm text-gray-600">
//           <p className="font-medium">Privacy note:</p>
//           <p>
//             Your submissions are processed securely. You can choose to delete your data at any time from your profile settings.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewAssignment;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextEditor from '../components/TextEditor';
import axios from 'axios';

const NewAssignment: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (title: string, text: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('You must be logged in to submit an assignment.');
      }

      console.log('Submitting assignment:', { title, text });
      const response = await axios.post(
        'http://localhost:5000/api/assignments/submit',
        { title, content: text },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        }
      );

      console.log('Submission response:', response.data);

      const { submissionId } = response.data;

      navigate(`/feedback/${submissionId}`, {
        state: {
          title,
          content: text,
          isNew: true,
        },
      });
    } catch (error: any) {
      console.error('Error submitting assignment:', error.response ? error.response.data : error.message);
      setError(error.response?.data?.msg || error.message || 'Failed to submit assignment. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">New Assignment</h1>
      <p className="text-gray-600 mb-6">
        Submit your writing for an academic integrity check.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-error-50 border border-error-200 text-error-700 text-sm rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <TextEditor
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

      <div className="mt-8 bg-primary-50 rounded-lg border border-primary-100 p-6">
        <h2 className="text-lg font-medium text-primary-900 mb-4">How it works</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>
            <span className="font-medium">Submit your text:</span> Either paste your content or upload a text file.
          </li>
          <li>
            <span className="font-medium">AI analysis:</span> Our system checks your writing for potential plagiarism and citation issues.
          </li>
          <li>
            <span className="font-medium">Review feedback:</span> Get detailed suggestions on how to improve your writing's academic integrity.
          </li>
          <li>
            <span className="font-medium">Make improvements:</span> Apply the suggestions to improve your integrity score.
          </li>
        </ol>
        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium">Privacy note:</p>
          <p>
            Your submissions are processed securely. You can choose to delete your data at any time from your profile settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewAssignment;