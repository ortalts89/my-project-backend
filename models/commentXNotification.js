const  mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const CommentXNotificationSchema = new mongoose.Schema({
    comment: {type: ObjectId, ref: 'Comment', required: true},
    notification: {type: ObjectId, ref: 'Notification', required: true},
});

const CommentXNotification = mongoose.model('CommentXNotification', CommentXNotificationSchema);

module.exports = CommentXNotification;