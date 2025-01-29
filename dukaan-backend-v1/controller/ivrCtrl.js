// ivrController.js

const twilio = require('twilio');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const welcomeMessage = "Welcome to our WhatsApp shopping experience! Here are your options:\n1. View Products\n2. Place an Order\n3. Check Order Status\n4. Contact Support";

const handleIncomingMessage = async (body, twiml) => {
  const { Body, From } = body;
  const userPhoneNumber = From.replace('whatsapp:', '');

  let user = await User.findOne({ phone: userPhoneNumber });
  if (!user) {
    user = await User.create({ phone: userPhoneNumber });
  }

  let responseMessage = '';

  switch (Body.toLowerCase()) {
    case '1':
      responseMessage = await listProducts();
      break;
    case '2':
      responseMessage = "Great! Let's start your order. Please reply with the product number you'd like to order.";
      break;
    case '3':
      responseMessage = await checkOrderStatus(user._id);
      break;
    case '4':
      responseMessage = "Our support team will contact you shortly. Thank you for your patience!";
      break;
    default:
      if (Body.startsWith('order')) {
        responseMessage = await handleOrder(Body, user._id);
      } else {
        responseMessage = welcomeMessage;
      }
  }

  twiml.message(responseMessage);
};

const startConversation = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    await client.messages.create({
      from: 'whatsapp:+14155238886',
      body: welcomeMessage,
      to: `whatsapp:${phoneNumber}`
    });
    res.status(200).json({ message: 'WhatsApp conversation started successfully' });
  } catch (error) {
    console.error('Error starting WhatsApp conversation:', error);
    res.status(500).json({ error: 'Failed to start WhatsApp conversation' });
  }
};

// ... (keep the other functions like listProducts, handleOrder, checkOrderStatus)

module.exports = {
  handleIncomingMessage,
  startConversation
};