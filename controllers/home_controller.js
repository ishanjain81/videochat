const { v4: uuidv4 } = require('uuid');

module.exports.home = function(req,res){
    return res.render('home',{
        title : "Home"
    });
}

module.exports.make_call = function(req,res){
    let room_id = uuidv4();
    // console.log(room_id);
    // return res.redirect(`/room?id=${room_id}`);
    if(!req.isAuthenticated()){
        req.flash('success','Please ! Login to Continue');
        return res.redirect('/users/sign-in');
    }
    return res.redirect(`/room/${room_id}`);
}

module.exports.join_call = function(req,res){
    if(!req.isAuthenticated()){
        req.flash('success','Please ! Login to Continue');
        return res.redirect('/users/sign-in');
    }
    return res.redirect(`/room/${req.body.code}`);
}