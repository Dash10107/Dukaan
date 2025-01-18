const express = require('express');
const userModel = require('../models/userModel');
const { hashApiKey, generateApiKey } = require('../utils/apiKey');
const apiKeyModel = require('../models/apiKeyModel');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/generate',authMiddleware, async (req, res) => {
  // console.log(req.user)
  const userId = req.user._id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const apiKey = generateApiKey();
    const hashedApiKey = hashApiKey(apiKey);

    const newApiKey = new apiKeyModel({
      userId: user._id,
      key: hashedApiKey
    });

    await newApiKey.save();

    res.status(200).json({ apiKey });
  } catch (error) {
    console.error('Error generating API key:', error);
    res.status(500).json({ message: 'Error generating API key' });
  }
});

module.exports = router;