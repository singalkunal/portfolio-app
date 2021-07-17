const express = require('express');
const BadRequestError = require('../../errors/bad-request-error');

const currentUser = require('../../middlewares/current-user');
const RequireAuth = require('../../middlewares/require-auth');

const User = require('../../models/user');
const Comment = require('../../models/comment');
const Post = require('../../models/post');


const router = express.Router();

router.get('/api/users/currentuser', 
currentUser,
(req, res) => {
    res.send(req.currentUser || null);
});

router.get('/api/users/currentuser/details',
currentUser,
RequireAuth,
async (req, res) => {
    const user = await User.findById(req.currentUser._id).exec();
    
    if(!user) {
        throw new BadRequestError('Requested user deatils can\'t be found...', 404);
    }

    try {
        res.json({viewCount: 0, user});
    }
    catch(err) {
        console.log(err);
        throw new BadRequestError('Server error...');
    }


});

router.delete('/api/users/currentuser/delete',
currentUser,
RequireAuth,
async (req, res) => {
    try {
        
        const userId = req.currentUser._id;
        const comments = await Comment.find({commentedBy: userId}).select('_id');

        // update posts
        const posts = await Post.updateMany({},
            {
                $pullAll: {comments: comments},
                $pullAll: {likes: [userId]}
            },
        );

        await Post.updateMany({}, [
            {
                $set: {
                    likesCount: {$size: "$likes"}, 
                    commentsCount: {$size: "$comments"
                }}
            }
        ]);


        // update comments
        await Comment.updateMany({}, {
            $pull: {replies: {repliedBy: userId}},
            $pullAll: {likes: [userId]}
        });

        await Comment.updateMany({}, [
            {
                $set: {
                    likesCount: {$size: "$likes"},
                    repliedCount: {$size: "$replies"}
                }
            }
        ]);

        await Comment.deleteMany({_id: {$in: comments}}).exec();
        await User.findByIdAndDelete(req.currentUser._id).exec();

        req.session = null;
        res.status(200).send(true);
    }
    catch(err) {
        console.log(err);
        throw new BadRequestError('Error deleting user...', 500);
    }
});

router.get('/api/users/opensocket',
currentUser,
RequireAuth,
async (req, res) => {
    res.status(200).send({jwt: req.session.jwt});
    
});

module.exports = router;