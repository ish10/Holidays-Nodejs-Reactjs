const User = require('../Model/userModel');
const jwt = require('jsonwebtoken');
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
exports.addUser= async (req,res)=>{
try{

    const newUser = await User.create(req.body);
      console.log(newUser);
      createSendToken(newUser, 201, res);
    }
    //  
      catch(err){
        
      }
   
};



exports.getAlluser=async (req,res)=>{

    const users = await User.find();
   res.status(500).json({
       state:"Success",
       data:{
           users
       }
   });
};
exports.updateUser=(req,res)=>{
   res.status(500).json({
       state:"error",
       data:{
           message:"not defined yet"
       }
   });
};
exports.deleteUser=(req,res)=>{
   res.status(500).json({
       state:"error",
       data:{
           message:"not defined yet"
       }
   });
};
exports.getUser=(req,res)=>{
   res.status(500).json({
       state:"error",
       data:{
           message:"not defined yet"
       }
   });
};


