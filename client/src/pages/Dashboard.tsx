import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Calendar, TrendingUp } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import Button from '../components/Button';
import IntegrityScore from '../components/IntegrityScore';
import { TextSubmission } from '../types';

// Mock data for demonstration
const mockSubmissions: TextSubmission[] = [
  {
    id: '1',
    title: 'Research Paper on Climate Change',
    content: 'The effects of climate change have been increasingly evident in recent years. According to Smith (2020), global temperatures have risen by 1.5 degrees Celsius since the pre-industrial era. This has led to significant environmental changes worldwide.',
    createdAt: '2023-06-15T10:30:00Z',
    integrityScore: 92,
    status: 'complete'
  },
  {
    id: '2',
    title: 'Literature Analysis: The Great Gatsby',
    content: 'F. Scott Fitzgerald\'s "The Great Gatsby" is a novel that explores the corruption of the American Dream. The character of Jay Gatsby represents the pursuit of wealth and status as a means to achieve happiness.',
    createdAt: '2023-06-10T14:45:00Z',
    integrityScore: 85,
    status: 'complete'
  },
  {
    id: '3',
    title: 'History Essay: World War II',
    content: 'World War II was a global conflict that lasted from 1939 to 1945. It involved many of the world\'s nations, including all of the great powers, forming two opposing military alliances: the Allies and the Axis.',
    createdAt: '2023-06-05T09:15:00Z',
    integrityScore: 78,
    status: 'complete'
  },
  {
    id: '4',
    title: 'Psychology Report: Cognitive Development',
    content: 'Cognitive development is the study of how thinking processes change over time. Jean Piaget\'s theory of cognitive development suggests that children move through four different stages of mental development.',
    createdAt: '2023-05-28T16:20:00Z',
    integrityScore: 95,
    status: 'complete'
  },
  {
    id: '5',
    title: 'Draft: Final Project Outline',
    content: 'This document outlines the structure and key points for my final project on renewable energy sources. I will be focusing on solar, wind, and hydroelectric power.',
    createdAt: '2023-06-16T08:00:00Z',
    integrityScore: 0,
    status: 'analyzing'
  }
];

const Dashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<TextSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [averageScore, setAverageScore] = useState(0);
  
  useEffect(() => {
    const fetchSubmissions = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmissions(mockSubmissions);
      
      // Calculate average score
      const completedSubmissions = mockSubmissions.filter(sub => sub.status === 'complete');
      const totalScore = completedSubmissions.reduce((sum, sub) => sum + sub.integrityScore, 0);
      setAverageScore(Math.round(totalScore / completedSubmissions.length) || 0);
      
      setIsLoading(false);
    };
    
    fetchSubmissions();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your writing assignments and track your academic integrity progress.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/new">
            <Button variant="primary">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Assignment
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Stats Card 1: Overall Integrity Score */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-gray-900">Overall Integrity</h3>
            <TrendingUp className="h-5 w-5 text-success-500" />
          </div>
          
          <div className="flex justify-center">
            <IntegrityScore score={averageScore} />
          </div>
        </div>
        
        {/* Stats Card 2: Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <PlusCircle className="h-4 w-4 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">New submission created</p>
                <p className="text-xs text-gray-500">Draft: Final Project Outline</p>
                <p className="text-xs text-gray-400">Just now</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-success-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-4 w-4 text-success-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Analysis completed</p>
                <p className="text-xs text-gray-500">Research Paper on Climate Change</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Card 3: Submission Calendar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-gray-900">Submission Calendar</h3>
            <Calendar className="h-5 w-5 text-gray-500" />
          </div>
          
          <div className="flex flex-col items-center justify-center h-36">
            <p className="text-sm text-gray-500 text-center">
              You've submitted 5 assignments this month.
            </p>
            
            <div className="mt-4 grid grid-cols-7 gap-1">
              {[...Array(28)].map((_, i) => {
                // Randomly determine if a day has a submission
                const hasSubmission = [3, 7, 10, 15, 22].includes(i + 1);
                return (
                  <div
                    key={i}
                    className={`h-3 w-3 rounded-sm ${
                      hasSubmission ? 'bg-primary-500' : 'bg-gray-200'
                    }`}
                    title={hasSubmission ? 'Submission on this day' : 'No submissions'}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">Your Submissions</h2>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-5 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/4"></div>
            </div>
          ))}
        </div>
      ) : submissions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map((submission) => (
            <DashboardCard key={submission.id} submission={submission} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <PenLine className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No submissions yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new assignment.</p>
          <div className="mt-6">
            <Link to="/new">
              <Button variant="primary">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Assignment
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// For the CheckCircle icon used in the Recent Activity section
const CheckCircle: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
};

export default Dashboard;