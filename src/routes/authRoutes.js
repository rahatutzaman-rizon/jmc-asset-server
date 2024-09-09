const express = require('express');
const { loginUser, registerUser, getAllEmails } = require('../controllers/authController');

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Register route (optional)
router.post('/register', registerUser);

// Get all user emails
router.get('/emails', getAllEmails);

module.exports = router;
