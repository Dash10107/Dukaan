const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");
const {cloudinaryUploadImg} = require("../utils/cloudinary");
const fs = require("node:fs");
const XLSX = require('xlsx');
const {client} = require("../utils/elasticsearch");

const createProduct = asyncHandler(async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      req.body.seller = req.user._id;
      const newProduct = await Product.create(req.body);
      const elasticProduct = {
        vector: [
          Number.parseFloat(req.body.price || 0), // Adjust vector fields as needed
          Number.parseFloat(req.body.quantity || 0),
          Number.parseFloat(req.body.sold || 0),
        ],
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        brand: req.body.brand,
        tags: req.body.tags,
        price: req.body.price,
        quantity: req.body.quantity,
        sold: req.body.sold,
      };
      
      // Index the product in Elasticsearch
      await client.index({
        index: "e-commerce",
        body: elasticProduct,
      });
      
      res.json(newProduct);
    } catch (error) {
      throw new Error(error);
    }
  });


// Search products
const search = async (req, res) => {
  const { query, category } = req.body;
  try {
    const searchBody = {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: query,
                fields: ['title^3', 'description', 'tags'],
                fuzziness: 'AUTO',
              },
            },
          ],
          filter: category
            ? [
                {
                  term: { category: category },
                },
              ]
            : [],
        },
      },
    };

    const response = await client.search({
      index: 'e-commerce',
      body: searchBody,
    });

    const results = response.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
    }));
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Recommend similar products by name or vector
const recommend = async (req, res) => {
  const { name, vector } = req.query; // 'name' is the product name, 'vector' is optional
  try {
    let body;

    if (vector) {
      // Recommend using vector similarity
      body = {
        query: {
          script_score: {
            query: { match_all: {} },
            script: {
              source: "cosineSimilarity(params.queryVector, 'vector') + 1.0",
              params: { queryVector: JSON.parse(vector) }
            }
          }
        },
        size: 10
      };
    } else if (name) {
      // Recommend using product name similarity
      body = {
        query: {
          more_like_this: {
            fields: ["title", "description"],
            like: name,
            min_term_freq: 1,
            max_query_terms: 12
          }
        },
        size: 10
      };
    } else {
      // Default fallback: Recommend top popular products
      body = {
        query: { match_all: {} },
        size: 10
      };
    }

    const { hits } = await client.search({
      index: 'e-commerce',
      body
    });

    const recommendations = hits.hits.map(hit => ({ id: hit._id, ...hit._source }));
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  const updateProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDbId(id);

    
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updateProduct = await Product.findOneAndUpdate({_id: id }, req.body, {
        new: true,
      });      
      res.json(updateProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deleteProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
      const deleteProduct = await Product.findOneAndDelete(id);
      res.json(deleteProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const findProduct = await Product.findById(id).populate("ratings.postedby");
      res.json(findProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getAllProduct = asyncHandler(async (req, res) => {
    try {
      // Filtering
      const queryObj = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      for (const el of excludeFields) {
        delete queryObj[el];
      }
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


  const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;
    try {
      const user = await User.findById(_id);
      const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
      if (alreadyadded) {
        const user = await User.findByIdAndUpdate(
          _id,
          {
            $pull: { wishlist: prodId },
          },
          {
            new: true,
          }
        );
        res.json(user);
      } else {
        const user = await User.findByIdAndUpdate(
          _id,
          {
            $push: { wishlist: prodId },
          },
          {
            new: true,
          }
        );
        res.json(user);
      }
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
      const product = await Product.findById(prodId);
      const alreadyRated = product.ratings.find(
        (userId) => userId.postedby.toString() === _id.toString()
      );
      if (alreadyRated) {
        const updateRating = await Product.updateOne(
          {
            ratings: { $elemMatch: alreadyRated },
          },
          {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment },
          },
          {
            new: true,
          }
        );
      } else {
        const rateProduct = await Product.findByIdAndUpdate(
          prodId,
          {
            $push: {
              ratings: {
                star: star,
                comment: comment,
                postedby: _id,
              },
            },
          },
          {
            new: true,
          }
        );
      }
      const getallratings = await Product.findById(prodId);
      const totalRating = getallratings.ratings.length;
      const ratingsum = getallratings.ratings
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0);
      const actualRating = Math.round(ratingsum / totalRating);
      const finalproduct = await Product.findByIdAndUpdate(
        prodId,
        {
          totalrating: actualRating,
        },
        { new: true }
      );
      res.json(finalproduct);
    } catch (error) {
      throw new Error(error);
    }
  });


  const uploadImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const uploader = (path) => cloudinaryUploadImg(path, "images");
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


  // get all products by seller id
  const getProductsBySellerId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const products = await Product.find({ seller: id });
      res.json(products);
    } catch (error) {
      throw new Error(error);
    }
  });

  const getSellerStats = asyncHandler(async (req, res) => {
    const sellerId = req.user._id;
    try {
      const totalProducts = await Product.countDocuments({ seller: sellerId });
      const totalSales = await Order.aggregate([
        { $match: { 'orderItems.product.seller': sellerId } },
        { $group: { _id: null, total: { $sum: '$totalPriceAfterDiscount' } } }
      ]);
      const topProducts = await Order.aggregate([
        { $match: { 'orderItems.product.seller': sellerId } },
        { $unwind: '$orderItems' },
        { $group: { _id: '$orderItems.product', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]);

      res.json({
        totalProducts,
        totalSales: totalSales[0]?.total || 0,
        topProducts
      });
    } catch (error) {
      throw new Error(error);
    }
  });



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
      // console.log(sheetData);
      // Validate and transform data
      const products = sheetData.map((row) => ({
        title: row.title,
        slug: slugify(row.title),
        description: row.description,
        price: row.price,
        quantity: row.quantity,
        category: row.category,
        brand: row.brand,
        color: row.color.split(',').map((color) => color.trim()),
        tags: row.tags,
        seller: req.user._id, 
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
  
  

  module.exports={createProduct,getaProduct,deleteProduct,updateProduct,getAllProduct,addToWishlist,rating,uploadImages,
    getProductsBySellerId, getSellerStats, bulkUploadProducts,search,recommend}