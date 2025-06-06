import React, { useState } from 'react';
import Button from './Button';
import { Upload } from 'lucide-react';

interface TextEditorProps {
  onSubmit: (title: string, text: string) => void;
  isSubmitting?: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({ onSubmit, isSubmitting = false }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter a title for your assignment.');
      return;
    }
    
    if (!content.trim() || content.length < 50) {
      setError('Please enter your text (minimum 50 characters).');
      return;
    }
    
    setError(null);
    onSubmit(title, content);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.includes('text') && !file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
      setError('Please upload a text file (.txt or .md).');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setContent(event.target.result as string);
        
        if (!title) {
          const fileName = file.name.replace(/\.[^/.]+$/, "");
          setTitle(fileName);
        }
      }
    };
    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };
    reader.readAsText(file);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-error-50 dark:bg-error-900/50 border border-error-200 dark:border-error-800 text-error-700 dark:text-error-200 rounded-md">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Assignment Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="mt-1 w-full rounded-md border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400"
          placeholder="Enter a title for your assignment"
        />
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Assignment Text
        </label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          rows={12}
          className="mt-1 w-full rounded-md border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400"
          placeholder="Type or paste your assignment text here..."
        ></textarea>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">Or upload a text file:</span>
        <label className="cursor-pointer inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300">
          <Upload className="h-4 w-4" />
          <span className="text-sm">Upload</span>
          <input
            type="file"
            accept=".txt,.md,text/plain,text/markdown"
            className="sr-only"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      
      <div className="pt-2">
        <Button 
          type="submit" 
          variant="primary" 
          isLoading={isSubmitting}
          disabled={isSubmitting || !title.trim() || !content.trim() || content.length < 50}
        >
          Analyze for Integrity
        </Button>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          By submitting, you agree to our privacy policy. Your text will be analyzed for academic integrity but will not be stored permanently without your consent.
        </p>
      </div>
    </form>
  );
};

export default TextEditor;