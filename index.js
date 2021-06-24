const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const db = require('./config/mongoose');

// set up server with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is listening on port 5000');

// set up peer server
const pServer = require('http').Server(app);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(pServer, {
    debug: true,
});
pServer.listen(5001);
app.use('/peerjs', peerServer);
console.log('Peer server is listening on port 5001');

//setting up sass
app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));

//setting static files
app.use(express.static('./assets'));

// To use AJAX
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//using layouts
app.use(expressLayouts);
//for styles and scripts in layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use ejs & set up view engine
app.set('view engine','ejs');
app.set('views','./views');


// use express router
app.use('/', require('./routes'));

//set express 
app.listen(port,function(err){
    if(err){
        console.log('Error in starting Server :',err);
    }
    console.log(`Server is Running on port : ${port}`);
});