const Comment = require('../Model/commentModel');

exports.getallcomments=async(req,res)=>{
     const comments = await Comment.find();
     res.status(200).json({
         status:"success",
         data:{
            comments
         }
     });
    };
exports.addcomment =async(req,res)=>{
    const comment = await Comment.create(req.body);
    res.status(201).json(
        {
            status:"success",
            data:{comment}
        }
    )
}