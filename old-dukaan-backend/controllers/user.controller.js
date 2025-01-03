const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const  User  = require('../models/user.model');
const  Seller  = require('../models/seller.model');
const  Supplier  = require('../models/supplier.model');
const Admin = require('../models/admin.model');
const validateMongoDbId = require('../utils/validate.mongodb.id');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Signup Controller
const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role, businessName, gstNumber, panNumber } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const newUser = await User.create({
    name,
    email,
    password,
    role,
  });

  if (role === 'seller') {
    if (!businessName || !gstNumber) {
      res.status(400);
      throw new Error('Seller requires businessName and gstNumber');
    }
    await Seller.create({
      user: newUser._id,
      businessName,
      gstNumber,
      panNumber,
    });
  } else if (role === 'supplier') {
    if (!businessName) {
      res.status(400);
      throw new Error('Supplier requires businessName');
    }
    await Supplier.create({
      user: newUser._id,
      businessName,
    });
  } else if (role === 'admin') {
    await Admin.create({
      user: newUser._id,
      permissions: {
        manageSellers: true,
        manageBuyers: true,
        manageSuppliers: true,
        manageProducts: true,
        manageOrders: true,
      },
    });
  }

  res.status(201).json({
    message: 'User created successfully',
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

// Login Controller
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Get All Users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
  });
// Get Single User
const getSingleUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
  
    res.json(user);
  });
  
  // Update User
  const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    const user = await User.findByIdAndUpdate(
      id,
      { name: req.body.name, email: req.body.email },
      { new: true }
    );
  
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
  
    res.json(user);
  });
  
  // Delete User
  const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
  
    res.json({ message: "User deleted successfully" });
  });
  
  // Update Password
  const updatePassword = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    validateMongoDbId(id);
  
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
  
    user.password = password;
    const updatedUser = await user.save();
    res.json({ message: "Password updated successfully", updatedUser });
  });
  
  // Forgot Password
  const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
  
    const token = user.createPasswordResetToken();
    await user.save();
  
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    // Send resetLink via email (use an email library)
    res.json({ message: "Password reset link sent", resetLink });
  });
  
  // Reset Password
  const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
  
    if (!user) {
      res.status(400);
      throw new Error("Invalid or expired token");
    }
  
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
  
    res.json({ message: "Password reset successful" });
  });

  module.exports = {

    signup,
    login,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
  };