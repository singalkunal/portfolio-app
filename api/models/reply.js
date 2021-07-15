const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    text: {
        type: String,
        minLenght: 1
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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

module.exports = mongoose.model('Reply', replySchema);