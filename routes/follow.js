const {getAllFollowing, getAllFollowers, addFollow, removeFollow} = require('../controllers/follow.js'); 
const {checkUser} = require('../middlewars/users.js');

module.exports = (app) => {
    app.use('/api/follow', checkUser);
    app.get('/api/follow/:userId/followers', getAllFollowers)
    app.get('/api/follow/:userId/following', getAllFollowing)
    app.post('/api/follow/:userId', addFollow)
    app.delete('/api/follow/:userId', removeFollow)

}