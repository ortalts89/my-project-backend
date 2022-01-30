const {setUserSocket, getUserSocket, removeUserSocket} = require('./usersSockets');
const { getUser } = require('./services/users');

module.exports = function createSocketIo(httpServer) {
    const io = require('socket.io')(httpServer, {cors: {origin: 'http://localhost:3000'}});

    io.on('connection', (socket) => {
        socket.on('login', async (userId) => {
            const user = await getUser(userId);
            if (user) {
                setUserSocket(userId, socket);
            }


            socket.on('send notification', ({content, to, postId}) => {
                if(user.id !== to){
                    let notification;
                    if(content === 'like') {
                        notification = `${user.fullname} liked your photo`;
                    } else if(content === 'comment') {
                        notification = `${user.fullname} commented on your photo`;
                    }
                    const sendToSocket = getUserSocket(to);
                    if(sendToSocket){
                        sendToSocket.emit('get notification', {text: notification, postId: postId});
                    }
                }
            })
            socket.on('logout', () => removeUserSocket(user.id));
        })

    });

}

