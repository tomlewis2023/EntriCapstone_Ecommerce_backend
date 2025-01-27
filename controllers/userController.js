const User = require('../models/User');
const Order = require('../models/Order');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup Logic
exports.signup = async (req, res) => {
    // Logic to create a user
    const { name, email, password, role } = req.body;
    
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                name,
                email,
                password: hashedPassword,
                role: role || 'user' // Default role is 'user'
            });
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
};

// Signin Logic
exports.signin = async (req, res) => {
    // Logic for user authentication and token generation
    const { email, password } = req.body;
    
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: 'User not found' });
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                },
                token,
              });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};

// Get User Orders
exports.getUserOrders = async (req, res) => {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate('orderItems');
    res.json(orders);
};
