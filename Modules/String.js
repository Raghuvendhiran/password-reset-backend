const mongoose = require('mongoose');

const StringSchema = new mongoose.Schema({
    String: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        trim: true,
        unique: true
    }
});

module.exports = mongoose.model("String", StringSchema);


