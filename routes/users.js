const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/sign-up',usersController.signUp);

router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);


// Route For Log In
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: 'sign-in'},
),usersController.createSession);

// For Log Out
router.get('/sign-out',usersController.destroySession);

// Google Auth Strategy
router.get('/auth/google', passport.authenticate('google',{scope: ['profile','email',]}));
router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect: '/users/sign-in'}),usersController.createSession);

module.exports = router;