const { getUsersByQuery } = require('../services/users')

async function searchUsers(req, res) {
    const query = req.query.q;
    if(query === ''){
        res.json([])
    }else{
        const dbUsers = await getUsersByQuery(query);
        const users = dbUsers.map(user => ({id: user.id, fullname: user.fullname}))
        res.json(users);
    }
}

module.exports = {
    searchUsers
}