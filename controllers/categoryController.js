const Category = require('../models/Category');

// Controller to get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find(); // Retrieve all categories from the database
        res.status(200).json({
            message: 'Categories retrieved successfully',
            categories,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Controller to add a new category (Admin Only)
exports.addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        // Create a new category
        const category = new Category({
            name,
            description,
        });

        await category.save();

        res.status(201).json({
            message: 'Category added successfully',
            category,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
