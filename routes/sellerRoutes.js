const express = require('express');
const { getSellerDashboard, addProduct } = require('../controllers/sellerController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Seller Dashboard
router.get('/dashboard', authMiddleware, roleMiddleware(['seller']), getSellerDashboard);

// Add Product
router.post('/products', authMiddleware, roleMiddleware(['seller']), addProduct);

module.exports = router;
