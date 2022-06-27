require('dotenv').config() // require .env 

const express = require('express');
const app = express();
// const port = process.env.PORT;

app.use(express.json());


app.use('/', require('./router/index.js'));


app.listen(process.env.PORT || 8000, (err)=> {
    if(err){
        console.log("Error in running surver : ", err);
        return;
    }

    console.log(`surver is up and running on port : ${process.env.PORT}`);
})