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
  const twiml = new twilio.twiml.MessagingResponse();
  
  try {
    console.log('Incoming message:', req.body);
    const { Body, From } = req.body;
    
    if (!Body || !From) {
      console.error('Missing Body or From in the request');
      twiml.message('Invalid request. Please try again.');
      return res.status(200).send(twiml.toString());
    }

    console.log('From:', From);
    const userPhoneNumber = From.replace('whatsapp:', '');
    let user = await User.findOne({ mobile: userPhoneNumber });
    
    if (!user) {
      console.log(`New user detected: ${userPhoneNumber}`);
      twiml.message('Welcome! You are a new user. Please register first.');
      return res.status(200).send(twiml.toString());
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

    twiml.message(responseMessage);
  } catch (error) {
    console.error('Error in handleIncomingMessage:', error);
    twiml.message('An error occurred. Please try again later.');
  }

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
};

// ... (keep the rest of your functions as they are)

module.exports = {
  handleIncomingMessage,
  startConversation
};