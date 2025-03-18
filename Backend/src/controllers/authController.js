const User = require('../models/User');
const { validationResult } = require('express-validator');

// Helper function to send token response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "Lax", // Ensure proper cross-site handling
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      user,  // Include user details in response
      token
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        error: 'User with this email already exists'
      });
    }

    // Create user
    user = await User.create({ name, email, password });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error("Error in Register:", err.message);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found, please register first'
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect password'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error("Error in Login:", err.message);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // 10 seconds expiry
    httpOnly: true,
    sameSite: "Lax",
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully"
  });
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Don't send password

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    console.error("Error in GetMe:", err.message);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};
