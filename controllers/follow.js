const {getFollowing, getOneFollowing, createFollowing} = require('../services/following.js');
const {getFollowers, getOneFollower, createFollower} = require('../services/followers.js');



async function getAllFollowing(req, res) {
    let following = await getFollowing({user: req.params.userId});;
    following = following.map(obj => obj.following);
    res.json(following);
}

async function getAllFollowers(req, res) {
    let followers = await getFollowers({user: req.params.userId});
    followers = followers.map(obj => obj.follower);
    res.json(followers);
}

async function addFollow(req, res) {
    const following = await createFollowing({user: req.user.id, following: req.params.userId});
    const follower = await createFollower({user: req.params.userId, follower: req.user.id});
    res.json({following, follower})
}

async function removeFollow(req, res) {
    const following = await getOneFollowing({user: req.user.id, following: req.params.userId});
    await following.remove();
    const follower = await getOneFollower({user: req.params.userId, follower: req.user.id});
    await follower.remove();
    res.json({following, follower})
}

module.exports = {
    getAllFollowing,
    getAllFollowers,
    addFollow,
    removeFollow
}