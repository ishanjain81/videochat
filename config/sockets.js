module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);
    const { v4: uuidv4 } = require('uuid');
    console.log(`${uuidv4()}`);
}