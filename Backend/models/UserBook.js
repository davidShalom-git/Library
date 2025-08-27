const mongoose = require('mongoose');

const UserBookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    enum: ['Technologies', 'Business', 'Entertainment', 'Science', 'Politics'],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('UserBook', UserBookSchema);