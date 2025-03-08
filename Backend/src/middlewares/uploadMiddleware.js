const { upload } = require('../config/cloudinary');

// Middleware for single file upload
exports.uploadSingleFile = upload.single('file');

// Middleware for multiple file uploads
exports.uploadMultipleFiles = upload.array('files', 5); // Maximum 5 files