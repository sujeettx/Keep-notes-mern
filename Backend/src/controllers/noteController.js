const Note = require('../models/Note');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const { cloudinary } = require('../config/cloudinary');

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
exports.createNote = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, tags } = req.body;
    
    // Handle file uploads
    let attachments = [];
    if (req.files && req.files.length > 0) {
      attachments = req.files.map(file => ({
        url: file.path,
        filename: file.filename,
        format: file.mimetype
      }));
    }

    const newNote = new Note({
      title,
      content,
      tags: tags ? JSON.parse(tags) : [],
      attachments,
      user: req.user.id
    });

    const note = await newNote.save();

    res.status(201).json({
      success: true,
      data: note
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get all notes for a user
// @route   GET /api/notes
// @access  Private
exports.getNotes = async (req, res) => {
  try {
    const { search, tag } = req.query;
    let query = { user: req.user.id };
    
    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by tag
    if (tag) {
      query.tags = tag;
    }
    
    const notes = await Note.find(query).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get a specific note
// @route   GET /api/notes/:id
// @access  Private
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    // Make sure user owns the note
    if (note.user.toString() !== req.user.id && !note.isPublic) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this note'
      });
    }

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
exports.updateNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    // Make sure user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this note'
      });
    }

    // Handle file uploads if any
    let attachments = note.attachments;
    if (req.files && req.files.length > 0) {
      const newAttachments = req.files.map(file => ({
        url: file.path,
        filename: file.filename,
        format: file.mimetype
      }));
      
      attachments = [...attachments, ...newAttachments];
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: title || note.title,
        content: content || note.content,
        tags: tags ? JSON.parse(tags) : note.tags,
        attachments,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    // Make sure user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this note'
      });
    }

    // Delete attachments from Cloudinary
    for (const attachment of note.attachments) {
      if (attachment.url) {
        const publicId = attachment.url.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`note-app/${publicId}`);
      }
    }

    await note.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Share a note
// @route   POST /api/notes/:id/share
// @access  Private
exports.shareNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    // Make sure user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to share this note'
      });
    }

    // Generate a unique share ID if none exists
    if (!note.shareId) {
      note.shareId = uuidv4();
    }
    
    // Set the note to public
    note.isPublic = true;
    await note.save();

    res.status(200).json({
      success: true,
      shareLink: `${req.protocol}://${req.get('host')}/api/notes/share/${note.shareId}`,
      data: note
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Access a shared note
// @route   GET /api/notes/share/:shareId
// @access  Public
exports.getSharedNote = async (req, res) => {
  try {
    const note = await Note.findOne({ shareId: req.params.shareId, isPublic: true });

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Shared note not found or no longer public'
      });
    }

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete an attachment from a note
// @route   DELETE /api/notes/:id/attachments/:attachmentId
// @access  Private
exports.deleteAttachment = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    // Make sure user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this note'
      });
    }

    // Find the attachment
    const attachment = note.attachments.id(req.params.attachmentId);
    
    if (!attachment) {
      return res.status(404).json({
        success: false,
        error: 'Attachment not found'
      });
    }

    // Delete from Cloudinary
    if (attachment.url) {
      const publicId = attachment.url.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`note-app/${publicId}`);
    }

    // Remove from note
    note.attachments.pull(req.params.attachmentId);
    await note.save();

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};