const express = require('express');
const apiKeyAuth = require('../middlewares/apikeyauth');
const { getAllProduct, getaProduct, getProductsBySellerId, search, recommend} = require('../controller/productCtrl');

const router = express.Router();

router.get('/allproducts', apiKeyAuth, getAllProduct);
router.get("/:id",apiKeyAuth, getaProduct);
router.get("/seller/:id", apiKeyAuth, getProductsBySellerId);
// router.post('/sellertoelastic',fetchProductsAndIndex)
router.get('/search/elastic',search)
router.get('/recommend/elastic',recommend)


module.exports = router;