const faker = require('faker');
const mongoose = require('mongoose');

// importing models
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

const num_users = 10;
const numCommentsByEachUser = 5;
const numRepliesByEachUser = 5;
const numPostLikesByEachUser = 5;
const numCommentLikesByEachUser = 5;

const { 
        internet, 
        name,
        random,
        image,
        lorem,
        system,
        date,
    } = faker;

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max -min+1) + min);
}

const createArray = (num_elems, fun) => {
    return Array.from({length: num_elems}, fun);
}

const createUser = () => {
    return new User({
        username: internet.userName(),
        email: internet.email(),
        password: '12345678',
        active: true,
        portfolio: {
            about: {
                firstname: name.firstName(),
                lastname: name.lastName(),
                img_url: image.imageUrl(),
                desc: lorem.lines(getRandomInt(2, 5)),
                profile_links: createArray(getRandomInt(1, 6), () => {
                    return {
                        title: name.title(),
                        link: internet.url(),
                        icon_url: image.imageUrl(),
                        filename: system.fileName()
                    }
                })
            },
            experiences: createArray(getRandomInt(2, 5), () => {
                return {
                    title: name.jobTitle(),
                    brief: lorem.lines(getRandomInt(1, 5)),
                    detail: lorem.lines(getRandomInt(10, 30)),
                    tags: createArray(getRandomInt(3, 6), () => {
                        return {
                            tag: name.title()
                        }
                    }),
                    additional_tags: createArray(getRandomInt(3, 12), () => {
                        return {
                            tag: name.title()
                        }
                    }),
                    img_url: createArray(getRandomInt(1, 2), () => image.imageUrl()),
                    external_links: createArray(getRandomInt(0, 4), () => {
                        return {
                            title: name.title(),
                            link: internet.url(),
                            icon_url: image.imageUrl(),
                            filename: system.fileName()
                        }
                    })
                }
            }),
            skills: createArray(getRandomInt(2, 10), () => {
                return {
                    domain: name.jobArea(),
                    relatedSkills: createArray(getRandomInt(2, 10), () => {
                        return {
                            skill: name.jobTitle()
                        }
                    })
                }
            }),
            postedAt: date.between('2015-01-01', '2015-01-05')
        }
    });
};


// 
const generatePosts = async  () => {
    const users = createArray(num_users, createUser);
    for(let user of users) {
        const userRef = await user.save();
        
        var post = new Post({
            user: userRef._id,
        });

        post = await post.save();

        user.portfolio.postId = post._id;
    }
}

const getComment = (user, post) => {
    return new Comment({
        text: lorem.lines(getRandomInt(1, 3)),
        commentedBy: user,
        commentedOn: post,
    })
}

const getReply = (user) => {
    return {
        text: lorem.lines(getRandomInt(1, 3)),
        repliedBy: user
    }
}

const getSocial = async () => {
    const users = await User.find().exec();
    const posts = await Post.find().exec();

    var comments = [];

    // comment on random posts
    for(let user of users) {
        

        var commented = numCommentsByEachUser;
        
        while (commented > 0) {
            var i = getRandomInt(0, posts.length-1);
            while(user.portfolio.postId === posts[i]._id) {
                i = getRandomInt(0, posts.length-1);
                
            }

            
            // 
            comments.push(getComment(user._id, posts[i]._id));
            posts[i].commentsCount += 1;
            posts[i].comments.push(user._id);

            posts[i].likesCount += 1;
            posts[i].likes.push(user._id);

            commented--;
        }

    }

    

    for(let user of users) {
        var replied = numRepliesByEachUser;
        while(replied>0) {
            var i = getRandomInt(0, comments.length-1);
            while(user._id === comments[i].commentedBy) {
                i = getRandomInt(0, comments.length-1);
            }

            comments[i].repliesCount += 1;
            comments[i].replies.push(getReply(user._id));
            comments[i].likesCount += 1;
            comments[i].likes.push(user._id);

            replied--;
        }
    }

    for(comment of comments) {
        await comment.save();
    }
    for(let post of posts) {
        await post.save();
    }
}

const fun = async () => {
    const posts = await Post.find().exec();
    for(post of posts) {
        
        
        const result = await User.updateOne(
            {_id: post.user},
            {'portfolio.post': post._id}
        ).exec();



        
    }
}


const fun2 = async () => {
    const comments = await Comment.find().exec();
    const posts = await Post.find().exec();

    for(let post of posts) {
        post.comments = [];
        await post.save();
    }

    for(let comment of comments) {
        const post = await Post.findById(comment.commentedOn).exec();
        if(!post) {
            
        }
        post.comments.push(comment._id);
        await post.save();
    }
}




const MONGO_URI=process.env.MONGO_URI;
const connect = async () => {
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });

    

    // clear previous data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    await generatePosts();
    await getSocial();
    await fun();

    await fun2();
}

connect();
