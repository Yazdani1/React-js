const mongoose = require('mongoose');

var portfolioData = mongoose.Schema({
    title:{
        type: String
    },
    des:{
        type: String
    },
    price:{
        type: String
    }
});
module.exports = mongoose.model("portfolioData",portfolioData);
