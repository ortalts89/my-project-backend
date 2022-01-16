const  mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const FollowingSchema = new mongoose.Schema({
    user: {type: ObjectId, ref: 'User', required: true},
    following: {type: ObjectId, ref: 'User', required: true}
}, { versionKey: false });

const Following = mongoose.model('Following', FollowingSchema);

module.exports = Following;