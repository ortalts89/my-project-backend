const {updateUser} = require('./users');

async function setUserToken(user) {
    const payload = {
        user: {id: user.id},
        created: (new Date()).toJSON(),
        identifier: Math.random().toString()
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    await updateUser(user.id, {authenticationMethods: {created: payload.created, identifier: payload.identifier}});
    return token;
}

module.exports = {setUserToken};