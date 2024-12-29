const jwt = require('jsonwebtoken');
const User = require('./models/User');

// Middleware to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); // Add user to request object
    if (!req.user) return res.status(404).json({ message: 'User not found' });

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  };
  
  const isSeller = (req, res, next) => {
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Access denied: Sellers only' });
    }
    next();
  };

  const isSupplier = (req, res, next) => {
    if (req.user.role !== 'supplier') {
      return res.status(403).json({ message: 'Access denied: Suppliers only' });
    }
    next();
  };

  const isBuyer = (req, res, next) => {
    if (req.user.role !== 'buyer') {
      return res.status(403).json({ message: 'Access denied: Buyers only' });
    }
    next();
  };
  
    module.exports = { isAuthenticated, isAdmin, isSeller, isSupplier, isBuyer };