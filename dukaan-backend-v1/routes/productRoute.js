const express = require("express");
const {
  createProduct,
  getaProduct,
   getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
  getProductsBySellerId,
  getSellerStats,
  bulkUploadProducts,
  search,
  recommend
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware, isSeller,} = require("../middlewares/authMiddleware");
const { productImgResize, uploadPhoto, upload } = require("../middlewares/uploadImage");
const router = express.Router();

router.post("/", authMiddleware, isSeller || isAdmin,   createProduct);
router.put(
  "/upload/:id",
  authMiddleware,
 isSeller || isAdmin,
  uploadPhoto.array("images", 2),
  productImgResize,
  uploadImages
);
router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);



router.put("/:id",authMiddleware,isSeller,updateProduct);
router.delete("/:id",authMiddleware, isSeller,  deleteProduct);

 router.get("/", getAllProduct);
 
 router.get("/seller/:id", authMiddleware, getProductsBySellerId);
 router.get("/seller/stats", authMiddleware, isSeller, getSellerStats);
router.post("/bulk", authMiddleware, isSeller, upload, bulkUploadProducts);
router.get('/search/elastic',search)
router.get('/recommend',recommend)

module.exports = router;



