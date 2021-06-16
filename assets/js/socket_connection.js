
const socket = io.connect('http://localhost:5000',{
        transport: ['websocket'],
        withCredentials: true,
        extraHeaders: {
            "sockets": "abcd"
        }
});


socket.on('connect',function(){
    console.log('Connection estlablished using sockets.....');
    const myPeer = new Peer(undefined,{
        host : 'localhost',
        port : '5001',
        path : '/peerjs'
    });

    myPeer.on('open', id => {
        socket.emit('join_room',roomId,id);
    });

    // socket.emit('join_room',roomId,10);

    socket.on('user_connected',function(userId){
        console.log(`User connected : ${userId}`);
    })
})