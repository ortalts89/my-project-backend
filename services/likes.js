const Like = require('../models/like');

function getLike(query = {}) {
    return Like.findOne(query);
}

function getLikes(query = {}) {
    return Like.find(query);
}

function createLike(query = {}) {
    const like = new Like(query);
    like.populate('user','fullname thumbnail');
    return like.save();
}
function deleteMultipleLikes(query = {}) {
    return Like.deleteMany(query);
}

module.exports = {
    getLike,
    getLikes,
    createLike,
    deleteMultipleLikes
}