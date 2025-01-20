const Seller = require('../models/Seller');
const Product = require('../models/Product');

// Get Seller Dashboard
const getSellerDashboard = async (req, res) => {
    try {
        const seller = await Seller.findById(req.user.id).populate('products');
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found.' });
        }

        res.status(200).json({
            message: 'Seller dashboard data retrieved successfully.',
            seller
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Add Product
const addProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;

        // Create a new product
        const product = new Product({
            name,
            price,
            description,
            category,
            seller: req.user.id
        });

        await product.save();

        // Add the product to the seller's list of products
        const seller = await Seller.findById(req.user.id);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found.' });
        }

        seller.products.push(product._id);
        await seller.save();

        res.status(201).json({
            message: 'Product added successfully.',
            product
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getSellerDashboard,
    addProduct
};
