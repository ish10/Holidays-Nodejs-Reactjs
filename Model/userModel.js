const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please tell us your name!']
    },
    email:{
        type:String,
        required:[true, 'Please provide your email'],
         unique:true ,
         lowercase:true,
         validate: [validator.isEmail, 'Please provide a valid email']
        },
    photo:String,
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
      },
    password:{
        type:String,
             required:[true, 'Please provide a password'],
             select: false
    },
    passwordconfirm:{
        type:String,
        required:[true, 'Please provide a password'],
        validate:{
            // it works only eith save and create 
            validator: function(el) {
                return el === this.password;
              },
              message: 'Passwords are not the same!'
            }
        },
        passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date


});

const User = mongoose.model('User',userSchema);
module.exports = User;

// const mongoose = require('mongoose');


// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please tell us your name!']
//   },
//   email: {
//     type: String,
//     required: [true, 'Please provide your email'],
//     unique: true,
//     lowercase: true,
   
//   },
//   photo: String,
//   role: {
//     type: String,
//     enum: ['user', 'guide', 'lead-guide', 'admin'],
//     default: 'user'
//   },
//   password: {
//     type: String,
//     required: [true, 'Please provide a password'],
    
//     select: false
//   },
//   passwordconfirm: {
//     type: String,
//     required: [true, 'Please confirm your password'],
    
//   },
//   passwordChangedAt: Date,
//   passwordResetToken: String,
//   passwordResetExpires: Date
 
// });



// const User = mongoose.model('User', userSchema);

// module.exports = User;
