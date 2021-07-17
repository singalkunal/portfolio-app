const mongoose = require('mongoose');
const validator = require('validator');

const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

exports.postComment = async (user, postId, comment) => {
    // validation
    if(!postId) {
        throw new Error('must provide post');
    }

    if(validator.isEmpty(comment)) {
        throw new Error('comment can\'t be empty');
    }

    try {
    
        var post = await Post.findById(postId).exec();

        const newComment = new Comment({
            commentedBy: user._id,
            commentedOn: post._id,
            text: comment
        });

        const commentRef = await newComment.save();
        post.comments.push(commentRef._id);
        post.commentsCount += 1;

        post = await post.save();
        return commentRef._doc;

    }
    catch(err) {
        throw new Error('unable to fetch post');
    }

    
}

exports.updateComment = (user, commentId) => {
    
}

exports.deleteComment = async (user, commentId) => {
    // validation
    if(!commentId) {
        throw new Error('must provide post');
    }

    var comment = await Comment.findOneAndDelete({_id: commentId, commentedBy: user._id}).exec();

    // if(comment.commentedBy.toString() !== user._id) {
    //     throw new Error('user don\'t have permission to delete this comment')
    // }

    

    if(comment) {
        const result = await Post.updateOne(
            {_id: comment.commentedOn}, 
            {
                $pullAll: {comments: [commentId]},
                $inc: {commentsCount: -1}
            }

        );
    }

    return comment;
}

exports.toggleLikeComment = async (user, commentId) => {
    // validation
    if(!commentId) {
        throw new Error('must provide post');
    }

    const result = await Comment.updateOne(
        {
            _id: commentId,
            likes: {$ne: user._id} // user._id is not in likedBy
        },
        {
            $inc: {
                likesCount: 1
            },
            $push: {
                likes: user._id
            }
        }
    ).exec();

    // if like was already there -> unlike now
    if(!result.nModified) {
        await Comment.updateOne(
            {
                _id: commentId
            },
            {
                $inc: {
                    likesCount: -1
                },
                $pullAll: {
                    likes: [user._id]
                }
            }
        ).exec();

        return -1;
    }

    return 1;

}

exports.replyComment = async (user, commentId, reply) => {
    // validation
    if(!commentId) {
        throw new Error('must provide post');
    }

    if(validator.isEmpty(reply)) {
        throw new Error('comment can\'t be empty');
    }

    const comment = await Comment.findById(commentId).exec();
    const id = mongoose.Types.ObjectId();

    comment.repliesCount += 1;
    const res = {
        _id: id,
        text: reply,
        repliedBy: user._id
    };

    comment.replies.push(res);

    const commentRef = await comment.save();

    return res;    
}

module.exports = exports;