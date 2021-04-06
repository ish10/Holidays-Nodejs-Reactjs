const express= require('express');
const tourController = require('../controllers/tourController');
const commentController = require('../controllers/commentscontroller');
const router = express.Router({ mergeParams: true });
router.route("/").get(commentController.getallcomments).post(commentController.addcomment);
 router.route("/:id").get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);
module.exports=router;