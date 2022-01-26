const { getNotification, getNotifications } = require('../services/notifications');
const { getLikeXNotification } = require('../services/likeXNotification');
const { getCommentXNotification } = require('../services/commentXNotification');


async function getUserNotifications(req, res) {
    const userNotifications = await getNotifications({sentTo: req.user.id});
    res.json(userNotifications);
}

async function deleteNotification(req, res) {
    const notification = await getNotification(req.params.notificationId);
    if(notification){
        await notification.remove();
        if(notification.type === 'comment'){
            const commentXNotification = await getCommentXNotification({notification: notification._id});
            await commentXNotification.remove();
        } else if(notification.type === 'like'){
            const likeXNotification = await getLikeXNotification({notification: notification._id});
            await likeXNotification.remove();
        }
        res.json(notification._id);
    } else {
        res.status(404).json({message: 'notification not found'});
    }
}

module.exports = {
    getUserNotifications,
    deleteNotification
}