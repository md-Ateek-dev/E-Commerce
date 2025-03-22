const express = require ('express');
const {saveSlider, getSlider, editSlider, deleteSlider } = require ('../Controllers/SliderControllers');
const multer = require('multer');
const path = require ('path');


const storage = multer.diskStorage({
    destination:(req, file,cb) =>{
           cb(null,path.join(__dirname,"../uploads"));
       },
    filename: (req, file,cb) =>{
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null,file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({storage});


const router = express.Router();

// server staticc uploads folder
router.use ('/uploads', express.static(path.join(__dirname, '../uploads')));

router.post('/post', upload.single('SliderImage'), saveSlider);
router.get('/get', getSlider);
router.put('/edit/:id', upload.single('SliderImage'), editSlider);
router.delete('/delete/:id', deleteSlider);

module.exports = router;