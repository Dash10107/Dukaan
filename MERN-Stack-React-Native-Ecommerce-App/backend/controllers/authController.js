const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        location: req.body.location,
        password: hashedPassword,
      });

      await newUser.save();
      return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json("Invalid credentials, please check the email address");
      }

      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json("Incorrect password");
      }

      const userToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET, // Use environment variable for security
        { expiresIn: "7d" }
      );

      const { password, __v, createdAt, updatedAt, ...userData } = user._doc;

      return res.status(200).json({ ...userData, token: userToken });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },
};
