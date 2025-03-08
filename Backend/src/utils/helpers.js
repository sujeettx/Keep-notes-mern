const crypto = require('crypto');

// Generate a random string for use as a share ID
exports.generateRandomString = (length = 10) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

// Format error responses
exports.formatErrorResponse = (error) => {
  return {
    success: false,
    error: error.message || 'Server Error'
  };
};

// Format success responses
exports.formatSuccessResponse = (data, statusCode = 200) => {
  return {
    success: true,
    data
  };
};

// Function to handle file size conversion
exports.formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
  else return (bytes / 1048576).toFixed(2) + ' MB';
};

// Time-based utility functions
exports.getTimeAgo = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else {
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }
};

// Debounce function for auto-save
exports.debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

// Extract text content from HTML for searching
exports.extractTextFromHTML = (html) => {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

// Parse tags from string
exports.parseTagsFromString = (tagsString) => {
  if (!tagsString) return [];
  
  try {
    return JSON.parse(tagsString);
  } catch (err) {
    // If the tags aren't in JSON format, try splitting by comma
    return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
  }
};