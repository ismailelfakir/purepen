import React from 'react';
import { FeedbackItem } from '../types';
import { AlertTriangle, CheckCircle, Info, X, Youtube, BookOpen, ExternalLink } from 'lucide-react';

interface Resource {
  title: string;
  link: string;
  snippet: string;
  type: 'video' | 'article';
}

interface RelatedContent {
  text: string;
  resources: Resource[];
}

interface FeedbackSidebarProps {
  selectedFeedback?: FeedbackItem | null;
  relatedContent?: RelatedContent[];
  onClose: () => void;
}

const FeedbackSidebar: React.FC<FeedbackSidebarProps> = ({ 
  selectedFeedback, 
  relatedContent,
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

  // Find related content for the selected text
  const matchingContent = selectedFeedback.type === 'plagiarism' && relatedContent?.find(
    content => content.text === selectedFeedback.text
  );

  return (
    <div className={`${bgColor} border-l border-gray-200 p-4 w-full md:w-80 animate-slide-up overflow-y-auto`}>
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

        {matchingContent && matchingContent.resources.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Related Resources</h4>
            <div className="space-y-3">
              {matchingContent.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-white rounded border border-gray-200 hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-start">
                    {resource.type === 'video' ? (
                      <Youtube className="h-5 w-5 text-error-500 mt-1 flex-shrink-0" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                    )}
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {resource.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {resource.snippet}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-primary-600">
                        <span>Learn more</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
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