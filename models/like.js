const  mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const LikeSchema = new mongoose.Schema({
    post: {type: ObjectId, ref: 'Post', required: true},
    user: {type: ObjectId, ref: 'User', required: true}
}, { versionKey: false });

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;