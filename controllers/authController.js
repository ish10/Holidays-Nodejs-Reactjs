const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
    res.cookie('jwt', token, cookieOptions);
  
    // Remove password from output
    user.password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  };
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

  exports.login =async (req,res,next)=>{

    const{email, password} = req.body;
      
    if(!email ||!password){
        res.status(401).json({
            status:"error",
            message:"missing mail or password"
        
        
        
        });
    }
         const userdetail = await User.findOne({email}).select('+password');
         console.log(userdetail);
         if (!userdetail || !(await userdetail.correctPassword(password, userdetail.password))) {
            res.status(401).json({
                status:"error",
            message:"wrong mail or password"
            })
          }

          createSendToken(userdetail, 200, res);
  };

