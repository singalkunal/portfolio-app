const commentController = require('../controllers/comment');

module.exports = (io, socket) => {
    socket.on('post-comment', async (postId, comment, cb) => {
        try {
            const user = socket.request.currentUser;
            const postedComment = await commentController.postComment(user, postId, comment);
            io.emit('post-comment', 
                    {
                        comment: {
                            ...postedComment,
                            commentedBy: {
                                _id: user._id,
                                username: user.username
                            },
                            liked: false
                        }
                    });
            cb(true);
        }
        catch(err) {
            // console.log(err);
            cb(false);
        }
    });

    // socket.on('update-comment', commentController.updateComment);

    socket.on('delete-comment', async (commentId, cb) => {
        try {
            const user = socket.request.currentUser;
            const comment = await commentController.deleteComment(user, commentId);

            io.emit('delete-comment', {comment})
            cb(true);
        }
        catch(err) {
            console.log(err);
            cb(false);
        }
    });

    socket.on('toggle-like-comment', async (commentId, cb) => {
        try {
            const user = socket.request.currentUser;
            const like = await commentController.toggleLikeComment(user, commentId);
            io.emit('toggle-like-comment', {like, userId: user._id, commentId})
            sb(true);
        }
        catch(err) {
            console.log(err);
            cb(false);
        }
    });

    socket.on('reply-comment', async (commentId, reply, cb) => {
        try {
            const user = socket.request.currentUser;
            const postedReply = await commentController.replyComment(user, commentId, reply);

            io.emit('reply-comment', 
                    {
                        reply: {
                            ...postedReply,
                            repliedBy: {
                                _id: user._id,
                                username: user.username
                            }
                        },
                        commentId
                    });
            cb(true);
        }
        catch(err){
            console.log(err);
            cb(false);
        }
    });
}