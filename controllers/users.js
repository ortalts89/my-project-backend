const {createUser} = require('../services/users');
const {setUserToken} = require('../services/auth');

async function create(req, res) {
    const user = await createUser({...req.body});
    const newToken = await setUserToken(user);
    res.cookie("token",newToken);
    res.json(user);
}

module.exports = {create};