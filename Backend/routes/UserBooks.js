const express = require('express');
const router = express.Router();
const UserBook = require('../models/UserBook');
const User = require('../models/Auth');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const upload = require('multer')({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {


    if (file.fieldname === 'pdf' && file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    if (file.fieldname === 'coverImage' && !file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});
const cloudinary = require('../config/config');

// Enhanced error handling middleware
const handleAsyncError = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error('❌ Async error caught:', error);

    // Ensure we always send JSON responses
    if (!res.headersSent) {
      res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    }
  });
};

// POST /post
router.post(
  '/post',
  ClerkExpressRequireAuth(),
  (req, res, next) => {


    upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }])(req, res, (err) => {
      if (err) {
        console.error('❌ Multer error:', err.message);
        return res.status(400).json({
          message: 'File upload error',
          error: err.message
        });
      }
      next();
    });
  },
  handleAsyncError(async (req, res) => {

    const clerkUserId = req.auth?.userId;
    const { title, content } = req.body;


    // Validate Clerk user ID
    if (!clerkUserId) {
      return res.status(401).json({
        message: 'Authentication failed - no user ID found'
      });
    }

    // Find user in database
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      console.error(`❌ User not found for clerkUserId: ${clerkUserId}`);
      return res.status(404).json({
        message: 'User not found. Please refresh and try again.'
      });
    }



    // Validate required fields
    if (!title || !content || !req.files?.pdf || !req.files?.coverImage) {
      const missing = [];
      if (!title) missing.push('title');
      if (!content) missing.push('content');
      if (!req.files?.pdf) missing.push('PDF file');
      if (!req.files?.coverImage) missing.push('cover image');

      return res.status(400).json({
        message: `Missing required fields: ${missing.join(', ')}.`
      });
    }



    // Upload PDF to Cloudinary
    const pdfUpload = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'library_pdfs',
          public_id: `pdf_${Date.now()}_${title.replace(/[^a-zA-Z0-9]/g, '_')}`
        },
        (error, result) => {
          if (error) {
            console.error('❌ PDF upload error:', error);
            reject(error);
          } else {

            resolve(result);
          }
        }
      );
      uploadStream.end(req.files.pdf[0].buffer);
    });

    // Upload cover image to Cloudinary
    const imageUpload = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'library_covers',
          public_id: `cover_${Date.now()}_${title.replace(/[^a-zA-Z0-9]/g, '_')}`
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cover image upload error:', error);
            reject(error);
          } else {

            resolve(result);
          }
        }
      );
      uploadStream.end(req.files.coverImage[0].buffer);
    });

    // Create new book record
    const post = new UserBook({
      title: title.trim(),
      content,
      pdf: pdfUpload.secure_url,
      coverImage: imageUpload.secure_url,
      author: user._id,
    });

    const savedPost = await post.save();


    res.status(201).json({
      message: 'Book uploaded successfully',
      post: {
        _id: savedPost._id,
        title: savedPost.title,
        content: savedPost.content,
        pdf: savedPost.pdf,
        coverImage: savedPost.coverImage,
        createdAt: savedPost.createdAt
      }
    });
  })
);

// GET /my-post
router.get('/my-post', ClerkExpressRequireAuth(), handleAsyncError(async (req, res) => {
  const clerkUserId = req.auth.userId;

  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const posts = await UserBook.find({ author: user._id })
    .populate('author', 'firstName lastName email')
    .sort({ createdAt: -1 });

  res.status(200).json(posts);
}));

// GET /all
router.get('/all', handleAsyncError(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const posts = await UserBook.find()
    .populate('author', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.status(200).json(posts);
}));

// GET /post/:id
router.get('/post/:id', handleAsyncError(async (req, res) => {
  const { id } = req.params;

  const post = await UserBook.findById(id)
    .populate('author', 'firstName lastName email');

  if (!post) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.status(200).json(post);
}));

// DELETE /delete/:id
router.delete('/delete/:id', ClerkExpressRequireAuth(), handleAsyncError(async (req, res) => {
  const { id } = req.params;
  const clerkUserId = req.auth.userId;

  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const post = await UserBook.findOne({ _id: id, author: user._id });
  if (!post) {
    return res.status(404).json({ message: 'Book not found or unauthorized' });
  }

  // Extract public IDs from URLs for Cloudinary deletion
  const extractPublicId = (url, resourceType) => {
    try {
      const urlParts = url.split('/');
      const filename = urlParts[urlParts.length - 1];
      const publicId = filename.split('.')[0];
      return urlParts[urlParts.length - 2] + '/' + publicId; // Include folder
    } catch (error) {
      console.error(`Failed to extract public ID from ${url}:`, error);
      return null;
    }
  };

  // Delete files from Cloudinary
  try {
    if (post.pdf) {
      const pdfPublicId = extractPublicId(post.pdf, 'raw');
      if (pdfPublicId) {
        await cloudinary.uploader.destroy(pdfPublicId, { resource_type: 'raw' });

      }
    }

    if (post.coverImage) {
      const imagePublicId = extractPublicId(post.coverImage, 'image');
      if (imagePublicId) {
        await cloudinary.uploader.destroy(imagePublicId, { resource_type: 'image' });

      }
    }
  } catch (cloudinaryError) {
    console.error('❌ Error deleting files from Cloudinary:', cloudinaryError);
    // Continue with database deletion even if Cloudinary deletion fails
  }

  await UserBook.deleteOne({ _id: id });


  res.json({ message: 'Book deleted successfully' });
}));

module.exports = router;