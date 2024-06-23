const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieId: {
        type : Number, 
        required:true
    },
    sentiment:{
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

module.exports.Review = mongoose.model('Review', ReviewSchema);
