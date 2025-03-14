const express =require('express');
const multer= require("multer");
const path =require("path");
const {signupUser, loginUser, getUser,} = require('../Controllers/UserControllers');

// Configer multer for file uploads
const storage = multer.diskStorage({
    destination:(req, file,cb) =>{
        cb(null,path.join(__dirname,"../uploads"));
    },
});

const upload =multer({storage})

const router =express.Router();

router.post('/signup',upload.single('Image'), signupUser);
router.post('/login',loginUser);
router.get('/get', getUser);

module.exports=router;