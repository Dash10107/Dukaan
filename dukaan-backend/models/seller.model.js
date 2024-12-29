const mongoose = require('mongoose');
// Seller Model
const sellerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  gstNumber: { type: String, required: true },
  panNumber: { type: String },
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  analytics: {
    totalSales: { type: Number, default: 0 },
    topSellingProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
});

export default mongoose.model('Seller', sellerSchema);