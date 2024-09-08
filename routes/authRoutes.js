const express = require('express');
const { register, login, sendResetEmail, validateResetEmail } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset', sendResetEmail);
router.post('/validate', validateResetEmail);

module.exports = router;
