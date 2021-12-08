const {connect} = require('mongoose');

async function connectToDb() {
    connection = await connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connected to mongo')
}

require('./post');
require('./user');

module.exports = connectToDb;