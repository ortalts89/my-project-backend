const  mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const CommentSchema = new mongoose.Schema({
    post: {type: ObjectId, ref: 'Post', required: true},
    user: {type: ObjectId, ref: 'User', required: true},
    text: {type: String, required: true}
}, { versionKey: false });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;