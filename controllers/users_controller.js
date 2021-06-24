//render sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Teams | Sign Up"
    })
}

//render sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Teams | Sign In"
    })
}