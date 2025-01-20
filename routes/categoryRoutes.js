const express = require('express');
const { getCategories, addCategory } = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Get All Categories
router.get('/', getCategories);

// Add Category (Admin Only)
router.post('/', authMiddleware, roleMiddleware(['admin']), addCategory);

module.exports = router;
