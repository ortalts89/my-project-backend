const usersSockets = {};

function getUserSocket(userId) {
    return usersSockets[userId];
}

function setUserSocket(userId, socket) {
    usersSockets[userId] = socket;
}

function removeUserSocket(userId) {
    delete usersSockets[userId];
}

function disconnectUser(userId) {
    const socket = getUserSocket(userId);
    if(socket) {
        socket.disconnect();
        removeUserSocket(userId);
    }
}

module.exports = {
    getUserSocket,
    setUserSocket,
    removeUserSocket,
    disconnectUser
}