# PDF Summarizer and Chat App

## 📚 Project Overview
This project allows users to upload PDFs, store them on Cloudinary, and receive AI-generated summaries using Google's Gemini API. Additionally, users can have an AI-powered chat to discuss the content of the uploaded PDFs. The app supports multiple PDFs and multiple conversations for each PDF.

## 🛠️ Tech Stack
### Backend:
- Node.js (Express.js)
- pg (Database Management)
- PostgreSQL
- Cloudinary for PDF storage
- Google's Gemini AI API for summarization
- JWT for authentication

### Frontend:
- React.js
- Vite
- Express

## 🌱 Environment Setup

### Backend `.env` file (Located in the `server` folder):
```env
PORT=3001
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=...
DB_NAME=pdfApplication
DB_PORT=5432
JWT_SECRET=...
GEMINI_API_KEY=...
```

### Frontend `.env` file (Located in the `client` folder):
```env
VITE_API_URL=http://localhost:3001/api
```

## 🚀 Features
- Upload PDF files
- Store PDFs securely on Cloudinary
- Generate AI-powered summaries using Gemini API
- Engage in continuous chat with AI about the uploaded PDFs
- Support for multiple PDFs and multiple chat sessions

## 🛠️ How to Run the Project

### 1. Clone the Repository
```bash
https://github.com/lakpareek/pdf-summarise-and-chat.git
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Run the Backend Server
```bash
node index.js
```

### 4. Install Frontend Dependencies
```bash
cd ../client
npm install
```

### 5. Run the Frontend Application
```bash
npm run dev
```


## 🌐 Live Demo
Coming soon...

## ✅ Future Enhancements
- OAuth integration
- Improved PDF parsing and keyword extraction
- Real-time collaborative chat

## 🤝 Contributing
Feel free to submit issues and pull requests!

