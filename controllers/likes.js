const { getLike, createLike } = require('../services/likes');
const { getPost } = require('../services/posts');
const { createNotification, getNotification } = require('../services/notifications');
const { createLikeXNotification, getLikeXNotification } = require('../services/likeXNotification');

async function addLike(req, res) {
    const post = await getPost({_id: req.params.postId});
    const like = await createLike({user: req.user.id, post: req.params.postId});
    if(req.user.id !== post.user._id.toString()){
        const notificationText = `${like.user.fullname}` + ' ' + 'liked your photo';
        const notification = await createNotification({sentTo: post.user._id, createdBy: req.user.id, text: notificationText, type: 'like', url: `/post/${post._id}`});
        await createLikeXNotification({like: like._id, notification: notification._id});
    }
    res.json(like.id)
}

async function deleteLike(req, res) {
    const like = await getLike({user: req.user.id, post: req.params.postId});
    await like.remove();
    const likeXNotification = await getLikeXNotification({like: like._id});
    if(likeXNotification) {
        await likeXNotification.remove();
        const notification = await getNotification(likeXNotification.notification);
        await notification.remove();
    }
    res.json(like.id)
}

module.exports = {
    addLike,
    deleteLike
}