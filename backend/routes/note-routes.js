const express = require('express');
const router = express.Router();
const Note = require('../models/note model');

// POST: Create a new note
// Logic: The ID comes from the URL (:enterpriseId)
router.post('/:enterpriseId', async (req, res) => {
    console.log("--> [1] Route hit for ID:", req.params.enterpriseId);

    try {
        const { issueType, description, resolved } = req.body;
        const enterpriseId = req.params.enterpriseId;
        const dummyAuthorId = '6982f8f8b0147aed51d38d54'; // Ensure this is a valid User ID

        console.log("--> [2] Creating new Note object...");
        const newNote = new Note({
            enterprise: enterpriseId,
            author: dummyAuthorId,
            issueType,
            description,
            resolved: resolved ?? false
        });

        console.log("--> [3] Saving to Database...");
        const savedNote = await newNote.save();
        
        console.log("--> [4] SUCCESS!");
        return res.status(201).json(savedNote);

    } catch (err) {
        console.log("--> [X] ERROR:", err.message);
        return res.status(400).json({ 
            message: 'Error creating note', 
            error: err.message 
        });
    }
}); // <--- This closes the router.post

module.exports = router;