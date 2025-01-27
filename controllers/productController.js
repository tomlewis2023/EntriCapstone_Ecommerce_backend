const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, category, seller } = req.body;

          // Log incoming request to check data
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        // Check if an image was uploaded
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: 'Product image is required' });
        }

        

         

        // Cloudinary stores the URL and other data, use the `secure_url` for the image
        const imageUrl = req.file.path; // Cloudinary provides `secure_url`

        // Create a new product
        const product = new Product({
            name,
            price,
            description,
            category, 
            seller, 
            image: imageUrl, // Path to the uploaded image
        });

        await product.save();

        res.status(201).json({
            message: 'Product added successfully',
            product,
        });
    } catch (error) {   
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//display all products main page
exports.alluserProducts = async (req, res) => {
    try {
      const products = await Product.find(); // Assuming you're using MongoDB
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products.' });
    }
  };