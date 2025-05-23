# PurePen - Academic Integrity Assistant

PurePen is a modern web application designed to help students maintain academic integrity by providing real-time, AI-powered feedback on their written assignments. Built with React, TypeScript, and Node.js, it offers a comprehensive solution for checking plagiarism, suggesting citations, and improving writing quality.

## 🌟 Features

- **Real-time Analysis**
  - Plagiarism detection
  - Citation suggestions
  - Paraphrasing recommendations
  - Academic integrity scoring

- **User Experience**
  - Dark/Light theme support
  - Responsive design
  - Real-time feedback
  - Progress tracking

- **Security**
  - JWT authentication
  - Secure password handling
  - Data privacy controls

## 🏗 Project Structure

```
purepen/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── layouts/      # Page layouts
│   │   ├── pages/        # Page components
│   │   └── types/        # TypeScript type definitions
│   ├── Dockerfile        # Client Docker configuration
│   └── package.json      # Frontend dependencies
│
├── server/                # Backend Node.js application
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── Dockerfile       # Server Docker configuration
│   └── package.json     # Backend dependencies
│
└── docker-compose.yml    # Docker services configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or later
- MongoDB
- Docker and Docker Compose (optional)

### Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/purepen.git
cd purepen
```

2. Install dependencies:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Environment Configuration:

Create `.env` files in both client and server directories:

```bash
# server/.env
MONGODB_URI=mongodb://localhost:27017/purepen
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
GOOGLE_API_KEY=your_google_api_key
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id

# client/.env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development servers:

```bash
# Start the backend server
cd server
npm run dev

# Start the frontend development server
cd client
npm run dev
```

### Docker Setup

1. Build and run with Docker Compose:

```bash
docker-compose up --build
```

This will start:
- Frontend on http://localhost:5173
- Backend on http://localhost:5000
- MongoDB on port 27017

## 🛠 Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- Axios for API requests
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- OpenAI API for text analysis
- Google Custom Search API for reference checking

### Development & Deployment
- Docker & Docker Compose
- ESLint for code quality
- TypeScript for type safety

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Environment variable security
- Input validation
- XSS protection

## 🎨 Theme Support

PurePen includes a comprehensive theming system with:
- Light and dark mode support
- System preference detection
- Theme persistence
- Smooth transitions

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- Different screen sizes and orientations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT API
- Google Custom Search API
- React and TypeScript communities
- All contributors and supporters