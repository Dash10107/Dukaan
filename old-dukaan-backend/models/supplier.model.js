const mongoose = require('mongoose');
// Supplier Model
const supplierSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  productsSupplied: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    price: { type: Number },
  }],
  ordersReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

module.exports =    mongoose.model('Supplier', supplierSchema);