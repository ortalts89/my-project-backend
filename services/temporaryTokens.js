const tokens = {};
const MINUTE = 1000 * 60;

async function getToken(token) {
    if(tokens[token]) {
        return tokens[token];
    }
    return null;
}

async function setToken(token, payload) {
    tokens[token] = payload;
    setTimeout(function() {delete tokens[token]}, MINUTE)
}

module.exports = {
    getToken,
    setToken
}