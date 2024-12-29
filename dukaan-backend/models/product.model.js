const mongoose = require('mongoose');
// Product Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  competitorsPricing: [{
    competitorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
    price: { type: Number },
  }],
  lowStockAlert: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Product', productSchema);