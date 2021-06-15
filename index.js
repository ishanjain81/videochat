const express = require('express');
const app = express();
const port = 8000;

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