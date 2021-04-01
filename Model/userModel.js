const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{type:String,
        required:true,
         unique:true ,
         lowercase:true
        },
    photo:String,
    password:{type:String,
             required:true
    },
    passwordconfirm:{type:String,
        required:true
}

});

const User = mongoose.Model('User',userSchema);
module.exports = User;