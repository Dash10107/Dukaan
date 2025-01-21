const express = require("express");
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getallColor,
} = require("../controller/colorCtrl");
const { authMiddleware, isAdmin, isSeller } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware,isSeller || isAdmin, createColor);
router.put("/:id", authMiddleware,isSeller || isAdmin, updateColor);
router.delete("/:id", authMiddleware,isSeller || isAdmin, deleteColor);
router.get("/:id", getColor);
router.get("/", getallColor);

module.exports = router;