const socket = io('http://localhost:5000');

socket.on('connect',function(){
    console.log('Connection estlablished using sockets.....');
})