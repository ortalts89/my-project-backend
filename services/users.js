const User = require('../models/user');

function getUser(userId) {
    return User.findById(userId);
}

function getUsers(users) {
    return User.find(users);
}

function createUser(data) {
    const user = new User(data);
    return user.save();
}

function updateUser(userId, data) {
    return User.findByIdAndUpdate(userId, {$set: data});
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser
}