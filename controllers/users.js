const {createUser, getUser, getUserByLoginData, updateUser} = require('../services/users');
const {setUserToken} = require('../services/auth');
const jwt = require('jsonwebtoken');


async function create(req, res) {
    const user = await createUser({...req.body});
    const newToken = await setUserToken(user);
    res.cookie("token",newToken, {expires: new Date(Date.now() + 9000000*2), httpOnly: true});
    res.json(user.id);
}

async function login(req, res) {
    const user = await getUserByLoginData(req.body);
    if(!user){
        res.status(404).json({message:"Wrong username or password"})
    }
    const newToken = await setUserToken(user);
    res.cookie("token", newToken, {expires: new Date(Date.now() + 9000000*2), httpOnly: true});
    res.json({id: user.id, fullname: user.fullname, thumbnail: user.thumbnail});
}

async function logout(req, res) {
    const token = req.cookies.token;
    let user;
    if(token && (typeof(token) === 'string')){
        payload = jwt.verify(token, process.env.JWT_SECRET);
        if(payload){
            user = await updateUser(payload.user.id, {authenticationMethods: {created: '', identifier: ''}});
        }
    }

    res.cookie("token", {expires: Date.now()});
    res.json({message: "User logged out"})
}

async function getUserAccount(req, res) {
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
    res.json({id: user.id, fullname: user.fullname, thumbnail: user.thumbnail})
}

async function getUserProfileInfo(req, res) {
    const userId = req.params.userId;
    const dbUser = await getUser(userId);

    if(!dbUser){
        res.status(404).json({message:"User not found"})
    }

    res.json({fullname: dbUser.fullname, thumbnail: dbUser.thumbnail})
}

module.exports = {
    create,
    login,
    getUserAccount,
    getCurrentUser,
    logout,
    getUserProfileInfo
};