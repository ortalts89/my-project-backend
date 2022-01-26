const Post = require('../models/post')

function getPost(query = {}) {
    return Post.findOne(query).populate('user', '_id fullname');
}

function getPosts(query = {}) {
    return Post.find(query).populate('user', '_id fullname');
}

function createPost(data) {
    const post = new Post(data);
    return post.save();
}


module.exports = {
    getPost,
    getPosts,
    createPost
}