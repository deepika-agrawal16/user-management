A full-stack User Management System built as part of a Backend Developer Intern assessment.
The application provides secure user authentication, role-based access control, and basic user lifecycle management with a clean and responsive UI.


1) Project Overview:-

The Mini User Management System allows users to:
  Sign up and log in securely
  View and update their profile information
  Change their password
  Access features based on their role (User or Admin)

Admins can:
  View all registered users with pagination
  Activate or deactivate user accounts

The project demonstrates practical implementation of authentication flows, JWT-based authorization, RBAC, secure password handling, clean API design, and frontend–backend integration.

2) Tech Stack:-

Backend
  Node.js +  Express.js
  MongoDB (Local for testing & MongoDB Atlas for deployment)
  Mongoose
  JWT (jsonwebtoken) – authentication
  bcrypt – password hashing
  express-validator – input validation
  
Frontend
  React (Vite)
  React Router DOM 
  Axios
  Pure CSS (custom styling, no UI libraries)

Deployment
  Backend: Render
  Frontend: Vercel
  Database: MongoDB Atlas

3) Setup Instructions:-

  1) Clone the repository
     git clone https://github.com/your-username/mini-user-management.git
     cd mini-user-management
  2) Backend Setup
     cd backend
     npm install
     Create a .env file inside backend/ (see Environment Variables section).
     Run backend:
     npm run dev
  3) Frontend Setup
     cd ../frontend
     npm install
     npm run dev

4) Environment Variables:-

Create a .env file in the backend folder with the following variables.
 PORT=5000
 MONGO_URI=your_mongodb_connection_string
 JWT_SECRET=your_jwt_secret_key
 JWT_EXPIRES_IN=1d

5) Deployment Instructions:-
   Backend Deployment (Render) -
     1) Push backend code to GitHub
     2) Create a new Web Service on Render
     3) Set build command: npm install
     4) Set start command: npm start
     5) Add environment variables in Render dashboard
     6) Deploy service
   Frontend Deployment (Vercel)  
     1) Push frontend code to GitHub
     2) Import project into Netlify
     3) Set framework as Vite + React
     4) Update API base URL to deployed backend
     5) Deploy
