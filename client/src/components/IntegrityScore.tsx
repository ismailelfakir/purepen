import React from 'react';

interface IntegrityScoreProps {
  score: number; // 0 to 100
}

const IntegrityScore: React.FC<IntegrityScoreProps> = ({ score }) => {
  let textColor = 'text-gray-700 dark:text-gray-300';
  let ringColor = 'ring-gray-200 dark:ring-gray-700';
  let scoreColor = 'text-gray-700 dark:text-gray-300';
  
  if (score >= 90) {
    textColor = 'text-success-500 dark:text-success-400';
    ringColor = 'ring-success-500 dark:ring-success-400';
    scoreColor = 'text-success-500 dark:text-success-400';
  } else if (score >= 70) {
    textColor = 'text-green-500 dark:text-green-400';
    ringColor = 'ring-green-500 dark:ring-green-400';
    scoreColor = 'text-green-500 dark:text-green-400';
  } else if (score >= 50) {
    textColor = 'text-yellow-500 dark:text-yellow-400';
    ringColor = 'ring-yellow-500 dark:ring-yellow-400';
    scoreColor = 'text-yellow-500 dark:text-yellow-400';
  } else {
    textColor = 'text-error-500 dark:text-error-400';
    ringColor = 'ring-error-500 dark:ring-error-400';
    scoreColor = 'text-error-500 dark:text-error-400';
  }

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-32 w-32">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 dark:text-gray-700"
            strokeWidth="6"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className={`${ringColor} transition-all duration-1000 ease-out`}
            strokeWidth="6"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-bold ${scoreColor}`}>{score}</span>
        </div>
      </div>
      <span className={`mt-2 text-lg font-medium ${textColor}`}>
        {score >= 90 ? 'Excellent' : 
         score >= 70 ? 'Good' : 
         score >= 50 ? 'Fair' : 
         'Needs Work'}
      </span>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Integrity Score</p>
    </div>
  );
};

export default IntegrityScore;