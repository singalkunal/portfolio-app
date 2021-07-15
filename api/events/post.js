const postController = require('../controllers/post');

module.exports = (io, socket) => {
    // socket.on('post-post', () => {
    //     postController.postPost
    // });

    socket.on('toggle-like-post', async (postId, cb) => {
        try {
            const user = socket.request.currentUser;
            const like = await postController.toggleLikePost(user, postId);
            io.emit('toggle-like-post', {like, userId: user._id, postId})
        }
        catch(err) {
            console.log(err);
            cb(false);
        }
    });

   
}