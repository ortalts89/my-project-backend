const {getOne, getPostById, getPostsByUserId, getAll, getFollowingPosts, create, update, remove} = require('../controllers/posts.js'); 
const {checkUser} = require('../middlewars/users.js');
const multer = require("multer");

const upload = multer({ dest: "uploads/" });


module.exports = (app) => {
    app.use('/api/posts', checkUser)
    app.get('/api/posts/:userId', getPostsByUserId)
    app.get('/api/posts', getAll)
    app.get('/api/feed', checkUser, getFollowingPosts)
    app.get('/api/posts/:postId', getPostById, getOne)
    app.post('/api/posts/add_post', upload.array("images"), create)
    app.post('/api/posts/:postId/update_post', getPostById, update)
    app.put('/api/posts/:postId', getPostById, update)
    app.delete('/api/posts/:postId',getPostById, remove)
}