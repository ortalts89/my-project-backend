var cloudinary = require('cloudinary').v2;
const {getPost, getPosts, createPost} = require('../services/posts.js')
const { getFollowing } = require('../services/following')

async function getOne(req, res) {
    res.json(req.post);
}

async function getPostsByUserId(req, res) { 
    const userPosts = await (getPosts({user: req.params.userId, published: true}).lean());
    userPosts.sort((a,b) => b.createdAt - a.createdAt);
    res.json(userPosts);
}

async function getPostById(req, res, next) {
    const userId = req.user.id;
    const postId = req.params.postId;
    const post = await getPost({user: userId, _id: postId});

    if(post){
        req.post = post;
        next();
    }else{
        res.status(404).json({message: 'Post not found'});
    }
}

async function getAll(req, res){
    const userPosts = await (getPosts({user: req.user.id, published: true}).lean());
    res.json(userPosts);
}

async function getFollowingPosts(req, res){
    let following = await getFollowing({user: req.user.id});
    following = following.map( obj => obj.following);
    const posts = await (getPosts({user: {$in: following}, published: true}).lean());
    posts.sort((a,b) => b.createdAt - a.createdAt);
    res.json(posts);
}

async function create(req, res) {
    const imgUrl = cloudinary.uploader.upload(req.files[0].path,
        function(error, result) {
            if(error) {
                res.status(404).json({message: error.message});
            }
            return result})
    const post = await createPost({
        user: req.user.id,
        imgUrl: (await imgUrl).url
    });
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
        console.log(req.post.published);
        req.post.published = req.body.published;
    }
    await req.post.save();
    res.json(req.post.id);
}

async function remove(req, res) {
    await req.post.remove();
    res.json(req.post);
}

module.exports = {
    getOne,
    getPostById,
    getAll,
    getFollowingPosts,
    create,
    update,
    remove,
    getPostsByUserId
}