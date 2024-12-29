const mongoose = require('mongoose');
// Analytics Model
const analyticsSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  monthlySales: [{
    month: { type: String },
    totalSales: { type: Number },
    topProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Analytics', analyticsSchema);