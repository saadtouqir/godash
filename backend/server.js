// This is the main server file for the GoDash backend application. 
// It sets up the Express server, connects to MongoDB Atlas using Mongoose, 
// and defines the API routes for users, products, and feedback. 
// The server listens on a specified port and provides a basic route 
// to confirm that the API is running.
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow all origins for development
app.use(express.json());

// Routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const feedbackRoutes = require('./routes/feedback');
const recommendationRoutes = require('./routes/recommendations');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Diagnostic Test Route
app.get('/api/test', (req, res) => {
    res.json({ message: "Backend is reachable and CORS is working!" });
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('GoDash Backend API is running...');
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});