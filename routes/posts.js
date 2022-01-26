const {getPostByQuery, getPostsByUserId, getPostById, getFollowingPosts, create, update, deletePost} = require('../controllers/posts.js'); 
const {addLike, deleteLike} = require('../controllers/likes.js')
const {addComment, deleteComment} = require('../controllers/comments.js')
const {checkUser} = require('../middlewars/users.js');
const multer = require("multer");

const upload = multer({ dest: "uploads/" });


module.exports = (app) => {
    app.use('/api/posts', checkUser)
    app.get('/api/posts/:userId/profile', getPostsByUserId)
    //app.get('/api/profile', getPostsByUserId)
    app.get('/api/posts/feed', getFollowingPosts)
    //app.get('/api/feed', getFollowingPosts)
    app.get('/api/posts/:postId', getPostById)
    app.post('/api/posts/add_post', upload.array("images"), create)
    //app.post('/api/posts/:postId', upload.array("images"), create)
    app.post('/api/posts/:postId/like', addLike)
    //app.post('/api/posts/:postId/likes/:likeId', addLike)
    app.post('/api/posts/:postId/add_comment', addComment)
    //app.post('/api/posts/:postId/comments/:commentId', addComment)
    app.delete('/api/posts/:postId/unlike', deleteLike)
    //app.delete('/api/posts/:postId/likes/likeId', deleteLike)
    app.delete('/api/posts/:commentId/delete_comment', deleteComment)
    //app.delete('/api/posts/:postId/comments/:commentId', deleteComment)
    app.put('/api/posts/:postId/update_post', getPostByQuery, update)
    //app.put('/api/posts/:postId', getPostByQuery, update)
    app.put('/api/posts/:postId/delete',getPostByQuery, deletePost)
    //app.delete('/api/posts/:postId',getPostByQuery, deletePost)
}