const { check } = require('express-validator');

// User validation
exports.registerValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

exports.loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

// Note validation
exports.noteValidation = [
  check('title', 'Title is required').not().isEmpty(),
  check('content', 'Content is required').not().isEmpty()
];

// Tag validation
exports.tagValidation = [
  check('name', 'Tag name is required').not().isEmpty(),
  check('color', 'Tag color is required').not().isEmpty()
];