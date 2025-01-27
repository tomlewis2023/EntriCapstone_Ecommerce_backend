const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Category = require("../models/Category");

// Get Admin Dashboard Stats
exports.getAdminDashboard = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();
    const productCount = await Product.countDocuments();
    const categoryCount = await Category.countDocuments();

    res.json({ userCount, orderCount, productCount, categoryCount });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard stats", error });
  }
};

// User Management
exports.getUsers = async (req, res) => {
  try {
      const users = await User.find();
      if (!users) {
          return res.status(404).json({ message: 'No users found' });
      }
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};

// Implement similar logic for products, categories, and orders...

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).json(products); // Return all products
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
  };


 

  // Add a new product with image
  exports.addProduct = async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      console.log("Uploaded File:", req.file);
  
      const { name, description, price, category, stock } = req.body;
  
      // Validation: Check if all required fields are present
      if (!name || !description || !price || !category || !stock || !req.file) {
        return res.status(400).json({ message: "All fields are required, including an image." });
      }
  
      const imagePath = req.file.path;
  
      const product = new Product({
        name,
        description,
        price,
        category,
        stock,
        image: imagePath,
      });
  
      await product.save();
      res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
      res.status(500).json({ message: "Failed to add product", error });
    }
  };
  

  // Update a product with image
  exports.updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = { ...req.body };
  
      // Check if a new image was uploaded
      if (req.file) {
        updatedData.image = req.file.path;
      }
  
      const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json({ message: 'Product updated successfully', product });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update product', error });
    }
  };


  // Delete a product
  exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findByIdAndDelete(id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product", error });
    }
  };


  // Get all categories
exports.getCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories", error });
    }
  };
  
  // Add a new category
  exports.addCategory = async (req, res) => {
    try {
      const { name } = req.body;
  
      const category = new Category({ name });
      await category.save();
  
      res.status(201).json({ message: "Category added successfully", category });
    } catch (error) {
      res.status(500).json({ message: "Failed to add category", error });
    }
  };
  
  // Delete a category
  exports.deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      const category = await Category.findByIdAndDelete(id);
  
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete category", error });
    }
  };



  // Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error });
  }
};
