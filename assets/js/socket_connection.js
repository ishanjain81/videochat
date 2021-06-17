
const socket = io.connect('http://localhost:5000',{
        transport: ['websocket'],
        withCredentials: true,
        extraHeaders: {
            "sockets": "abcd"
        }
});

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

        myPeer.on('call',function(call){
            call.answer(stream);
            const video = document.createElement('video');
            call.on('stream',function(userVideoStream){
                streamVideo(video,userVideoStream);
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
    });
    //Rendering our own video
    // socket.emit('join_room',roomId,10);
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
