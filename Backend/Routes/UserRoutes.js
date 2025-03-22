const express =require('express');
const multer= require("multer");
const path =require("path");
const {signupUser, loginUser, getUser,} = require('../Controllers/UserControllers');

// Configer multer for file uploads
const storage = multer.diskStorage({
    destination:(req, file,cb) =>{
        cb(null,path.join(__dirname,"../uploads"));
    },
     filename: (req, file,cb) =>{
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null,file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
        },
});

const upload =multer({storage})

const router =express.Router();

router.post('/signup',upload.single('Image'), signupUser);
router.post('/login',loginUser);
router.get('/get', getUser);

module.exports=router;