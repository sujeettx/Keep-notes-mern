const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxLength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  tags: {
    type: [String],
    default: []
  },
  attachments: [
    {
      url: {
        type: String,
        required: true
      },
      filename: {
        type: String,
        required: true
      },
      format: {
        type: String,
        required: true
      }
    }
  ],
  shareId: {
    type: String,
    unique: true,
    sparse: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add index for searching
noteSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Note', noteSchema);