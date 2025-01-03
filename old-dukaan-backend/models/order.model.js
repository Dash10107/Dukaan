const mongoose = require('mongoose');
// Order Model
const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
    price: { type: Number },
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  paymentInfo:{
    orderId:{type:String,requried:true},
    paymentId:{type:String,requried:true},
  },
  payedAt:{type:Date,default:Date.now},
});

export default mongoose.model('Order', orderSchema);    

