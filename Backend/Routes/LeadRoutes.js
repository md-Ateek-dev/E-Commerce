const express = require('express');
const { signupLead, editLead, deleteLead, getLead } = require('../Controllers/LeadControllers');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../uploads'))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

const router = express.Router();

// Serve static uploads folder
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

router.post('/leads/post', upload.single('ProductImage'), signupLead);
router.get('/leads/get', getLead);
router.put('/leads/edit/:id', upload.single('ProductImage'), editLead);
router.delete('/leads/delete/:id', deleteLead);

module.exports = router;
