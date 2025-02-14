const express = require('express');
const reviewController =  require('./../controllers/reviewController');
const authController = require('./../controllers/authController');


const router = express.Router({mergeParams:true});

//POST /tour/120911/reviews
//Get /tour/23232323/reviews
//GET /tour/23232/reviews/9593434//


router
.route('/')
.get(reviewController.getAllReviews)
.post(
    authController.protect ,
     authController.restrictTo('user') ,
     reviewController.setTourUserIds,
     reviewController.createReview);

router
.route('/:id')
.get(reviewController.getReview)
.patch(reviewController.updateReview)
.delete(reviewController.deleteReview);

module.exports = router;