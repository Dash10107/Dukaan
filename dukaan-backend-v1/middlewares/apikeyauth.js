const apiKeyModel = require("../models/apiKeyModel");
// const ApiKey = require("../models/apiKeyModel");
const userModel = require("../models/userModel");
const { hashApiKey } = require("../utils/apiKey");

async function apiKeyAuth(req, res, next) {
  const apiKey = req.header('X-API-Key');

  if (!apiKey) {
    return res.status(401).json({ message: 'API key is required' });
  }

  const hashedApiKey = hashApiKey(apiKey);

  try {
    const apiKeyRecord = await apiKeyModel.findOne({ key: hashedApiKey });

    if (!apiKeyRecord) {
      return res.status(401).json({ message: 'Invalid API key' });
    }

    const user = await userModel.findById(apiKeyRecord.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error validating API key:', error);
    res.status(500).json({ message: 'Error validating API key' });
  }
}

module.exports = apiKeyAuth;