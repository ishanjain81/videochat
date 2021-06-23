const invite = require('../mailers/invite-mailer');
module.exports.room_render = function(req,res){
    return res.render('room',{
        title : "Room",
        roomId : req.params.room_id
    });
}

// Sending invite link

module.exports.invite = function(req,res){
    if(req.xhr){
        console.log(req.body);
        return res.status(200).json({
            message: "Invite Send!"
        });
    }
    return;
}