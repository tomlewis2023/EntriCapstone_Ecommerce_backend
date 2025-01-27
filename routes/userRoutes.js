const express = require('express');
const { signup, signin, getUserOrders } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// User Signup
router.post('/signup', signup);

// User Signin
router.post('/signin', signin);

// Get User Orders (Authenticated)
router.get('/orders', authMiddleware, getUserOrders);



module.exports = router;
