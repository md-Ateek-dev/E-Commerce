const { default: mongoose } = require("mongoose");
const User = require("../Models/User");
const jwt = require('jsonwebtoken');


const signupUser = async(req,res)=>{
    try{

        const {name,email,password}=req.body;
        const image = req.file ? req.file.filename : 'null';
        const user= new User({name,email,password,Image:image});
        await user.save();
        res.status(201).json({message:"User Signup successfully!", user: user});
    }
    catch(error){
console.log ("Error");
res.status(500).json({message:"internal server error ", error})       
    }
}

// User Get Api
const getUser = async(req,res) =>{
    try {
        const users = await User.find();
        console.log("User fetched successfully");
        res.status(200).json({message:"User Data fetched Successfully", users});
    } catch (err) {
        res.status(500).json({message:"Error fetching user ", error: err.message});
    }
}

// Login API


const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        // check if the user exist
        
        const user =await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found "});
        }
        if(user.password!==password){
            return res.status(401).json({message:"Invailid credential"});
        }
        
        const token =jwt.sign(
            {userId:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );
        res.status(200).json({message:"Login successfully!", user,token});
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        
    }
}



module.exports= {signupUser,loginUser,getUser}