const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, max: 50},
    lastName: {type: String, required: true, max: 50},
    userName: {type: String, required: true, max: 50},
    email: {
        type: String,
        unique: true,
        required: true,
        max: 50,
    },
    password: {type: String, required: true, max: 50},
    preferences: { type: Array, default: [] },
    likedMovies:[Number],

});


module.exports.User = mongoose.model('User', userSchema);




