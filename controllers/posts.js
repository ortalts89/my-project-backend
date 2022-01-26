var cloudinary = require('cloudinary').v2;
const {getPost, getPosts, createPost} = require('../services/posts.js')
const { getFollowing } = require('../services/following')
const { getLikes, deleteMultipleLikes } = require('../services/likes')
const { getComments, deleteMultipleComments } = require('../services/comments')

async function getPostById(req, res){
    const postId = req.params.postId;
    const post = await (getPost({_id: postId, published: true, isDeleted: false}).lean());
    const postData = await getPostData(post, req.user.id);
    res.json(postData);
}

async function getPostsByUserId(req, res) { 
    const userPosts = await (getPosts({user: req.params.userId, published: true, isDeleted: false}).lean());
    userPosts.sort((a,b) => b.createdAt - a.createdAt);
    const posts = await getPostsData(userPosts, req.user.id);
    res.json(posts);
}

async function getPostByQuery(req, res, next) {
    const userId = req.user.id;
    const postId = req.params.postId;
    const post = await getPost({user: userId, _id: postId, isDeleted: false});

    if(post){
        req.post = post;
        next();
    }else{
        res.status(404).json({message: 'Post not found'});
    }
}

async function getFollowingPosts(req, res){
    let following = await getFollowing({user: req.user.id});
    following = following.map( obj => obj.following);
    following.push(req.user.id);
    const followingPosts = await (getPosts({user: {$in: following}, published: true, isDeleted: false}).lean());
    followingPosts.sort((a,b) => b.createdAt - a.createdAt);
    const posts = await getPostsData(followingPosts, req.user.id);
    res.json(posts);
}

async function create(req, res) {
    const imgUrl = cloudinary.uploader.upload(req.files[0].path,
        function(error, result) {
            if(error) {
                res.status(404).json({message: error.message});
            }
            return result})
    const post = await createPost({user: req.user.id, imgUrl: (await imgUrl).url});
    res.json(post.id);
}

async function update(req, res) {
    if('caption' in req.body){
        req.post.caption = req.body.caption;
    }
    if('location' in req.body){
        req.post.location = req.body.location;
    }
    if('hashtags' in req.body){
        req.post.hashtags = req.body.hashtags;
    }
    if('published' in req.body){
        req.post.published = req.body.published;
    }
    await req.post.save();
    res.json(req.post.id);
}

async function deletePost(req, res) {
    req.post.isDeleted = true;
    await req.post.save();
    const likes = await getLikes({post: req.post.id, user: req.user.id});
    const likesIds = likes.map(like => like._id);
    await deleteMultipleLikes({_id: {$in: likesIds}});
    const comments = await getComments({post: req.post.id});
    const commentsIds = comments.map(comment => comment._id);
    await deleteMultipleComments({_id: {$in: commentsIds}});
    res.json(req.post.id);
}

async function getPostData(post, loggedInUserId) {
    const likes = await (getLikes({post: post._id}).lean());
    const comments = await (getComments({post: post._id}).lean());
    const isLikedByCurrentUser = likes.map(like => like.user.toString()).includes(loggedInUserId);

    return {...post, likes: likes, comments: comments, isLikedByCurrentUser: isLikedByCurrentUser}
}

async function getPostsData(posts, loggedInUserId) {
    const postsIds = posts.map((post) => post._id);
    const likes = await (getLikes({post: {$in: postsIds }}).lean());
    const comments = await (getComments({post: {$in: postsIds}}).lean());

    return posts.map(post => {
        const postLikes = likes.filter(like => like.post.equals(post._id));
        const postComments = comments.filter(comment => comment.post.equals(post._id));
        const isLikedByCurrentUser = postLikes.map(like => like.user.toString()).includes(loggedInUserId);
        return {...post, likes:  postLikes, comments: postComments, isLikedByCurrentUser: isLikedByCurrentUser}})
}

module.exports = {
    getPostByQuery,
    getFollowingPosts,
    getPostById,
    create,
    update,
    deletePost,
    getPostsByUserId
}