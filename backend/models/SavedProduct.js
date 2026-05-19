// Define the Mongoose models for the SavedProduct collection in MongoDB. 
// This model will be used to create, read, update, and delete saved product data in the database. 
// The SavedProduct model includes fields for userId (reference to User), 
// productId (ID from DummyJSON), title, price, thumbnail, and savedAt timestamp.
const mongoose = require('mongoose');

const SavedProductSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: Number, required: true }, // ID from DummyJSON
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SavedProduct', SavedProductSchema);