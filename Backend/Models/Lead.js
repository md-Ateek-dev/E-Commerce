const mongoose = require('mongoose');

// User Schema 

const leadSchema = new mongoose.Schema({
    Productname:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    ProductImage:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
});

const Lead= mongoose.model('Lead', leadSchema);
module.exports=Lead;