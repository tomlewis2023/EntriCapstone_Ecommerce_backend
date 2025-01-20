const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'entriecomm', // Folder name in Cloudinary
        allowed_formats: ['jpeg', 'jpg', 'png', 'webp'] // Allowed image formats
    }
});

// Initialize Multer
const upload = multer({ storage });

module.exports = upload;
