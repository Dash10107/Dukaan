// ivrCtrl.js

const twilio = require('twilio');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const welcomeMessage = "Welcome to our WhatsApp shopping experience! Here are your options:\n1. View Products\n2. Place an Order\n3. Check Order Status\n4. Contact Support";

const handleIncomingMessage = async (req, res) => {
  try {
     console.log('Incoming message:', req.body);
     console.log('Incoming message:', req.body.Body)
    const { Body, From } = req.body;
    
    if (!Body || !From) {
      console.error('Missing Body or From in the request');
      return res.status(400).send('Invalid request');
    }
    console.log(From)
    const userPhoneNumber = From.replace('whatsapp:', '');
    let user = await User.findOne({ mobile: userPhoneNumber });
    if (!user) {
      console.log(`New user detected: ${userPhoneNumber}`);
     return res.status(200).send('New user detected');
     }

    let responseMessage = '';

    switch (Body.toLowerCase()) {
      case '1':
        responseMessage = await listProducts();
        break;
      case '2':
        responseMessage = "Great! Let's start your order. Please reply with 'order' followed by the product number you'd like to order (e.g., 'order 1').";
        break;
      case '3':
        responseMessage = await checkOrderStatus(user._id);
        break;
      case '4':
        responseMessage = "Our support team will contact you shortly. Thank you for your patience!";
        break;
      default:
        if (Body.toLowerCase().startsWith('order')) {
          responseMessage = await handleOrder(Body, user._id);
        } else {
          responseMessage = welcomeMessage;
        }
    }

    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message({},responseMessage);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  } catch (error) {
    console.error('Error in handleIncomingMessage:', error);
    res.status(500).send('Internal Server Error');
  }
};

const startConversation = async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    await client.messages.create({
      from: 'whatsapp:+14155238886', // Replace with your Twilio number
      body: welcomeMessage,
      to: `whatsapp:${phoneNumber}`
    });
    res.status(200).json({ message: 'WhatsApp conversation started successfully' });
  } catch (error) {
    console.error('Error starting WhatsApp conversation:', error);
    res.status(500).json({ error: 'Failed to start WhatsApp conversation' });
  }
};

const listProducts = async () => {
  try {
    const products = await Product.find().limit(5);
    let productList = "Here are our top products:\n";
    products.forEach((product, index) => {
      productList += `${index + 1}. ${product.title} - $${product.price}\n`;
    });
    productList += "\nTo order, reply with 'order' followed by the product number (e.g., 'order 1').";
    return productList;
  } catch (error) {
    console.error('Error in listProducts:', error);
    return "We're sorry, but we couldn't retrieve the product list at this time. Please try again later.";
  }
};

const handleOrder = async (message, userId) => {
  try {
    const orderNumber = parseInt(message.split(' ')[1]);
    if (isNaN(orderNumber)) {
      return "Invalid order number. Please try again with a valid number (e.g., 'order 1').";
    }

    const product = await Product.findOne().skip(orderNumber - 1);
    if (!product) {
      return "Product not found. Please try again with a valid product number.";
    }

    const order = new Order({
      user: userId,
      orderItems: [{
        product: product._id,
        quantity: 1,
        price: product.price
      }],
      totalPrice: product.price,
      totalPriceAfterDiscount: product.price,
      orderStatus: "Pending"
    });

    await order.save();

    return `Order placed successfully for ${product.title}. Your order ID is ${order._id}. To check status, reply with '3'.`;
  } catch (error) {
    console.error('Error in handleOrder:', error);
    return "We're sorry, but an error occurred while placing your order. Please try again later.";
  }
};

const checkOrderStatus = async (userId) => {
  try {
    const recentOrder = await Order.findOne({ user: userId }).sort({ createdAt: -1 });
    if (!recentOrder) {
      return "You have no recent orders.";
    }
    return `Your most recent order (ID: ${recentOrder._id}) status is: ${recentOrder.orderStatus}`;
  } catch (error) {
    console.error('Error in checkOrderStatus:', error);
    return "We're sorry, but we couldn't retrieve your order status at this time. Please try again later.";
  }
};

module.exports = {
  handleIncomingMessage,
  startConversation
};