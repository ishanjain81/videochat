
const socket = io.connect('http://localhost:5000',{
        transport: ['websocket'],
        withCredentials: true,
        extraHeaders: {
            "sockets": "abcd"
        }
});
let myVideoStream;
let myId;
socket.on('connect',function(){
    console.log('Connection estlablished using sockets.....');
    const customGenerationFunction = () => (Math.random().toString(36) + '0000000000000000000').substr(2, 16);
    const myPeer = new Peer({
        host : 'localhost',
        port : '5001',
        path : '/peerjs',
        generateClientId: customGenerationFunction
    });

    //setting our own video
    const videoBox = document.getElementById('video-box');
    const myVideo = document.createElement('video');
    //ensures that we dont hear our own voice
    myVideo.muted = true;

    const peers = {};

    //Rendering our own video
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream =>{
        streamVideo(myVideo,stream);
        myVideoStream = stream;
        myPeer.on('call',function(call){
            call.answer(stream);
            const video = document.createElement('video');
            peers[call.peer] = call;
            call.on('stream',function(userVideoStream){
                streamVideo(video,userVideoStream);
            });
            call.on('close',function(){
                video.remove();
            });
        });

        socket.on('user_connected',function(userId){
            console.log(`User connected : ${userId}`);
            
            setTimeout(()=>{
                connectToNewUser(userId,stream)
            },1000);
            // connectToNewUser(userId,stream);
        });
    });

    socket.on('user_disconnected',userId => {
        console.log('User Disconnected:' + userId);
            if(peers[userId]){
                peers[userId].close();
            }
    });

    myPeer.on('open', id => {
        socket.emit('join_room',roomId,id);
        myId = id;
    });
    //Rendering our own video
    // socket.emit('join_room',roomId,10);

    // For Chatting Engine
    let chatBox = document.getElementById('user-chat-box');
    let sendMessage = document.getElementById('send-message');
    //send Message on Click
    sendMessage.addEventListener('click',() => {
        // console.log(msg);
        let msg = document.getElementById('chat-message-input').value;
        if(msg != ''){
            socket.emit('send_message',{
                message: msg,
                roomId: roomId,
                id : myId
            });
            msgContainer.value = ""
        }
    });
    //send Message on Enter
    let msgContainer = document.getElementById('chat-message-input');
    msgContainer.addEventListener("keyup",(event) => {
        if(event.key === 'Enter'){
            let msg = document.getElementById('chat-message-input').value;
            if(msg != ''){
                socket.emit('send_message',{
                    message: msg,
                    roomId: roomId,
                    id : myId
                });
                msgContainer.value = ""
            }
        }
    });
    socket.on('recieve_message',function(data){
        console.log('message recieved',data.message);

        let newMessage = $('<li>');

        let messageType = 'other-message';

        if(data.id == myId){
            messageType = 'self-message';
        }

        newMessage.append($('<span>',{
            'html': data.message
        }));

        newMessage.append($('<br>'));


        newMessage.addClass(messageType);

        $('#chat-messages-list').append(newMessage);
    });


    function connectToNewUser(userId,stream){
        const call = myPeer.call(userId,stream);
        const video = document.createElement('video');
        call.on('stream',function(userVideoStream){
            streamVideo(video,userVideoStream);
        });
        call.on('close',function(){
            video.remove();
        });

        peers[userId] = call;
    }
    
    function streamVideo(video,stream){
        video.srcObject = stream;
        video.addEventListener('loadedmetadata',function(){
            video.play();
        }); 
        videoBox.append(video);
    }
})
