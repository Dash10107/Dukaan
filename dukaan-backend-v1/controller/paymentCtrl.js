const Razorpay = require('razorpay');
const asyncHandler = require("express-async-handler");

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const checkout = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    const options = {
        amount: amount * 100,
        currency: "INR",
        // receipt: "receipt#1",
        // payment_capture: 0
    };
    try {
        const order = await instance.orders.create(options);
        res.json({order,success: true});
    } catch (error) {
        throw new Error(error);
    }
});

const paymentVerification = asyncHandler(async (req, res) => {
    const { paymentId, orderId } = req.body;
    try {
        const payment = await instance.payments.fetch(paymentId);
        res.json({payment,success: true});
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    checkout,
    paymentVerification
};
