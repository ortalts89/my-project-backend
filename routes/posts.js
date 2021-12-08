const {getOne, getPostById, getAll, create, update, remove} = require('../controllers/posts.js'); 
const {checkUser} = require('../middlewars/users.js');

module.exports = (app) => {
    app.use('/api/posts', checkUser)
    app.get('/api/posts', getAll)
    app.get('/api/posts/:postId', getPostById, getOne)
    app.post('/api/posts', create)
    app.put('/api/posts/:postId',getPostById, update)
    app.delete('/api/posts/:postId',getPostById, remove)
}