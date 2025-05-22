import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Calendar, TrendingUp, CheckCircle } from 'lucide-react';
import axios from 'axios';
import DashboardCard from '../components/DashboardCard';
import Button from '../components/Button';
import IntegrityScore from '../components/IntegrityScore';
import { TextSubmission } from '../types';

const Dashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<TextSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [averageScore, setAverageScore] = useState(0);
  
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('/assignments');
        
        // Transform the response data to match TextSubmission type
        const transformedSubmissions = response.data.map((sub: any) => ({
          id: sub._id,
          title: sub.title,
          content: sub.content,
          createdAt: sub.createdAt,
          integrityScore: sub.integrityScore || 0,
          status: sub.status || 'complete'
        }));
        
        setSubmissions(transformedSubmissions);
        
        // Calculate average score
        const completedSubmissions = transformedSubmissions.filter(sub => sub.status === 'complete');
        const totalScore = completedSubmissions.reduce((sum, sub) => sum + sub.integrityScore, 0);
        setAverageScore(Math.round(totalScore / completedSubmissions.length) || 0);
      } catch (err: any) {
        console.error('Error fetching submissions:', err);
        setError(err.response?.data?.msg || 'Failed to fetch submissions');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSubmissions();
  }, []);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-error-50 border border-error-200 text-error-700 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

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
            {submissions.slice(0, 2).map((submission) => (
              <div key={submission.id} className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Analysis completed</p>
                  <p className="text-xs text-gray-500">{submission.title}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
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
              You've submitted {submissions.length} assignments.
            </p>
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
          <PlusCircle className="mx-auto h-12 w-12 text-gray-400" />
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

export default Dashboard;