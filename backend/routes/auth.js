// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');  // assuming file is models/User.js

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // 1. Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // 2. Check for duplicate
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // 3. Create user (password will be hashed automatically by pre-save hook)
    const newUser = new User({
      username,
      password,           // plain text here — hook will hash it
      role: role || 'agent'  // default role
    });

    // 4. Save → hashing happens automatically in User model
    await newUser.save();

    // Optional: Auto-login by generating token (common practice)
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error('Registration failed:', err.message);
    console.error(err.stack);
    res.status(500).json({ 
      message: 'Server error during registration', 
      error: err.message 
    });
  }
});

module.exports = router;