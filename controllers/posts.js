const {getPost, getPosts, createPost} = require('../services/posts.js')

async function getOne(req, res) {
    res.json(req.post);
}

async function getPostById(req, res, next) {
    const userId = req.userId;
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
    const userPosts = await (getPosts({user: req.userId}).lean());
    res.json(userPosts)
}

async function create(req, res) {
    const post = await createPost({
        ...req.body,
        user: req.userId
    });

    res.json(post);
}

async function update(req, res) {
    if('title' in req.body){
        req.post.title = req.body.title;
    }
    if('hashtags' in req.body){
        req.post.hashtags = req.body.hashtags;
    }
    await req.post.save();
    res.json(req.post);
}

async function remove(req, res) {
    await req.post.remove();
    res.json(req.post);
}

module.exports = {
    getOne,
    getPostById,
    getAll,
    create,
    update,
    remove
}