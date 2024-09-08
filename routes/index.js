const express = require('express');
const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Defina as rotas
router.use('/auth', authRoutes);
router.use('/tasks', authMiddleware, taskRoutes);

module.exports = router;