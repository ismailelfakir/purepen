import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextEditor from '../components/TextEditor';

const NewAssignment: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (title: string, text: string) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await axios.post('/assignments/submit', {
        title,
        content: text
      });

      navigate(`/feedback/${response.data.submissionId}`);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Failed to submit assignment');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">New Assignment</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Submit your writing for an academic integrity check.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-error-50 dark:bg-error-900/50 border border-error-200 dark:border-error-800 text-error-700 dark:text-error-200 text-sm rounded-md">
          {error}
        </div>
      )}
      
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <TextEditor
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
      
      <div className="mt-8 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800 p-6">
        <h2 className="text-lg font-medium text-primary-900 dark:text-primary-100 mb-4">How it works</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
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
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
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