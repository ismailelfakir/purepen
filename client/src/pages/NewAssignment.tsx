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
    // Existing JSX...
  );
};

export default NewAssignment;