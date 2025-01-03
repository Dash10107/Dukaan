const mongoose = require('mongoose');
// Product Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: {    type: String,    required: true,    unique: true,    lowercase: true,},
  description: {    type: String,    required: true, },
price: { type: Number, required: true },
  quantity: { type: Number, required: true, },
  category: { type: String,required:true },
  images: [    {  public_id: String,url: String,},],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  competitorsPricing: [{
    competitorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
    price: { type: Number },
  }],
  lowStockAlert: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);