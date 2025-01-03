const express = require('express');
const router = express.Router();
const { isAuthenticated, isSeller, isAdmin } = require('../middlewares/auth.middleware');
const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  bulkUploadProducts,
  uploadImages
} = require('../controllers/product.controller');
const  {singleUpload,upload}  = require('../middlewares/multer');

// Routes
router.post('/', isAuthenticated, isSeller, createProduct); // Only sellers can create products
router.post('/bulk', isAuthenticated, isSeller, upload,bulkUploadProducts); // Only sellers can bulk upload products
router.post('/upload-images/:id', isAuthenticated, isSeller,singleUpload , uploadImages); // Only sellers can upload images
router.get('/', getAllProduct); // Public route
router.get('/:id', getProductById); // Public route
router.put('/:id', isAuthenticated, isSeller, updateProduct); // Only sellers can update their products
router.delete('/:id', isAuthenticated, isSeller, deleteProduct); // Only sellers can delete their products

module.exports = router;
