const Follower = require('../models/follower');


function getFollowers(query = {}) {
    return Follower.find(query);
}

function getOneFollower(query = {}) {
    return Follower.findOne(query);
}

function createFollower(data) {
    const follower = new Follower(data);
    return follower.save();
}


module.exports = {
    getFollowers,
    getOneFollower,
    createFollower
}

