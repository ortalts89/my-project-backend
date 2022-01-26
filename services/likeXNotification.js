const LikeXNotification = require('../models/likeXNotification');

function createLikeXNotification(query = {}) {
    const likeXNotification  = new LikeXNotification(query);
    return likeXNotification.save();
}

function getLikeXNotification(query = {}) {
    return LikeXNotification.findOne(query);
}

module.exports = {
    createLikeXNotification,
    getLikeXNotification
}