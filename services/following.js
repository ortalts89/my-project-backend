const Following = require('../models/following');


function getFollowing(query = {}) {
    return Following.find(query);
}

function getOneFollowing(query = {}) {
    return Following.findOne(query);
}

function createFollowing(data) {
    const following = new Following(data);
    return following.save();
}


module.exports = {
    getFollowing,
    getOneFollowing,
    createFollowing
}

