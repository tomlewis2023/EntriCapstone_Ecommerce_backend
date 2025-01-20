const Order = require('../models/Order');
const Product = require('../models/Product');

// Place an Order
exports.placeOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items provided' });
        }

        if (!shippingAddress) {
            return res.status(400).json({ message: 'Shipping address is required' });
        }

        // Calculate total price
        let totalPrice = 0;
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.product}` });
            }
            totalPrice += product.price * item.quantity;
        }

        // Create order
        const order = new Order({
            user: req.user.id, // User from the auth middleware
            orderItems,
            totalPrice,
            shippingAddress,
        });

        await order.save();

        res.status(201).json({
            message: 'Order placed successfully',
            order,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Order Details
exports.getOrderDetails = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email') // Populate user details
            .populate('orderItems.product', 'name price'); // Populate product details

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.user._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to view this order' });
        }

        res.status(200).json({
            message: 'Order details retrieved successfully',
            order,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
