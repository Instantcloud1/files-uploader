// app.js (formerly api/index.js)
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Adjusted relative paths
const connectDB = require('./config/db');
const fileRoutes = require('./routes/file.routes');

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();
console.log('Vercel Express app (app.js) starting initialization...');

// Middleware
app.use(cors());
app.use(express.json());
console.log('Vercel Express app initialized via app.js');
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' folder
// path.join(__dirname, 'public') is now correct since app.js is at root
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// All API routes will be prefixed with /api/files
app.use('/api/files', fileRoutes);

// Serve index.html at root for local development and Vercel.
// This handles requests to the root URL (e.g., your-app.vercel.app/)
app.get('/', (req, res) => {
    // path.join(__dirname, 'public', 'index.html') is now correct
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// IMPORTANT: Add a specific log for Vercel deployment initialization
console.log('Vercel Express app initialized via app.js');

// Export the app for Vercel Serverless Function
// Vercel will wrap this Express app as a serverless function
module.exports = app;

// Only start the server if not running in a serverless environment (e.g., Vercel)
// Vercel handles listening on the port automatically.
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`✅ Server running locally on http://localhost:${port}`);
        console.log(`Open http://localhost:${port} in your browser.`);
    });
}