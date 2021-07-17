const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {   // this will contain post (portfolio)
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    likesCount: {
        type: Number,
        default: 0
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    commentsCount: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],

    createdAt: Number,
    updatedAt: Number,
},
{
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
},
{
    toJSON: {
        versionKey: false
    }
})

module.exports = mongoose.model('Post', postSchema);
