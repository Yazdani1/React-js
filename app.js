const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//database
require('./model/db')


//router
app.use(require('./router/index'));

app.listen(port,(req,res)=>{
    console.log("Server connected")
});
