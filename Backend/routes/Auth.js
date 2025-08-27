const express = require('express');
const router = express.Router();
const User = require('../models/Auth'); 
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// Make sure Clerk is properly initialized in your main server file
// Add this to your main server.js/app.js:
// const { clerkMiddleware } = require('@clerk/clerk-sdk-node');
// app.use(clerkMiddleware());

// Enhanced error handling middleware
const handleAsyncError = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error('❌ Auth async error caught:', error);
    
    if (!res.headersSent) {
      res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    }
  });
};

// POST /save - Save/update user information
router.post('/save', ClerkExpressRequireAuth(), handleAsyncError(async (req, res) => {


  try {
    const clerkUserId = req.auth?.userId;
    const { email, firstName, lastName } = req.body;

  

    // Validate Clerk user ID
    if (!clerkUserId) {
      console.error('❌ No clerkUserId found in req.auth');
      return res.status(401).json({ 
        message: 'Authentication failed - no user ID found',
        debug: { auth: req.auth }
      });
    }

    // Validate required fields
    if (!email || !firstName || !lastName) {
      const missing = [];
      if (!email) missing.push('email');
      if (!firstName) missing.push('firstName');
      if (!lastName) missing.push('lastName');
      
      console.error('❌ Missing required fields:', missing);
      return res.status(400).json({ 
        message: `Missing required user fields: ${missing.join(', ')}` 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('❌ Invalid email format:', email);
      return res.status(400).json({ 
        message: 'Invalid email format' 
      });
    }

    // Check if user already exists first
    let existingUser = await User.findOne({ clerkUserId });
    
    if (existingUser) {
    
      // Update existing user
      existingUser.email = email.toLowerCase().trim();
      existingUser.firstName = firstName.trim();
      existingUser.lastName = lastName.trim();
      existingUser.updatedAt = new Date();
      
      const updatedUser = await existingUser.save();
      
      return res.status(200).json({ 
        message: 'User updated successfully', 
        user: {
          _id: updatedUser._id,
          clerkUserId: updatedUser.clerkUserId,
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt
        }
      });
    }

    // Create new user
    const newUser = new User({
      clerkUserId,
      email: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim()
    });

    const savedUser = await newUser.save();


    res.status(201).json({ 
      message: 'User created successfully', 
      user: {
        _id: savedUser._id,
        clerkUserId: savedUser.clerkUserId,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt
      }
    });

  } catch (error) {
    console.error('❌ Error saving user:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        message: `${field} already exists`,
        error: 'Duplicate entry'
      });
    }

    // Generic error response
    res.status(500).json({
      message: 'Failed to save user',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}));

// GET /profile - Get current user profile
router.get('/profile', ClerkExpressRequireAuth(), handleAsyncError(async (req, res) => {
  const clerkUserId = req.auth?.userId;

  if (!clerkUserId) {
    return res.status(401).json({ 
      message: 'Authentication failed - no user ID found' 
    });
  }

  const user = await User.findOne({ clerkUserId });
  
  if (!user) {
    return res.status(404).json({ 
      message: 'User not found' 
    });
  }

  res.status(200).json({
    user: {
      _id: user._id,
      clerkUserId: user.clerkUserId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  });
}));

// PUT /update - Update user information
router.put('/update', ClerkExpressRequireAuth(), handleAsyncError(async (req, res) => {
  const clerkUserId = req.auth?.userId;
  const { email, firstName, lastName } = req.body;

  if (!clerkUserId) {
    return res.status(401).json({ 
      message: 'Authentication failed - no user ID found' 
    });
  }

  const updateData = {};
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    updateData.email = email.toLowerCase().trim();
  }
  if (firstName) updateData.firstName = firstName.trim();
  if (lastName) updateData.lastName = lastName.trim();
  updateData.updatedAt = new Date();

  const user = await User.findOneAndUpdate(
    { clerkUserId },
    updateData,
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({
    message: 'User updated successfully',
    user: {
      _id: user._id,
      clerkUserId: user.clerkUserId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  });
}));

// DELETE /delete - Delete user account
router.delete('/delete', ClerkExpressRequireAuth(), handleAsyncError(async (req, res) => {
  const clerkUserId = req.auth?.userId;

  if (!clerkUserId) {
    return res.status(401).json({ 
      message: 'Authentication failed - no user ID found' 
    });
  }

  const user = await User.findOneAndDelete({ clerkUserId });
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ message: 'User deleted successfully' });
}));

module.exports = router;