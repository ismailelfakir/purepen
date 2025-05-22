# PurePen - Academic Integrity Assistant

PurePen is a web application designed to help students maintain academic integrity by providing real-time, AI-powered feedback on their written assignments.

## Features

- User authentication (signup/login)
- AI-powered text analysis using OpenAI GPT-4
- Real-time feedback on:
  - Potential plagiarism
  - Citation needs
  - Paraphrasing suggestions
- Integrity score tracking
- Assignment history and management

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS
- Axios for API calls
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- OpenAI API for text analysis

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/purepen.git
cd purepen
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Set up environment variables:

Create a `.env` file in the server directory with:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development servers:

```bash
# Start backend server
cd server
npm run dev

# Start frontend development server
cd client
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.