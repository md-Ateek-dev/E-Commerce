const express =require('express');
const multer= require("multer");
const path =require("path");
const {signupStudents} = require('../Controllers/StudentsControllers');



// Configer multer for file uploads
const storage = multer.diskStorage({
    destination:(req, file,cb) =>{
        cb(null,path.join(__dirname,"../uploads"));
    },
});

const upload = multer({storage})


const router =express.Router();

router.post('/students/post',upload.single('studentprofile'), signupStudents); 

module.exports=router;