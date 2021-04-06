 const express=require('express');
 const tourController = require('../controllers/tourController');
 const CommentRoute =require('./commentRoutes');
 const Authorization = require('../controllers/authController');
 
 const router = express.Router();
//  router.param('id',tourController.checkId);
router.use('/:tourid/reviews', CommentRoute);
 router.route('/top-5-cheap').get(tourController.aliasTopTours,tourController.getAllTours)
 router.route("/").get(Authorization.protect,tourController.getAllTours).post(tourController.addTour);
 router.route("/:id").get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

 module.exports= router;
 