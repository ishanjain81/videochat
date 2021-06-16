const socket = io('http://localhost:5000');
socket.on('connect',function(){
    console.log('Connection estlablished using sockets.....');

    socket.emit('join_room',roomId,100);

    socket.on('user_connected',function(userId){
        console.log(`User connected : ${userId}`);
    })
})