const mongoose = require('mongoose');
const validator = require('validator');

const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

// returns post/posts
// if fetchAll===true => get all posts
// else get postId post only
exports.getPost = async (user, postId=null, fetchAll=true) => {
    try {
        var posts = await Post
                .aggregate([{
                        $set: {
                            dummy: true
                        }
                    },

                    {
                        $match: {$or: [{dummy: fetchAll}, {_id: mongoose.Types.ObjectId(postId)}]}
                    },
                    {
                        $set: {
                            'liked': {$in: [mongoose.Types.ObjectId(user._id), '$likes']}
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
                        $unwind: "$user"
                    },

                    {
                        $set: {
                            'desc': "$user.portfolio.about.desc",
                            'img_url': "$user.portfolio.about.img_url"
                        }
                    },
                    {
                        $project: {
                            "user.email": 0,
                            "user.password": 0,
                            "user.portfolio": 0,
                        }
                    },
                ])
                .exec();

            return posts;
                
    }

    catch(err) {
        console.log(err);
        throw new Error('Unable to fetch posts');
    }
}

exports.postPost = (user) => {

}

exports.toggleLikePost = async (user, postId) => {
    // validation
    if(!postId) {
        throw new Error('must provide post');
    }

    var result = await Post.updateOne(
        {
            _id: postId,
            likes: {$ne: user._id} // userId is not in likedBy
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
        result = await Post.updateOne(
            {
                _id: postId
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


module.exports = exports;