const { getComment, createComment } = require('../services/comments');
const { createNotification, getNotification } = require('../services/notifications');
const { getPost } = require('../services/posts');
const { createCommentXNotification, getCommentXNotification } = require('../services/commentXNotification');

async function addComment(req, res) {
    const post  = await getPost({_id: req.params.postId });
    const comment = await createComment({post: req.params.postId, user: req.user.id, text: req.body.text});
    if(req.user.id !== post.user._id.toString()) {
        const notificationText = `${comment.user.fullname}` + ' ' + 'commented on your photo';
        const notification = await createNotification({sentTo: post.user._id, createdBy: req.user.id, text: notificationText, type: 'comment', url: `/post/${post._id}`});
        await createCommentXNotification({comment: comment._id, notification: notification._id});
    }
    res.json(comment)
}

async function deleteComment(req, res) {
    const comment = await getComment(req.params.commentId);
    await comment.remove();
    const commentXNotification = await getCommentXNotification({comment: req.params.commentId});
    if(commentXNotification){
        commentXNotification.remove();
        const notification = await getNotification(commentXNotification.notification);
        await notification.remove();
    }
    res.json(comment.id);
}

module.exports = {
    addComment,
    deleteComment
}