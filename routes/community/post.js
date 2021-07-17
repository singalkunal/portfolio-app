const express = require('express');
const mongoose = require('mongoose');
const { body, param } = require('express-validator');

const Post = require('../../models/post');

const currentUser = require('../../middlewares/current-user');
const RequireAuth = require('../../middlewares/require-auth');
const BadRequestError = require('../../errors/bad-request-error');

const router = express.Router();

// post portfolio as a new post (if not already exists) on community page
router.post('/api/portfolio/post',
currentUser,
RequireAuth,
async (req, res) => {
    const id = req.currentUser._id;
    var post = await Post.findOne({user: id}).exec();

    if(post) {
        throw new BadRequestError('Already posted...', 400);
    }

    post = new Post({
        user: id
    });

    post = await post.save();

    res.status(201).json({post});
    
});

router.put("/api/post/like/:postId", 
currentUser,
RequireAuth,
param('postId')
.exists(),
async (req, res) => {
    const { postId } = req.params;
    const userId = req.currentUser._id;
    try {
        var result = await Post.updateOne(
            {
                _id: postId,
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
            result = await Post.updateOne(
                {
                    _id: postId
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

router.get('/api/post/get',
currentUser,
RequireAuth,
async (req, res) => {
    const userId = req.currentUser._id;

    try {
        var posts = await Post
                .aggregate([
                    {
                        $set: {
                            'liked': {$in: [mongoose.Types.ObjectId(userId), '$likes']}
                        }
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'user',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    {
                        $unwind: "$user" // lookup returns array - unwind will extract it into object
                    },

                    {
                        $set: {
                            'desc': "$user.portfolio.about.desc",
                            'img_url': "$user.portfolio.about.img_url",
                            'profile_links': "$user.portfolio.about.profile_links",
                            'name': {$concat: ["$user.portfolio.about.firstname", " ", "$user.portfolio.about.lastname"]}
                        }
                    },
                    {
                        $project: {
                            "user.email": 0,
                            "user.password": 0,
                            "user.portfolio": 0,
                        }
                    },
                    {
                        $sort: { createdAt: -1 }
                    }
                ])
                .exec();
                
        res.status(200).json({posts});
    }

    catch(err) {
        console.log(err);
        throw new BadRequestError('Unable to fetch posts');
    }
});

module.exports = router;