const Comment = require('../models/comment');

function getComment(commentId) {
    return Comment.findById(commentId)
    //.populate('user','fullname thumbnail');
}

function getComments(query = {}) {
    return Comment.find(query).populate('user','fullname thumbnail');
}

function createComment(query = {}) {
    const comment = new Comment(query);
    comment.populate('user','fullname thumbnail');
    return comment.save();
}

function deleteMultipleComments(query = {}) {
    return Comment.deleteMany(query);
}

module.exports = {
    getComment,
    getComments,
    createComment,
    deleteMultipleComments
}
