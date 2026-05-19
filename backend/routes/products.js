// Define the Express routes for handling product-related API endpoints. 
// This includes routes for saving a product to a user's list and retrieving all saved products for a user. 
// The routes interact with the SavedProduct model to perform database operations 
// and return appropriate responses to the client.
const express = require('express');
const router = express.Router();
const SavedProduct = require('../models/SavedProduct');

// Save a product to user's list
router.post('/save', async (req, res) => {
    try {
        const { userId, productId, title, price, thumbnail } = req.body;
        const savedProduct = new SavedProduct({ userId, productId, title, price, thumbnail });
        await savedProduct.save();
        res.status(201).json({ message: 'Product saved successfully', savedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all saved products for a user
router.get('/:userId', async (req, res) => {
    try {
        const products = await SavedProduct.find({ userId: req.params.userId });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;