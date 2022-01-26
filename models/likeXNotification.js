const  mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const LikeXNotificationSchema = new mongoose.Schema({
    like: {type: ObjectId, ref: 'Like', required: true},
    notification: {type: ObjectId, ref: 'Notification', required: true},
});

const LikeXNotification = mongoose.model('LikeXNotification', LikeXNotificationSchema);

module.exports = LikeXNotification;