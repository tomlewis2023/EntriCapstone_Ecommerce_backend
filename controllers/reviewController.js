const Review = require('../models/Review');
const Product = require('../models/Product');

// Add Review
const addReview = async (req, res) => {
    try {
        const { product, rating, comment } = req.body;

        // Check if the user has already reviewed the product
        const existingReview = await Review.findOne({ product, user: req.user.id });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this product.' });
        }

        // Check if the product exists
        const productExists = await Product.findById(product);
        if (!productExists) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Create and save the review
        const review = new Review({
            product,
            user: req.user.id,
            rating,
            comment
        });

        await review.save();

        res.status(201).json({ message: 'Review added successfully.', review });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    addReview
};
