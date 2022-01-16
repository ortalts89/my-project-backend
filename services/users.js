const User = require('../models/user');

function getUser(userId) {
    return User.findById(userId);
}

async function getUserByLoginData(data) {
    const user = await User.findOne({username: data.username});
    if(user){
        if(user.password === data.password){
            return user;
        }
    }
}

function getUsersByQuery(query){
    return (User.find({fullname: {$regex : query, $options: 'i'}}));
}

function getUsers(users) {
    return User.find(users);
}

async function createUser(data) {
    const user = await new User(data);
    return user.save();
}

function updateUser(userId, data) {
    return User.findByIdAndUpdate(userId, {$set: data});
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    getUserByLoginData,
    getUsersByQuery
}