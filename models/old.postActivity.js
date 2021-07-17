const mongoose = require('mongoose');

const postActivitySchema = new mongoose.Schema({
    postId: { // will be userId
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    createdAt: Number,
    updatedAt: Number
},
{
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
},
{
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            ret.id = ret._id;
            delete ret._id;
        },

        versionKey: false
    }
});

module.exports = mongoose.model('PostActivity', postActivitySchema);