 const express=require('express');
 const tourController = require('../controllers/tourController');
 const CommentRoute =require('./commentRoutes');
 
 const router = express.Router();
//  router.param('id',tourController.checkId);
router.use('/:tourId/reviews', CommentRoute);
 router.route('/top-5-cheap').get(tourController.aliasTopTours,tourController.getAllTours)
 router.route("/").get(tourController.getAllTours).post(tourController.addTour);
 router.route("/:id").get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

 module.exports= router;
 