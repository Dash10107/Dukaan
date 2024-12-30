const express = require('express');
const { signup, login,    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    updatePassword,
    forgotPasswordToken,
    resetPassword } = require('../controllers/user.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public Routes
router.post("/register", signup); // Register a user
router.post("/login", login); // Login a user
router.post("/forgot-password", forgotPasswordToken); // Send forgot password token
router.post("/reset-password/:token", resetPassword); // Reset password with token

// Protected Routes
router.get("/", isAuthenticated, isAdmin, getAllUsers); // Get all users (admin only)
router.get("/:id", isAuthenticated, getSingleUser); // Get single user
router.put("/:id", isAuthenticated, updateUser); // Update user details
router.delete("/:id", isAuthenticated, isAdmin, deleteUser); // Delete user (admin only)
router.put("/:id/update-password", isAuthenticated, updatePassword); // Update password


module.exports = router;
