const express = require('express');
const { placeOrder, getOrderDetails } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Place an Order
router.post('/', authMiddleware, placeOrder);

// Get Order Details
router.get('/:id', authMiddleware, getOrderDetails);

module.exports = router;
