const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    }
});

module.exports.Movie = mongoose.model('Movie', MovieSchema);
