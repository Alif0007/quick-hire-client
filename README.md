# QuickHire - Full Stack Job Board Application

QuickHire is a comprehensive job board application that connects job seekers with employers. This full-stack application features a React frontend with an intuitive interface for browsing jobs, applying to positions, and an admin dashboard for managing job postings, along with a robust Node.js/Express backend for data management.

## Features

- **Job Browsing**: Browse featured and latest jobs with search and filter capabilities
- **Job Details**: View detailed information about job postings
- **Application System**: Submit job applications with resume and cover letter
- **Admin Dashboard**: Manage job postings and applications
- **Responsive Design**: Works seamlessly across devices
- **Modern UI**: Clean and intuitive user interface with attractive animations
- **RESTful API**: Well-structured backend API for all application features
- **Database Integration**: Robust MongoDB integration for storing jobs and applications

## Tech Stack

### Frontend:
- React 18
- Vite (build tool)
- Tailwind CSS (styling)
- React Router DOM (navigation)
- Axios (API communication)
- Framer Motion (animations)
- Lucide React (icons)

### Backend:
- Node.js
- Express.js
- MongoDB (with native driver)
- CORS
- Dotenv (environment configuration)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (either local installation or MongoDB Atlas account)

## Installation & Setup

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd c:\Web PH\Quick Hire
   ```

2. **Install dependencies for both frontend and backend**:

   For the frontend:
   ```bash
   cd frontend
   npm install
   ```

   For the backend:
   ```bash
   cd ../backend
   npm install
   ```

3. **Environment Variables**:

   For the frontend, create a `.env` file in the frontend root directory with the following variable:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
   
   For the backend, create a `.env` file in the backend root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/quickhire
   ```
   
   Or if using MongoDB Atlas:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/quickhire?retryWrites=true&w=majority
   ```
   
   Note: Adjust the MongoDB URI to match your setup.

4. **Run both servers**:

   Start the backend server first:
   ```bash
   cd backend
   npm run dev
   ```

   In a new terminal, start the frontend server:
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open your browser** and visit the frontend URL shown in the terminal (typically `http://localhost:5176`)

## Available Scripts

### Frontend:
- `npm run dev` - Start the development server with hot reloading
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

### Backend:
- `npm run dev` - Start the development server with hot reloading (using nodemon)
- `npm start` - Start the production server

## Project Structure

```
QuickHire/
├── backend/
│   ├── config/
│   │   └── db.js           # Database configuration
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env                # Environment variables
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
│   ├── assets/             # Static assets (images, icons)
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## API Endpoints

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get a specific job
- `POST /api/jobs` - Create a new job (admin only)
- `DELETE /api/jobs/:id` - Delete a job (admin only)

### Applications
- `GET /api/applications` - Get all applications (admin only)
- `POST /api/applications` - Submit a new application
- `DELETE /api/applications/:id` - Delete an application (admin only)

### Health Checks
- `GET /api/health` - Health check endpoint
- `GET /api/test-connection` - Database connection test

## Key Components

- **Header & Footer**: Consistent navigation across all pages
- **Job Cards**: Display job information in a clean, organized manner
- **Application Modal**: Interactive form for job applications
- **Admin Dashboard**: Comprehensive admin interface with job management
- **Animated Alerts**: Smooth animations for user feedback

## API Integration

The frontend communicates with the backend API for:
- Fetching job listings
- Submitting job applications
- Managing job postings (admin features)
- Authentication (admin features)

## Database Schema

### Jobs Collection
```javascript
{
  _id: ObjectId,
  title: String,
  company: String,
  location: String,
  salary: String,
  type: String,
  description: String,
  requirements: [String],
  benefits: [String],
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Applications Collection
```javascript
{
  _id: ObjectId,
  jobId: String,
  applicantName: String,
  email: String,
  resume: String,
  coverLetter: String,
  status: String, // pending, approved, rejected
  appliedAt: Date
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License.