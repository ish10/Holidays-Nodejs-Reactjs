const express = require('express');
const morgan = require('morgan');
const app= new express();
const TourRoute =require('./routes/TourRoutes');
const UserRoute =require('./routes/UserRoutes');
const CommentRoute =require('./routes/commentRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');



// allow cors origin requests

app.use(cors());

const fs = require('fs');
if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'));
}
app.use(express.json());
app.use(cookieParser());
app.use((req,res,next)=>{
req.reqTime = new Date().toISOString();
next();
});




 
// user functions


// app.get("/api/v1/tours",getAllTours);

// app.get("/api/v1/tours/:id",getTour);

// app.post("/api/v1/tours",addTour);
// app.patch("/api/v1/tours/:id", updateTour);

// app.delete("/api/v1/tours/:id",deleteTour);








app.use("/api/v1/tours",TourRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/comment", CommentRoute);
module.exports= app;