const CommentXNotification = require('../models/commentXNotification');

function createCommentXNotification(query = {}) {
    const commentXNotification  = new CommentXNotification(query);
    return commentXNotification.save();
}

function getCommentXNotification(query = {}) {
    return CommentXNotification.findOne(query);
}

module.exports = {
    createCommentXNotification,
    getCommentXNotification
}