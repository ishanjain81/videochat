const express = require('express');
const app = express();
const port = 8000;


// use express router
app.use('/', require('./routes'));

//set express 
app.listen(port,function(err){
    if(err){
        console.log('Error in starting Server :',err);
    }
    console.log(`Server is Running on port : ${port}`);
});