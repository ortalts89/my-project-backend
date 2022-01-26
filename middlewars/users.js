const jwt = require('jsonwebtoken');
const {getUser} = require('../services/users')
const {setUserToken} = require('../services/auth')
const { getToken, setToken } = require('../services/temporaryTokens')

const TEN_MINUTES = 1000 * 60 * 10;

const checkUser = async (req, res, next) => {
    const token = req.cookies.token;
    let payload;
    let createDate;

    
    if(!token){
        return res.status(401).json({message: 'No token'}).end();
    }
    try{
        payload = jwt.verify(token, process.env.JWT_SECRET);

        if(!payload){
            throw new Error('Invalid token');
        }
        createDate = new Date(payload.created);
       
    }catch(err){
        return res.status(401).json({message: 'Invalid token'}).end();
    }

    if(Date.now() - createDate < TEN_MINUTES){
        req.user = payload.user;
        return next();
    }

    const temporaryPayload = await getToken(token);

    if(temporaryPayload){
        req.user = temporaryPayload.user;
        return next();
    }

    const user = await getUser(payload.user.id);
    if(!(user && 
        user.authenticationMethods &&
        user.authenticationMethods.created === payload.created &&
        user.authenticationMethods.identifier === payload.identifier)){
        return res.status(401).json({message: "No user"}).end();
    }

    setToken(token, payload);

    const newToken = await setUserToken(user);
    res.cookie("token",newToken, {expires: new Date(Date.now() + 9000000*2), httpOnly: true});
    req.user = payload.user;
    next();
}

module.exports = {checkUser};