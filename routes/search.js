const {checkUser} = require('../middlewars/users.js');
const { searchUsers } = require('../controllers/search')


module.exports = (app) => {
    app.use('/api/search', checkUser)
    app.get('/api/search/users', searchUsers)
    app.get('/api/search/posts')
}