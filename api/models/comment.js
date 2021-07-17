const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        minLength: 1
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    commentedOn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likesCount: {
        type: Number,
        default: 0
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    repliesCount: {
        type: Number,
        default: 0
    },
    replies: [{
        text: {
            type: String,
            minLength: 1
        },
        repliedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    createdAt: Number,
    updatedAt: Number,
},
{
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
},
{
    toJSON: {
        // transform(doc, ret) {
        //     ret.id = ret._id;
        //     delete ret._id;
        // },

        versionKey: false
    }
});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

