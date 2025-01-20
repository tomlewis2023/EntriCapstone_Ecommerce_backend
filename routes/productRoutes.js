const express = require('express');
const { createProduct } = require('../controllers/productController');
const upload = require('../middlewares/multer');

const router = express.Router();

// Route to create a new product with image upload
router.post('/upload', upload.single('image'), createProduct);

module.exports = router;
