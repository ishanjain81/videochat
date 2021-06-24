const User = require('../models/user');

//render sign up page
module.exports.signUp = function(req,res){
    // if user already sign In
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_up',{
        title: "Teams | Sign Up"
    })
}

//render sign in page
module.exports.signIn = function(req,res){
    // if user already sign In
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    
    return res.render('user_sign_in',{
        title: "Teams | Sign In"
    })
}

//creating a User in DB
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err, user){
        if(err){console.log("Error",err); return}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('Error in creating a User',err); return}
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('/users/sign-in');
        }
    });
}


//Sign in data using passport
module.exports.createSession = function(req,res){
    return res.redirect('/');
}
