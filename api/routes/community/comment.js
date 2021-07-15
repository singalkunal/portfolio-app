const express = require('express');
const mongoose = require('mongoose');

const { body, param } = require('express-validator');

const Comment = require('../../models/comment');
const Post = require('../../models/post');

const currentUser = require('../../middlewares/current-user');
const RequireAuth = require('../../middlewares/require-auth');
const BadRequestError = require('../../errors/bad-request-error');
const validateRequest = require('../../middlewares/validate-request');

const router = express.Router();

router.get('/api/comments/:postId',
param('postId')
.exists(),
currentUser,
RequireAuth,
async (req, res) => {
    const { postId } = req.params;
    const userId = req.currentUser._id;
    console.log(postId);
    console.log(userId);
    try {
        var comments = await Post.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(postId)}
            },
            {
                $project: {
                    "tempRoot.comment": "$comments",
                }
            },
            {
                $replaceRoot: {newRoot: '$tempRoot'}
            },

            {
                $lookup: {
                    from: 'comments',
                    localField: 'comment',
                    foreignField: '_id',
                    as: 'comment'  // because later unwinding each comment into separate documents
                }
            },
            {
                $unwind: "$comment"
            },
            {
                $replaceRoot: {newRoot: '$comment'}
            }, 
            // now we have array of comments at this stage
            {
                $set: {
                    'liked': {$in: [mongoose.Types.ObjectId(userId), '$likes']}
                }
            }

        ]).exec();

        comments = await Comment.populate(comments, {
            path: "commentedBy",
            select: "username",
        });

        comments = await Comment.populate(comments,
        {
            path: "replies.repliedBy",
            select: 'username'
        });
        res.status(200).json({comments});
    }
    catch(err) {
        console.log(err);
        throw new BadRequestError('Unable to get comments ');
    }

});


router.post('/api/comment/add/:postId',
param('postId')
.exists()
.custom((value, { req }) => {
    return Post.findById(value).exec()
    .then(post => {
        if(!post) {
            return Promise.reject('Can\'t find post');
        }

        req.body.post = post;
    })
})
.withMessage('Can\'t find post')
,
body('comment')
.exists()
.isLength({min: 1})
.withMessage('Comment can\'t be empty')
,validateRequest,
currentUser,
RequireAuth,
async(req, res) => {
    const { post, comment } = req.body;
    const id = req.currentUser._id;

    const newComment = new Comment({
        commentedBy: id,
        postId: post._id,
        text: comment
    });

    const commentRef = await newComment.save();
    post.comments.push(commentRef._id);
    post.commentsCount += 1;

    await post.save();
    res.status(201).json({comment: commentRef});
});



router.put('/api/comment/update/:commentId',
currentUser,
RequireAuth,
param('commentId')
.exists()
.custom((value, {req}) => {
    return Comment.findById(value).then(comment => {
        if(!comment) {
            return Promise.reject('Comment not found');
        }
        req.body.oldComment = comment;
    })
}),
body('comment')
.exists()
.isLength({min: 1})
.withMessage('Must provide updated comment')
,
validateRequest,
async(req, res) => {
   var { oldComment, comment } = req.body;
   
   if(oldComment.commentedBy.toString() !== req.currentUser._id) {
       throw new BadRequestError('user don\'t have permission to edit this comment', 403);
   }

   oldComment.text = comment;
   try {
       comment = await oldComment.save();
       res.status(200).json({comment});
   }
   catch(err) {
       console.log(err);
       throw new BadRequestError('Can\'t update comment');
   }

});

router.delete('/api/comment/delete/:commentId',
currentUser,
RequireAuth,
param('commentId')
.exists(),
async (req, res) => {
    const { commentId } = req.params;
    try {
        const comment = await Comment.findByIdAndDelete(commentId).exec();

        if(comment.commentedBy.toString() !== req.currentUser._id) {
            throw new BadRequestError('user don\'t have permission to delete this comment', 403)
        }

        const result = await Post.updateOne(
            {_id: comment.commentedOn}, 
            {$pullAll: {comments: [commentId]}}
        );

        res.status(200).json(comment);
    }
    catch(err) {
        console.log(err);
        throw new BadRequestError('Unable to delete comment');
    }
});

// toggles like/unlike on comment
router.put('/api/comment/like/:commentId', 
currentUser,
RequireAuth,
param('commentId')
.exists(),
validateRequest,
async (req, res) => {
    const { commentId } = req.params;
    const userId = req.currentUser._id;
    try {
        const result = await Comment.updateOne(
            {
                _id: commentId,
                likes: {$ne: userId} // userId is not in likedBy
            },
            {
                $inc: {
                    likesCount: 1
                },
                $push: {
                    likes: userId
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
                        likes: [userId]
                    }
                }
            ).exec();

            return res.status(200).json({likes: -1})
        }

        res.status(200).json({likes: 1});
    }
    catch(err) {
        console.log(err);
        throw new BadRequestError('Unable to process like...');
    }

    
});

router.post('/api/comment/reply/:commentId',
currentUser,
RequireAuth,
param('commentId')
.exists(),
body('reply')
.exists()
.isLength({min: 1})
.withMessage('Reply can\'t be empty')
,
validateRequest,
async (req, res) => {
    const { commentId } = req.params;
    const { reply } = req.body;
    const userId = req.currentUser._id;

    var result = await Comment.updateOne(
        {_id: commentId},
        {
            $inc: {
                repliesCount: 1
            },
            $push: {
                replies: {
                    text: reply,
                    repliedBy: userId
                }
            }
        }
    ).exec();

    if(result.nModified > 0) {
        return res.status(201).json({reply});
    }
});

module.exports = router;
