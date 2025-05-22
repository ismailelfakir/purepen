import React from 'react';
import { FeedbackItem } from '../types';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

interface FeedbackSidebarProps {
  selectedFeedback?: FeedbackItem | null;
  onClose: () => void;
}

const FeedbackSidebar: React.FC<FeedbackSidebarProps> = ({ 
  selectedFeedback, 
  onClose 
}) => {
  if (!selectedFeedback) return null;

  let icon;
  let title;
  let bgColor;
  
  switch (selectedFeedback.type) {
    case 'plagiarism':
      icon = <AlertTriangle className="h-6 w-6 text-error-500" />;
      title = 'Potential Plagiarism';
      bgColor = 'bg-error-50';
      break;
    case 'citation':
      icon = <Info className="h-6 w-6 text-warning-500" />;
      title = 'Citation Needed';
      bgColor = 'bg-warning-50';
      break;
    case 'paraphrase':
      icon = <Info className="h-6 w-6 text-primary-500" />;
      title = 'Paraphrasing Suggestion';
      bgColor = 'bg-primary-50';
      break;
    case 'positive':
      icon = <CheckCircle className="h-6 w-6 text-success-500" />;
      title = 'Great Work!';
      bgColor = 'bg-success-50';
      break;
    default:
      icon = <Info className="h-6 w-6 text-gray-500" />;
      title = 'Feedback';
      bgColor = 'bg-gray-50';
  }

  return (
    <div className={`${bgColor} border-l border-gray-200 p-4 w-full md:w-80 animate-slide-up`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          {icon}
          <h3 className="ml-2 font-medium text-gray-900">{title}</h3>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-2">{selectedFeedback.message}</p>
        
        {selectedFeedback.suggestion && (
          <div className="mt-3 p-3 bg-white rounded border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Suggestion:</p>
            <p className="text-sm text-gray-800">{selectedFeedback.suggestion}</p>
          </div>
        )}

        {selectedFeedback.severity && (
          <div className="mt-3 flex items-center">
            <span className="text-xs text-gray-500 mr-2">Severity:</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              selectedFeedback.severity === 'high' ? 'bg-error-100 text-error-700' : 
              selectedFeedback.severity === 'medium' ? 'bg-warning-100 text-warning-700' : 
              'bg-gray-100 text-gray-700'
            }`}>
              {selectedFeedback.severity.charAt(0).toUpperCase() + selectedFeedback.severity.slice(1)}
            </span>
          </div>
        )}
      </div>

      <button className="w-full mt-2 bg-white text-primary-600 border border-primary-600 hover:bg-primary-50 font-medium py-2 px-4 rounded transition-colors">
        Apply Suggestion
      </button>
    </div>
  );
};

export default FeedbackSidebar;