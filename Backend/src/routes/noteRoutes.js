const express = require('express');
const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  shareNote,
  getSharedNote,
  deleteAttachment
} = require('../controllers/noteController');
const { protect } = require('../middlewares/authMiddleware');
const { uploadMultipleFiles } = require('../middlewares/uploadMiddleware');
const { noteValidation } = require('../utils/validators');

const router = express.Router();

router
  .route('/')
  .post(protect, uploadMultipleFiles, noteValidation, createNote)
  .get(protect, getNotes);

router
  .route('/:id')
  .get(protect, getNote)
  .put(protect, uploadMultipleFiles, updateNote)
  .delete(protect, deleteNote);

router.post('/:id/share', protect, shareNote);
router.get('/share/:shareId', getSharedNote);
router.delete('/:id/attachments/:attachmentId', protect, deleteAttachment);

module.exports = router;