const mongoose = require('mongoose');
// Admin Model (Extends User for Admin-Specific Data)
const adminSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  permissions: {
    manageSellers: { type: Boolean, default: true },
    manageBuyers: { type: Boolean, default: true },
    manageSuppliers: { type: Boolean, default: true },
    manageProducts: { type: Boolean, default: true },
    manageOrders: { type: Boolean, default: true },
  },
});

export default mongoose.model('Admin', adminSchema);