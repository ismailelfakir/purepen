import React from 'react';
import { Link } from 'react-router-dom';
import { TextSubmission } from '../types';
import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface DashboardCardProps {
  submission: TextSubmission;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ submission }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusIcon = () => {
    switch (submission.status) {
      case 'analyzing':
        return <Clock className="h-5 w-5 text-primary-500" />;
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-success-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-error-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (submission.status) {
      case 'analyzing':
        return 'Analyzing...';
      case 'complete':
        return 'Analysis Complete';
      case 'error':
        return 'Analysis Error';
      default:
        return 'Unknown Status';
    }
  };

  const getScoreColor = () => {
    if (submission.integrityScore >= 90) return 'text-success-500';
    if (submission.integrityScore >= 70) return 'text-green-500';
    if (submission.integrityScore >= 50) return 'text-yellow-500';
    return 'text-error-500';
  };

  return (
    <Link 
      to={`/feedback/${submission.id}`} 
      className="block transition-all hover:shadow-lg border border-gray-200 rounded-lg overflow-hidden hover:-translate-y-1"
    >
      <div className="p-5 bg-white">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-2">
            <FileText className="h-6 w-6 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-900 line-clamp-1">{submission.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{formatDate(submission.createdAt)}</p>
            </div>
          </div>
          <div className={`text-xl font-bold ${getScoreColor()}`}>
            {submission.integrityScore}
          </div>
        </div>
        
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
          {submission.content.length > 150 
            ? submission.content.substring(0, 150) + '...' 
            : submission.content}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {getStatusIcon()}
            <span className="text-xs text-gray-500">{getStatusText()}</span>
          </div>
          <span className="text-xs text-primary-600 font-medium hover:text-primary-800">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;