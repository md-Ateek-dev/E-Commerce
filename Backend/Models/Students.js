const mongoose = require ("mongoose");

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    Studentprofile:{
        type:String,
        required:true
    },
});

const Student= mongoose.model('Student', studentSchema);
module.exports=Student;