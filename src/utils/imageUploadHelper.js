const path = require('path');
const multer = require('multer');


// Define file storage configuration
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../assets/images')); // Save files in the "images" folder at the project root
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        cb(null, `${timestamp}-${file.originalname}`);
    }
});


// File filter to validate image types
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PNG, JPG, and JPEG are allowed.'), false);
    }
};


// Multer configuration
const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});


// Export the upload middleware and helper functions
module.exports = {
    upload: upload.single('image'),
    serveImages: path.join(__dirname, '../assets/images')
};
