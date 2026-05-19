// Define the Mongoose models for the Feedback collection in MongoDB. 
// This model will be used to create, read, update, and delete feedback data in the database. 
// The Feedback model includes fields for name, email, rating, suggestions, and submittedAt timestamp.
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    suggestions: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);