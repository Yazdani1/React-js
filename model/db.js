const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/portfolio',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
},(err)=>{
    if(!err){
        console.log("Database Connected")
    }else{
        console.log("We got an error"+err);
    }
})