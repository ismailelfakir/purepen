import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FeedbackHighlighter from '../components/FeedbackHighlighter';
import FeedbackSidebar from '../components/FeedbackSidebar';
import IntegrityScore from '../components/IntegrityScore';
import Button from '../components/Button';
import { FeedbackItem, TextFeedback } from '../types';
import { ArrowLeft, Download, Share2 } from 'lucide-react';

interface RelatedContent {
  text: string;
  resources: {
    title: string;
    link: string;
    snippet: string;
    type: 'video' | 'article';
  }[];
}

const Feedback: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [feedback, setFeedback] = useState<TextFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [relatedContent, setRelatedContent] = useState<RelatedContent[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    
    const pollAssignment = async () => {
      try {
        const response = await axios.get(`/assignments/${id}`);
        const assignment = response.data;
        
        setTitle(assignment.title);
        setContent(assignment.content);
        
        if (assignment.status === 'complete') {
          setFeedback({
            submissionId: assignment._id,
            integrityScore: assignment.integrityScore,
            summary: assignment.feedback.summary,
            feedbackItems: assignment.feedback.items
          });
          setRelatedContent(assignment.feedback.relatedContent || []);
          setIsLoading(false);
          clearInterval(progressInterval);
          setAnalysisProgress(100);
        } else if (assignment.status === 'error') {
          setError('Failed to analyze assignment');
          setIsLoading(false);
          clearInterval(progressInterval);
        } else {
          // Continue polling
          setTimeout(() => pollAssignment(), 2000);
        }
      } catch (err: any) {
        setError(err.response?.data?.msg || 'Failed to load feedback');
        setIsLoading(false);
        clearInterval(progressInterval);
      }
    };

    // Start progress animation
    progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 1000);

    pollAssignment();

    return () => {
      clearInterval(progressInterval);
    };
  }, [id]);
  
  const handleFeedbackClick = (item: FeedbackItem) => {
    setSelectedFeedback(item);
  };
  
  const handleCloseSidebar = () => {
    setSelectedFeedback(null);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
                  Analysis in progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-primary-600">
                  {analysisProgress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
              <div 
                style={{ width: `${analysisProgress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-500"
              ></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600">Analyzing your assignment...</p>
          <p className="text-sm text-gray-500">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-error-50 border border-error-200 text-error-700 p-4 rounded-md">
          {error}
          <Button 
            variant="primary"
            onClick={() => navigate('/new')}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/dashboard')}
          className="mr-4 p-1 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5 text-gray-500" />
        </button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-600">Analysis completed on {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="lg:w-3/4 order-2 lg:order-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Assignment Text</h2>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                  <Download className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {feedback && (
              <FeedbackHighlighter
                text={content}
                feedbackItems={feedback.feedbackItems}
                onFeedbackClick={handleFeedbackClick}
              />
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Summary</h2>
            <p className="text-gray-700">{feedback?.summary}</p>
            
            <h3 className="text-md font-medium text-gray-900 mt-6 mb-2">Issues Breakdown</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {feedback && (
                <>
                  <div className="bg-error-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-500">Plagiarism</span>
                    <p className="text-xl font-bold text-error-600">
                      {feedback.feedbackItems.filter(item => item.type === 'plagiarism').length}
                    </p>
                  </div>
                  <div className="bg-warning-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-500">Citation Needed</span>
                    <p className="text-xl font-bold text-warning-600">
                      {feedback.feedbackItems.filter(item => item.type === 'citation').length}
                    </p>
                  </div>
                  <div className="bg-primary-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-500">Paraphrasing</span>
                    <p className="text-xl font-bold text-primary-600">
                      {feedback.feedbackItems.filter(item => item.type === 'paraphrase').length}
                    </p>
                  </div>
                  <div className="bg-success-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-500">Good Practice</span>
                    <p className="text-xl font-bold text-success-600">
                      {feedback.feedbackItems.filter(item => item.type === 'positive').length}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              variant="primary"
              onClick={() => navigate('/new')}
              className="mr-4"
            >
              Check Another Assignment
            </Button>
            <Button variant="outline">
              Download Report
            </Button>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className={`lg:w-1/4 order-1 lg:order-2 ${selectedFeedback ? 'lg:block' : 'lg:block'}`}>
          <div className="sticky top-24">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Integrity Score</h2>
              <div className="flex justify-center">
                <IntegrityScore score={feedback?.integrityScore || 0} />
              </div>
            </div>
            
            {!selectedFeedback && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">How to Use</h2>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-error-100 text-error-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">!</span>
                    <span><strong>Red highlights</strong> indicate potential plagiarism.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-warning-100 text-warning-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">i</span>
                    <span><strong>Yellow highlights</strong> suggest adding citations.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary-100 text-primary-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">P</span>
                    <span><strong>Blue highlights</strong> suggest better paraphrasing.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-success-100 text-success-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">✓</span>
                    <span><strong>Green highlights</strong> indicate good practices.</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  Click on any highlight to see detailed feedback and suggestions.
                </p>
              </div>
            )}
            
            <FeedbackSidebar
              selectedFeedback={selectedFeedback}
              relatedContent={relatedContent}
              onClose={handleCloseSidebar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;