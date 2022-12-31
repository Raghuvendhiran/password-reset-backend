const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        trim: true,
        required: true
    },
    Email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        trim: true,
        required: true
    }

});

module.exports = mongoose.model("ResetPassword", userSchema);


