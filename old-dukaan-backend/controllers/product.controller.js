const asyncHandler = require('express-async-handler');
const Product = require('../models/product.model');
const slugify = require("slugify");
const validateMongoDBId = require('../utils/validate.mongodb.id');
const {cloudinaryUploadImg} = require("../utils/cloudinary");

// Create a product
const createProduct = asyncHandler(async (req, res) => {
  let slug = ""  
  if (req.body.name) {
        slug =  slugify(req.body.name);
        console.log(slug)
      }
    const { name, description, price, quantity, category } = req.body;

  // Check if user is a seller
  if (req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Access denied: Only sellers can create products.' });
  }

  const sellerId = req.user._id; // Assuming the seller ID is the authenticated user ID
  const product = await Product.create({
    name,
    slug,
    description,
    price,
    quantity,
    category,
    seller: sellerId,
  });

  res.status(201).json({ message: 'Product created successfully', product });
});


const XLSX = require('xlsx');

// Bulk upload products
const bulkUploadProducts = asyncHandler(async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded',file });
  }
  
  const filePath = req.file.path;

  try {
    // Read the uploaded file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Validate and transform data
    const products = sheetData.map((row) => ({
      name: row.name,
      slug: slugify(row.name),
      description: row.description,
      price: row.price,
      quantity: row.quantity,
      category: row.category,
      seller: req.user._id, // Assuming the logged-in seller is uploading
    }));

    // Save products to the database
    await Product.insertMany(products);

    res.status(201).json({
      message: 'Products uploaded successfully',
      uploadedCount: products.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process file', error: error.message });
  }
});



// Get all products
const getAllProduct = asyncHandler(async (req, res) => {
    try {
      // Filtering
      const queryObj = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      // biome-ignore lint/complexity/noForEach: <explanation>
      excludeFields.forEach((el) => delete queryObj[el]);
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      let query = Product.find(JSON.parse(queryStr));
  
      // Sorting
  
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }
  
      // limiting the fields
  
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }
  
      // pagination
  
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount = await Product.countDocuments();
        if (skip >= productCount) throw new Error("This Page does not exists");
      }
      const product = await query;

      // const product = await Product.find();
      res.json(product);
    } catch (error) {
      throw new Error(error);
    }
  });

  
  // Get a single product by ID
const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('seller', 'businessName');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  });

  // Update a product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
        if (req.body.title) {
          req.body.slug = slugify(req.body.title);
        }

    const { name, description, price, quantity, category } = req.body;
  
    const product = await Product.findById(id);
  
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    // Check if the logged-in user is the seller of the product
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied: Only the seller can update this product' });
    }
  
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.category = category || product.category;
  
    const updatedProduct = await product.save();
  
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  });

  // Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const product = await Product.findById(id);
  
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    // Check if the logged-in user is the seller of the product
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied: Only the seller can delete this product' });
    }
  
    await product.deleteOne();
  
    res.status(200).json({ message: 'Product deleted successfully' });
  });
  

  const uploadImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBId(id);
    try {
      const uploader = (path) => cloudinaryUploadImg(path, "dukaan/products");
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        console.log(newpath);
        urls.push(newpath);
        fs.unlinkSync(path);
      }
      const findProduct = await Product.findByIdAndUpdate(
        id,
        {
          images: urls.map((file) => {
            return file;
          }),
        },
        {
          new: true,
        }
      );
      res.json(findProduct);
    } catch (error) { 
      throw new Error(error);
    }
  });

  module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    uploadImages,
    bulkUploadProducts
  };