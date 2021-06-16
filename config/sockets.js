module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{cors :{
        origin : "*"
    }});
    const { v4: uuidv4 } = require('uuid');
    

    io.sockets.on('connection',function(socket){
        console.log('A connection received',socket.id);
    });
}