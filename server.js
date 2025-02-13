const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('./config/db');



// Route Imports

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const allProducts = require('./routes/productRoutes')

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add CORS middleware
app.use(
    cors({
      origin: 'http://localhost:5173', // Replace with your frontend URL
      credentials: true,              // Allow cookies or credentials
    })
  );

// Routes

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use(`/api/alluserproducts`,allProducts)

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error', error: err.message });
});

// Connect to database and start server
const PORT = process.env.PORT || 5000;
mongoose.connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
    });
