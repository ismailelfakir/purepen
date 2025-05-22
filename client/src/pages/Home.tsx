import React from 'react';
import { Link } from 'react-router-dom';
import { PenLine, Shield, BookOpen, Award } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Button from '../components/Button';

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Write with Confidence and Integrity
              </h1>
              <div className="h-20">
                <TypeAnimation
                  sequence={[
                    'Check your work for plagiarism.',
                    2000,
                    'Get citation suggestions.',
                    2000,
                    'Improve your paraphrasing.',
                    2000,
                    'Build academic integrity habits.',
                    2000,
                  ]}
                  wrapper="p"
                  speed={50}
                  repeat={Infinity}
                  className="text-xl md:text-2xl mb-6"
                />
              </div>
              <p className="text-lg opacity-90 mb-8">
                PurePen helps students maintain academic integrity by providing real-time feedback on their written assignments.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/signup">
                  <Button variant="secondary" size="lg">
                    Get Started - It's Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Log in
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-primary-900 opacity-20 rounded-lg transform rotate-3"></div>
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg transform -rotate-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-error-500 rounded-full mr-2"></div>
                      <div className="h-3 w-3 bg-warning-500 rounded-full mr-2"></div>
                      <div className="h-3 w-3 bg-success-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-400">PurePen Analysis</div>
                  </div>
                  <div className="mb-4 text-sm bg-gray-100 p-3 rounded">
                    <span className="text-black">According to Smith (2021), the impact of climate change has been significant in recent years.</span>
                  </div>
                  <div className="mb-4 text-sm bg-error-100 p-3 rounded">
                    <span className="text-error-800">The effects of global warming have been felt across all continents and are affecting ecosystems worldwide.</span>
                    <div className="mt-1 text-xs text-error-600">Possible plagiarism - needs citation</div>
                  </div>
                  <div className="text-sm bg-success-100 p-3 rounded">
                    <span className="text-success-800">Research by Johnson et al. (2022) indicates that immediate action is needed to mitigate these effects.</span>
                    <div className="mt-1 text-xs text-success-600">Great job with proper citation!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">How PurePen Helps</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Our AI-powered tool provides real-time feedback to help you maintain academic integrity and improve your writing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Plagiarism Prevention</h3>
              <p className="text-gray-600">
                Get real-time feedback on potential plagiarism issues and learn how to properly cite sources.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <PenLine className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Paraphrasing Suggestions</h3>
              <p className="text-gray-600">
                Learn how to effectively restate information in your own words while maintaining the original meaning.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Citation Assistance</h3>
              <p className="text-gray-600">
                Get suggestions for proper citation formats and learn when and how to attribute sources correctly.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-success-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Integrity Score</h3>
              <p className="text-gray-600">
                Track your progress with an integrity score that improves as you apply good academic writing practices.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-warning-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-warning-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Educational Feedback</h3>
              <p className="text-gray-600">
                Receive constructive feedback that helps you understand academic integrity principles, not just identify issues.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Submission History</h3>
              <p className="text-gray-600">
                Access your previous submissions and track your improvement over time with a comprehensive history view.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">Ready to write with confidence?</h2>
          <p className="text-lg text-primary-100 mb-8">
            Join thousands of students who use PurePen to improve their academic writing and maintain integrity.
          </p>
          <Link to="/signup">
            <Button variant="secondary" size="lg" className="mx-auto">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;