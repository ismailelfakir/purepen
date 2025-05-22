export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface TextSubmission {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  integrityScore: number;
  status: 'analyzing' | 'complete' | 'error';
}

export interface FeedbackItem {
  id: string;
  type: 'plagiarism' | 'citation' | 'paraphrase' | 'positive';
  startIndex: number;
  endIndex: number;
  message: string;
  suggestion?: string;
  severity?: 'low' | 'medium' | 'high';
}

export interface TextFeedback {
  submissionId: string;
  integrityScore: number;
  feedbackItems: FeedbackItem[];
  summary: string;
}