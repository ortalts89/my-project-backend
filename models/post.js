const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const PostSchema = new mongoose.Schema({
    title: {type: String},
    hashtags: {type: Array},
    createdAt: {type: Date, default: Date.now()},
    user: {type: ObjectId, ref: 'User'}
});

const Post = mongoose.model('Post', PostSchema)

module.exports = Post;