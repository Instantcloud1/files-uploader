// api/index.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors'); // Add CORS
const connectDB = require('../config/db'); // Correct relative path

dotenv.config(); // Load environment variables from .env
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' folder
// For Vercel, static files are typically served from the 'public' directory at the root.
// When running locally, if 'public' is inside 'my-express-project' and 'index.js' is in 'api',
// the path needs to be adjusted.
// For Vercel deployment, the 'public' folder should be at the root of your project
// alongside 'api' and 'routes', etc.
// For local testing with this structure, it's relative to the `api` directory's parent.
app.use(express.static(path.join(__dirname, '..', 'public')));


// Routes
const fileRoutes = require('../routes/file.routes'); // Correct relative path
app.use('/api/files', fileRoutes);

// Serve index.html at root for local development and Vercel
// When running `vercel dev`, this will serve `public/index.html`
// When deployed on Vercel, it typically serves static assets directly.
// This route is primarily for local testing or when Vercel isn't handling static directly.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


// Export the app for Vercel Serverless Function (essential for 'api' directory)
module.exports = app;

// Only start the server if not running in a serverless environment (e.g., Vercel)
// Vercel will handle listening on the port
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
    console.log(`Open http://localhost:${port} in your browser.`);
  });
}