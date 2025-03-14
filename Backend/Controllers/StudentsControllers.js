const { default: mongoose } = require("mongoose");
const Students = require("../Models/Students");

const signupStudents = async(req,res)=>{
    try{

        const {name,email,password,number,address,status,subject,DOB,gender}=req.body;
        const Studentprofile = req.file ? `http:localhost:3000/uploads/${req.file.filename}` : 'null';
        const student= new Students({name,email,password,number,address,status,subject,DOB,gender,Studentprofile:Studentprofile});
        
        await student.save();
        res.status(200).json({message:"Student Data Post successfully!", student: student});
    }
    catch(error){
console.log ("Error");
res.status(500).json({message:"internal server error ", error})       
    }
}

module.exports = {signupStudents};