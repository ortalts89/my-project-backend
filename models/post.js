const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const PostSchema = new mongoose.Schema({
    caption: {type: String},
    location: {type: String},
    hashtags: {type: String},
    createdAt: {type: Date, default: Date.now()},
    user: {type: ObjectId, ref: 'User', required: true},
    imgUrl: {type: String, required:true},
    published: {type: Boolean, required: true, default: false},
    isDeleted: {type: Boolean, required: true, default: false}
});

const Post = mongoose.model('Post', PostSchema)

module.exports = Post;