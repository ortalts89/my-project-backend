const {createUser, getUser, getUserByLoginData, updateUser} = require('../services/users');
const {setUserToken} = require('../services/auth');

async function create(req, res) {
    const user = await createUser({...req.body});
    const newToken = await setUserToken(user);
    res.cookie("token",newToken, {expires: new Date(Date.now() + 9000000), httpOnly: true});
    res.json(user.id);
}

async function login(req, res) {
    const user = await getUserByLoginData(req.body);
    if(!user){
        res.status(404).json({message:"Wrong username or password"})
    }
    const newToken = await setUserToken(user);
    res.cookie("token", newToken, {expires: new Date(Date.now() + 9000000), httpOnly: true});
    res.json(user.id);
}

async function logout(req, res) {
    const user = await updateUser(req.user.id, {authenticationMethods: {created: '', identifier: ''}});
    res.cookie("token", {expires: Date.now()});
    res.json(user.id);
}

async function getUserProfile(req, res) {
    const user = await getUser(req.user.id);
    if(!user){
        res.status(401).json({message:"Your not authorized to view this page"})
    }
    res.json({fullname: user.fullname, email: user.email, password: user.password});
}

async function getCurrentUser(req, res) {
    const user = await getUser(req.user.id);
    if(!user){
        res.status(404).json({message:"User not found"})
    }
    res.json({id: user.id})
}

module.exports = {
    create,
    login,
    getUserProfile,
    getCurrentUser,
    logout
};