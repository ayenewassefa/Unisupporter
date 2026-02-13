const express = require('express');
const router = express.Router();
const Enterprise = require('../models/Enterprise-model');

// 1. POST: Create a new enterprise
router.post('/add', async (req, res) => {
    try {
        const newEnterprise = new Enterprise(req.body);
        const savedEnterprise = await newEnterprise.save();
        res.status(201).json(savedEnterprise);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create enterprise', error: err.message });
    }
}); // <--- CLOSE THE POST ROUTE HERE

// 2. GET: Search for an enterprise
router.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.name;
        const results = await Enterprise.find({ 
            name: { $regex: searchTerm, $options: 'i' } 
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: 'Search failed', error: err.message });
    }
}); // <--- CLOSE THE GET ROUTE HERE

module.exports = router; // <--- EXPORT OUTSIDE ALL ROUTES