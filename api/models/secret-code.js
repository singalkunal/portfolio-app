const mongoose = require('mongoose');

const secretCode = new mongoose.Schema({
//     hash: (128 bit),
//     userId,
//     email,
//     password,
// expiresAt: Date

    code: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    expiresAt: {
        type: Date
    }
});

secretCode.pre('save', function(next) {
    const mins = 30
    const now = new Date()
    this.expiresAt = new Date(now.getTime() + mins * 60 * 1000);
    next();
});

module.exports = mongoose.model('SecretCode', secretCode);