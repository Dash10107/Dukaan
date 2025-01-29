// WhatsAppShopping.js

import React, { useState } from 'react';
import axios from 'axios';
import {QRCodeCanvas} from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const WhatsAppShopping = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const whatsappNumber = '+14155238886'; // Your Twilio WhatsApp number

  const startWhatsAppConversation = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post('/api/ivr/start-conversation', { phoneNumber });
      setSuccess(true);
    } catch (error) {
      console.error('Error starting WhatsApp conversation:', error);
      setError('Failed to start WhatsApp conversation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 bg-green-500 text-white rounded-full p-4 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <FaWhatsapp size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 bg-white rounded-lg shadow-xl p-6 w-80"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4">Shop via WhatsApp</h2>
            <div className="flex flex-col items-center mb-4">
              <QRCodeCanvas value={`https://wa.me/${whatsappNumber}?text=Start%20shopping`} size={150} />
              <p className="text-sm text-gray-600 mt-2">Scan to start shopping</p>
            </div>
            <form onSubmit={startWhatsAppConversation} className="space-y-4">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 disabled:bg-gray-400"
              >
                {isLoading ? 'Starting...' : 'Start WhatsApp Shopping'}
              </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mt-2">
                Check your WhatsApp for a message from our shopping bot!
              </p>
            )}
            <div className="mt-4 bg-gray-100 p-3 rounded-md">
              <h3 className="font-semibold mb-2">How to shop:</h3>
              <ol className="text-sm list-decimal list-inside space-y-1">
                <li>Scan QR or enter your number</li>
                <li>Receive a welcome message</li>
                <li>Reply with your choice</li>
                <li>Follow prompts to shop</li>
                <li>Check order status anytime</li>
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppShopping;