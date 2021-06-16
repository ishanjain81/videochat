module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{cors :{
        origin : "*"
    }});
    const { v4: uuidv4 } = require('uuid');
    

    io.sockets.on('connection',function(socket){
        console.log('A connection received',socket.id);

        socket.on('join_room',(roomId,userId) => {
            console.log(roomId + " " + userId);

            socket.join(roomId);
            socket.to(roomId).emit('user_connected',userId);
            // broadcast to everyone in the room that a user is connected
        });
    });
}