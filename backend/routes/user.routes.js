const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, logoutUser, getAllUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/logout', logoutUser);
router.get('/all', getAllUsers);

module.exports = router;
