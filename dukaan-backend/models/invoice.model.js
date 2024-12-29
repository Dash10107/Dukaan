const mongoose = require('mongoose');
// Invoice Model
const invoiceSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  totalAmount: { type: Number, required: true },
  invoiceDate: { type: Date, default: Date.now },
});

export default mongoose.model('Invoice', invoiceSchema);