const  mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const NotificationSchema = new mongoose.Schema({
    sentTo: {type: ObjectId, ref: 'User', required: true},
    createdBy: {type: ObjectId, ref: 'User', required: true},
    text: {type: String, required: true},
    type: {type: String, required: true},
    isRead: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now()},
    url: {type: String, required: true},
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;