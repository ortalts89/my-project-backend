const  mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const FollowerSchema = new mongoose.Schema({
    user: {type: ObjectId, ref: 'User', required: true},
    follower: {type: ObjectId, ref: 'User', required: true},
});

const Follower = mongoose.model('Follower', FollowerSchema);

module.exports = Follower;