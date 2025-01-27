const express = require('express');
const { createProduct, alluserProducts } = require('../controllers/productController');
const upload = require('../middlewares/multer');

const router = express.Router();

// Route to create a new product with image upload
router.post('/upload', upload.single('image'), createProduct);

//Product render all users
router.get(`/allproducts`,alluserProducts)


module.exports = router;
