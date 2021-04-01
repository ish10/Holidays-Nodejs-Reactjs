const fs = require ('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
exports.addUser=(req,res)=>{
    res.status(500).json({
        state:"error",
        data:{
            message:"not defined yet"
        }
    });
};

exports.getAlluser=(req,res)=>{
   res.status(500).json({
       state:"error",
       data:{
           message:"not defined yet"
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