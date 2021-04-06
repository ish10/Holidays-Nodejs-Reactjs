const Comment = require('../Model/commentModel');

exports.getallcomments=async(req,res)=>{
    if (req.params.tourid)
    {
console.log(req.params.tourid)
const comments = await Comment.findOne({tour:req.params.tourid});
res.status(200).json({
    status:"successsss",
    data:{
       comments
    }
});
    }
    else{
     const comments = await Comment.find();
     res.status(200).json({
         status:"success",
         data:{
            comments
         }
     });
    }
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