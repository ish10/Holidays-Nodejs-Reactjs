const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review can not be empty!']
      },
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a tour.']
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
      }
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
) ;


const Comment = mongoose.model('Comment',commentSchema);
module.exports=Comment;