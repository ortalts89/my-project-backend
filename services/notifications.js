const Notification = require('../models/notification');

function createNotification(query = {}) {
    const notification = new Notification(query);
    return notification.save();
}

function getNotification(notificationId) {
    return Notification.findById(notificationId);
}

function getNotifications(query = {}) {
    return Notification.find(query);
}

module.exports = {
    createNotification,
    getNotification,
    getNotifications
}