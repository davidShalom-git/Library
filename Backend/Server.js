require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

const User = require('./routes/Auth');
const UserBooks = require('./routes/UserBooks');

app.use(cors({
  origin: ['http://localhost:2200', 'http://localhost:3000', 'https://your-frontend-domain.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(ClerkExpressWithAuth());

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      clerkConfigured: !!process.env.CLERK_SECRET_KEY,
      mongoConfigured: !!process.env.MONGODB_URI,
      cloudinaryConfigured: !!process.env.CLOUDINARY_CLOUD_NAME
    }
  });
});

// Add this simple test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

mongoose.connect(process.env.MONGODB_URI,).then(() => console.log('✅ Connected to MongoDB')).catch((err) => {
  console.error('❌ MongoDB connection error:', err);

});

app.use('/api/user', User);
app.use('/api/books', UserBooks);

const PORT = process.env.PORT || 3200;

// Only start the server if not in serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`🌍 Health check: http://localhost:${PORT}/health`);
  });
}

// Export the app for Vercel
module.exports = app;