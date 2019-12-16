const mongoose = require('mongoose');

const userSessionSchema = new mongoose.Schema({

    userId: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        default: ''
    }

});

module.exports = mongoose.model('userSession', userSessionSchema);

