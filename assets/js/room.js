const videoStop = document.querySelector('#videoStop');
const muteButton = document.querySelector('#muteButton');
const chatButton = document.querySelector('#chat-show');
let chat = true;

videoStop.addEventListener('click', () => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    const vButton = document.getElementById('videoStop').children[0];
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      vButton.classList.add('options-color');
    } else {
      myVideoStream.getVideoTracks()[0].enabled = true;
      vButton.classList.remove('options-color');
    }
});

muteButton.addEventListener('click', () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    const aButton = document.getElementById('muteButton').children[0];
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
      aButton.classList.add('options-color');
    } else {
      myVideoStream.getAudioTracks()[0].enabled = true;
      aButton.classList.remove('options-color');
    }
});

chatButton.addEventListener('click',() => {
    let leftPart = document.getElementById('left-part');
    let rightPart = document.getElementById('right-part');
    if(chat){
      leftPart.classList.add('left-full');
      rightPart.classList.add('right-hide');
      chat = false;
    }
    else{
      leftPart.classList.remove('left-full');
      rightPart.classList.remove('right-hide');
      chat = true;
    }
});

//Making Add friend button working

const friendOpen = document.getElementById('friend-open');
const friendClose = document.getElementById('friend-close');
const friendBox = document.getElementById('friend-box');

friendOpen.addEventListener('click',() => {
    friendBox.classList.add('show');
});

friendClose.addEventListener('click',() => {
  friendBox.classList.remove('show');
});