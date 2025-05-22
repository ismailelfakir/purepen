import React from 'react';
import { FeedbackItem } from '../types';

interface FeedbackHighlighterProps {
  text: string;
  feedbackItems: FeedbackItem[];
  onFeedbackClick: (item: FeedbackItem) => void;
}

const FeedbackHighlighter: React.FC<FeedbackHighlighterProps> = ({ 
  text, 
  feedbackItems,
  onFeedbackClick
}) => {
  // Sort feedback items by startIndex to process them in order
  const sortedItems = [...feedbackItems].sort((a, b) => a.startIndex - b.startIndex);
  
  // Create segments of text with appropriate highlighting
  const segments: JSX.Element[] = [];
  let lastIndex = 0;
  
  sortedItems.forEach((item, index) => {
    // Add non-highlighted text before the current item
    if (item.startIndex > lastIndex) {
      segments.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex, item.startIndex)}
        </span>
      );
    }
    
    // Get highlight color based on feedback type
    let highlightClass = '';
    switch (item.type) {
      case 'plagiarism':
        highlightClass = 'bg-error-500 bg-opacity-20 text-error-900 cursor-pointer';
        break;
      case 'citation':
        highlightClass = 'bg-warning-500 bg-opacity-20 text-warning-900 cursor-pointer';
        break;
      case 'paraphrase':
        highlightClass = 'bg-primary-500 bg-opacity-20 text-primary-900 cursor-pointer';
        break;
      case 'positive':
        highlightClass = 'bg-success-500 bg-opacity-20 text-success-900 cursor-pointer';
        break;
      default:
        highlightClass = 'bg-gray-200 cursor-pointer';
    }
    
    // Add highlighted text segment
    segments.push(
      <span 
        key={`highlight-${index}`}
        className={`${highlightClass} px-0.5 rounded`}
        onClick={() => onFeedbackClick(item)}
      >
        {text.substring(item.startIndex, item.endIndex)}
      </span>
    );
    
    lastIndex = item.endIndex;
  });
  
  // Add any remaining text
  if (lastIndex < text.length) {
    segments.push(
      <span key={`text-end`}>
        {text.substring(lastIndex)}
      </span>
    );
  }
  
  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200 whitespace-pre-wrap">
      {segments}
    </div>
  );
};

export default FeedbackHighlighter;