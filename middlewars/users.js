const jwt = require('jsonwebtoken');
const {getUser} = require('../services/users')
const {setUserToken} = require('../services/auth')

const TEN_MINUTES = 1000 * 60 * 10;

const checkUser = async (req, res, next) => {
    const token = req.cookies.token;
    let payload;
    let createDate;

    if(!token){
        return res.status(401);
    }
    try{
        payload = jwt.verify(token, process.env.JWT_SECRET)
        if(!payload){
            throw new Error('Invalid token');
        }
        createDate = new Date(payload.created);
       
    }catch(err){
        return res.status(401);
    }

    if(Date.now() - createDate < TEN_MINUTES){
        req.user = payload.user;
        return next();
    }

    const user = await getUser(payload.user.id);
    if(!(user && 
        user.authenticationMethods &&
        user.authenticationMethods.created === payload.created &&
        user.authenticationMethods.identifier === payload.identifier)){
        return res.status(401);
    }

    const newToken = await setUserToken(user);
    res.cookie("token",newToken, {maxAge:'90d', httpOnly: true});
    next();
}

module.exports = {checkUser};