
const Tour = require('../Model/tourModel');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req,res)=>{
  try {
    
    console.log(req.query);
    const queryobj ={...req.query};
    console.log(queryobj);
    const elements= ['page', 'sort', 'limit', 'fields'];
      elements.forEach(el=> delete queryobj[el]);
      console.log(queryobj);
      let queryStr = JSON.stringify(queryobj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
      console.log(JSON.parse(queryStr));
                query= Tour.find(JSON.parse(queryStr));

               if (req.query.sort){
                 const sortBy =req.query.sort.split(',').join(' ');
                        query = query.sort(sortBy);
               }
               else{
                query = query.sort('-createdAt');
               }

               if(req.query.fields){
                 const reqfields =req.query.fields.split(',').join(' ');
                 query = query.select(reqfields);
               }
               else{
               query  = query.select('-__v');
               }
               const page = req.query.page * 1 || 1;
               const limit = req.query.limit * 1 || 100;
               const skip = (page - 1) * limit;
           
               query = query.skip(skip).limit(limit);
             const tours = await query;
    res.status(200).json({
        status: "success",
        time : req.reqTime,
        data:{
            tours
        }
        
        });
  } catch(err){
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }

    };
    // middleware for checking if body is empty or not before mongoose
    // exports.check=(req,res,next)=>{
    //     if(!req.body.name  || !req.body.price){
    //       return res.status(400).json({
    //            status: "error"
    //        })
    //     }
    //     next();
    // };
    // to check if param is valid or not
//    exports.checkId=(req,res,next,value)=>{
//     if (value * 1 > tours.length) {
//         return res.status(404).json({
//           status: 'fail',
//           message: 'Invalid ID'
//         });
//       }
//   next();
//  };


    exports.getTour=async(req,res)=>{
      try{ 
        const tour = await Tour.findById(req.params.id).populate('comments');
                 
                  
        
        res.status(200).json({
       status:"success",
       data:{
        tour
       }
        });
      }catch(err){
        res.status(404).json({
          status: 'fail',
          message: err
        });
      }
       
      };

   exports.addTour = async(req,res)=>{
     try{
      const newtour = await Tour.create(req.body);
      res.status(201).json({
          status: 'success',
          data: {
            tour: newtour }
            }  );
     }
   catch(err){
    res.status(404).json({
      status: 'fail',
      message: err
    });
   }
};
  exports.updateTour =async(req,res)=>{
    try{
      const updated = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
    status:"success",
    data:{
        value:updated
    }
    
    });
  }
    catch(err){
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
    
    };
    exports.deleteTour= async(req,res)=>{
      try{ const result = await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status:'sucess',
           data:null
        });}
     catch(err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
     }
    };