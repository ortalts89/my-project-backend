const {create, login, getUserProfile, logout, getCurrentUser} = require('../controllers/users');
const {checkUser} = require('../middlewars/users.js');


module.exports = (app) => {
    app.post('/api/register', create)
    app.post('/api/login', login)
    app.get('/api/profile', checkUser, getUserProfile)
    app.get('/api/logout', checkUser, logout)
    app.get('/api/me',checkUser, getCurrentUser)
}