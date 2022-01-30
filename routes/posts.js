const {getPostByQuery, getPostsByUserId, getPostById, getFollowingPosts, create, update, deletePost} = require('../controllers/posts.js'); 
const {addLike, deleteLike} = require('../controllers/likes.js')
const {addComment, deleteComment} = require('../controllers/comments.js')
const {checkUser} = require('../middlewars/users.js');
const multer = require("multer");

const upload = multer({ dest: "uploads/" });


module.exports = (app) => {
    app.use('/api/posts', checkUser)
    app.get('/api/posts/:postId', getPostById)
    app.post('/api/posts', upload.array("images"), create)
    app.put('/api/posts/:postId', getPostByQuery, update)
    app.delete('/api/posts/:postId',getPostByQuery, deletePost)
    app.get('/api/posts/:userId/profile', getPostsByUserId)
    app.get('/api/posts/feed', getFollowingPosts)
    app.post('/api/posts/:postId/likes', addLike)
    app.delete('/api/posts/:postId/likes', deleteLike)
    app.post('/api/posts/:postId/comments', addComment)
    app.delete('/api/posts/:postId/comments/:commentId', deleteComment)
}