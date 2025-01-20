const express = require('express');
const { getUsers, getAdminDashboard } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Admin Dashboard
router.get('/dashboard', authMiddleware, roleMiddleware(['admin']), getAdminDashboard);

// List All Users
router.get('/users', authMiddleware, roleMiddleware(['admin']), getUsers);

module.exports = router;
