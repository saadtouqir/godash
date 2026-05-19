const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation');

// Get recommendations for a product
router.get('/:productId', async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        const recommendations = await Recommendation.findOne({ baseProductId: productId });
        
        if (!recommendations) {
            return res.json({ message: "No specific recommendations found for this product.", recommendedProductIds: [] });
        }
        
        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add or update recommendations (for admin/analytics use)
router.post('/update', async (req, res) => {
    try {
        const { baseProductId, recommendedProductIds, category } = req.body;
        
        let rec = await Recommendation.findOneAndUpdate(
            { baseProductId },
            { recommendedProductIds, category, updatedAt: Date.now() },
            { upsert: true, new: true }
        );
        
        res.json({ message: 'Recommendations updated', data: rec });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;