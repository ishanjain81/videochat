const videoStop = document.querySelector('#videoStop');
const muteButton = document.querySelector('#muteButton');
const chatButton = document.querySelector('#chat-show');

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
    let vi = document.getElementsByTagName('video');
    if(chat){
      leftPart.classList.add('left-full');
      rightPart.classList.add('right-hide');
      vi[0].classList.add('m-topless');
      if(vi[1]){
        vi[1].classList.add('m-topless');
      }
      chat = false;
    }
    else{
      leftPart.classList.remove('left-full');
      rightPart.classList.remove('right-hide');
      vi[0].classList.remove('m-topless');
      if(vi[1]){
        vi[1].classList.remove('m-topless');
      }
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

// Invite Link
$('#invite-forms').submit(function(e){
  // setting url in value
    document.getElementById('current-link').value = window.location.href;
    // to stop submit from default
    e.preventDefault();
    let d = $('#invite-forms').serialize();
    //Make a ajax call to submit form
    $.ajax({
        type: 'post',
        url: '/room/invite',
        data: d,
        success: function(data){
              console.log(data);
              new Noty({
                theme: 'relax',
                text: "Invite Link Send Successfully",
                type: 'success',
                layout: 'topRight',
                timeout: 1500
                
            }).show();
        },error: function(error){
          console.log(error.resposeText);
        }
    });

    // ressetting form after submitting
    document.getElementById("invite-forms").reset();

});