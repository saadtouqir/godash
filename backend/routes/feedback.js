// Define the Express routes for handling feedback-related API endpoints. 
// This includes routes for submitting feedback and retrieving all feedback entries. 
// The routes interact with the Feedback model to perform database operations 
// and return appropriate responses to the client.
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Submit feedback
router.post('/', async (req, res) => {
    try {
        const { name, email, rating, suggestions } = req.body;
        const newFeedback = new Feedback({ name, email, rating, suggestions });
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all feedback
router.get('/', async (req, res) => {
    try {
        const feedback = await Feedback.find();
        res.json(feedback);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;