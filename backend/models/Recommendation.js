// Define the Mongoose models for the Recommendation collection in MongoDB. 
// This model will be used to create, read, update, and delete recommendation data in the database. 
// The Recommendation model includes fields for baseProductId 
// (the product ID they are currently viewing), 
// recommendedProductIds (array of suggested product IDs), 
// category (to recommend items from the same category), and updatedAt timestamp.
const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
    baseProductId: { type: Number, required: true }, // The product ID they are currently viewing
    recommendedProductIds: [{ type: Number }], // Array of suggested product IDs
    category: { type: String }, // To recommend items from the same category
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);