const express = require('express');
const { register, login, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { registerValidation, loginValidation } = require('../utils/validators');

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/logout', logout);
router.get('/me', protect, getMe);

module.exports = router;