const {checkUser} = require('../middlewars/users.js');
const { getUserNotifications, deleteNotification} = require('../controllers/notifications');

module.exports = (app) => {
    app.use('/api/notifications', checkUser)
    app.get('/api/notifications', getUserNotifications);
    app.delete('/api/notifications/:notificationId', deleteNotification)
}