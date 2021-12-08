const {create} = require('../controllers/users')

module.exports = (app) => {
    app.post('/api/register', create)
}