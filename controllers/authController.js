const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');
exports.protect = async (req, res, next) => {
    // 1) Getting token and check of it's there
    console.log(req.headers.authorization);
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      res.status(401).json({status:"error"
    });
      
    }
  
    // 2) Verification token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({status:"error"
    });
    }
  
    
    req.user = currentUser;
    next();
  };
  
  exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      // roles ['admin', 'lead-guide']. role='user'
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({status:"error"
    });
      }
  
      next();
    };
  };