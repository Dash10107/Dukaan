const express = require('express');
const apiKeyAuth = require('../middlewares/apikeyauth');
const { getAllProduct, getaProduct, getProductsBySellerId} = require('../controller/productCtrl');

const router = express.Router();

router.get('/allproducts', apiKeyAuth, getAllProduct);
router.get("/:id",apiKeyAuth, getaProduct);
router.get("/seller/:id", apiKeyAuth, getProductsBySellerId);
// router.post('/sellertoelastic',fetchProductsAndIndex)

module.exports = router;