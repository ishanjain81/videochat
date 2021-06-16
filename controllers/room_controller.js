module.exports.room_render = function(req,res){
    return res.render('room',{
        title : "Room",
        roomId : req.params.room_id
    });
}