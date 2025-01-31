// Import dependencies
import express from 'express'; // or 'const express = require('express');' for CommonJS
import cors from 'cors';  // Import the CORS middleware
import authRoutes from './routes/auth.route.js';  // Example route import
import movieRoutes from './routes/movie.route.js'; // Example route import
import tvRoutes from './routes/tv.route.js'; // Example route import
import searchRoutes from './routes/search.route.js'; // Example route import
import cookieParser from 'cookie-parser';  // Cookie parsing if needed
import { connectDB } from './config/db.js'; // Database connection (if applicable)

const app = express();

// // CORS Configuration
// const corsOptions = {
//   origin: [
//     'https://netflix-front-chi.vercel.app/',  // Vercel frontend URL
//     'http://localhost:5173',  // Local development URL
//   ],
//   methods: 'GET,POST,PUT,DELETE',  // Allow these HTTP methods
//   credentials: true,  // Allow cookies if needed
// };

// // Apply the CORS middleware globally
app.use(cors());

// Body parser middleware to parse JSON requests
app.use(express.json());  // To parse JSON request body
app.use(cookieParser());  // To parse cookies

// Your routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', movieRoutes);
app.use('/api/v1/tv', tvRoutes);
app.use('/api/v1/search', searchRoutes);

// Start the server and connect to DB
const PORT = process.env.PORT || 8000; // Or use your configured ENV variable
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectDB();  // Ensure DB connection
});
