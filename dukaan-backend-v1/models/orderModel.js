const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shippingInfo:{
      name:{type:String,requried:true},
      address:{type:String,requried:true},
      city:{type:String,requried:true},
      state:{type:String,requried:true},
      other:{type:String,requried:true},
      pincode:{type:Number,requried:true},

    },
    paymentInfo:{
      orderId:{type:String,requried:true},
      paymentId:{type:String,requried:true},
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity:{type:Number,requried:true},
        color: {type:String,requried:true},
        price:{type:String,requried:true},
      },
    ],
    paidAt:{
      type:Date,
      default:Date.now()
    },
    // paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Ordered"
    
    },
    totalPrice:{type:Number,requried:true},
    totalPriceAfterDiscount:{type:Number,requried:true},

  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);