# PurePen - Academic Integrity Assistant

PurePen is a web application designed to help students maintain academic integrity by providing real-time, AI-powered feedback on their written assignments. The app highlights potential plagiarism, suggests proper citation and paraphrasing techniques, and delivers positive, educational nudges to encourage ethical writing habits.

## Features

- User authentication (signup/login) for secure access
- Upload or paste text assignments for AI analysis
- AI-powered feedback with:
  - Plagiarism checks (basic similarity detection)
  - Citation and paraphrasing suggestions
  - Positive reinforcement and "Integrity Score"
- Clear display of AI feedback with highlighted text areas
- Privacy-first approach with data clearance and download options
- Responsive UI using Tailwind CSS

## Frontend Implementation (Current)

The current implementation focuses on the frontend client-side of PurePen. Key features include:

1. **User Authentication Flow**
   - Signup and login pages with form validation
   - Protected routes for authenticated users

2. **Dashboard Interface**
   - Overview of submission history
   - Integrity score tracking
   - Quick access to create new assignments

3. **Text Submission**
   - Rich text editor for inputting assignments
   - File upload capability
   - Submission processing

4. **Feedback Display**
   - Text highlighting for different types of feedback
   - Detailed suggestions for improvement
   - Interactive UI for reviewing feedback
   - Integrity score visualization

5. **User Profile**
   - Personal information management
   - Privacy and data controls
   - Password and security settings

## Tech Stack

- **Frontend:** React with TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **State Management:** React Context API and local state
- **Animation:** React Type Animation for dynamic text elements

## Next Steps: Backend Implementation

The backend implementation will include:

1. **Node.js + Express.js API Server**
   - RESTful API endpoints for all frontend features
   - Authentication middleware

2. **Database Integration**
   - User management
   - Submission storage and retrieval
   - Feedback data persistence

3. **AI Integration**
   - Connection to OpenAI GPT API for text analysis
   - Plagiarism detection algorithms
   - Citation and paraphrasing recommendations

4. **Security Features**
   - JWT-based authentication
   - Data encryption
   - Rate limiting and other protections

5. **Containerization**
   - Docker setup for consistent deployment
   - Docker Compose for service orchestration