const User = require('../models/User');

// Get Admin Dashboard
exports.getAdminDashboard = (req, res) => {
    res.json({ message: 'Welcome to the Admin Dashboard' });
};

// List All Users
exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};
