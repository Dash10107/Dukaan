const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  key: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUsed: {
    type: Date
  }
}, { timestamps: true });

// Index for faster queries
apiKeySchema.index({ key: 1 });
apiKeySchema.index({ userId: 1 });

// Method to deactivate the API key
apiKeySchema.methods.deactivate = function() {
  this.isActive = false;
  return this.save();
};

// Method to update last used timestamp
apiKeySchema.methods.updateLastUsed = function() {
  this.lastUsed = new Date();
  return this.save();
};

// Static method to find active API key by key
apiKeySchema.statics.findActiveByKey = function(key) {
  return this.findOne({ key, isActive: true });
};

module.exports = mongoose.model('ApiKey', apiKeySchema);

