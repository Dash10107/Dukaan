const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
} = require("../controller/brandCtrl");
const { authMiddleware, isAdmin, isSeller } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isSeller || isAdmin, createBrand);
router.put("/:id", authMiddleware,isSeller || isAdmin, updateBrand);
router.delete("/:id", authMiddleware,isSeller || isAdmin, deleteBrand);
router.get("/:id", getBrand);
router.get("/", getallBrand);

module.exports = router;