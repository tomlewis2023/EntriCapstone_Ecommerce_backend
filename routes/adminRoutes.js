const express = require('express');
const {
  getUsers,
  deleteUser,
  getAdminDashboard,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  addCategory,
  deleteCategory,
  getOrders,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/multer');

const router = express.Router();

// Admin Dashboard
router.get('/dashboard', authMiddleware, roleMiddleware(['admin']), getAdminDashboard);

// User Management
router.get('/users', authMiddleware, roleMiddleware(['admin']), getUsers);
router.delete('/users/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);

// Products CRUD
router.get('/products', authMiddleware, roleMiddleware(['admin']), getProducts);
router.post('/addproducts',  upload.single('image'), addProduct);
router.put('/products/:id', authMiddleware, roleMiddleware(['admin']), upload.single('image'), updateProduct);
router.delete('/products/:id', authMiddleware, roleMiddleware(['admin']), deleteProduct);

// Categories Management
router.get('/categories', authMiddleware, roleMiddleware(['admin']), getCategories);
router.post('/categories', authMiddleware, roleMiddleware(['admin']), addCategory);
router.delete('/categories/:id', authMiddleware, roleMiddleware(['admin']), deleteCategory);

// Orders Management
router.get('/orders', authMiddleware, roleMiddleware(['admin']), getOrders);
router.put('/orders/:id', authMiddleware, roleMiddleware(['admin']), updateOrderStatus);
router.delete('/orders/:id', authMiddleware, roleMiddleware(['admin']), deleteOrder);

module.exports = router;
