const  mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname: {type: String, required: true},
    username: {type: String, required:true},
    password: {type: String, required: true},
    email: {type: String, required: true, validate: (value='') => value.includes('@')},
    thumbnail: {type: String},
    authenticationMethods: {created: String, identifier: String}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;