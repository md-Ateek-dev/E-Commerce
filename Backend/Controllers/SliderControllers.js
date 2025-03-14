const mongoose =require('mongoose');
const Slider = require("../Models/Slider");


// Post Api 


const saveSlider = async(req, res)=>{
    try {
        const { SliderTitle} = req.body;
        const SliderImage = req.file ? req.file.filename : null;
        const slider = new Slider ({SliderImage, SliderTitle});
        await slider.save();
        res.status(200).json({message: 'Slider saved Successfully', slider});
    } catch (err) {
        res.status(500).json({message:"Internal Server Error", error: err.message });
    }
};


//  Get Api

const getSlider = async(req, res) =>{
    try {
        const sliders = await Slider.find();
    res.status(201).json({message:"Slider fetched successfully", sliders});
    } catch (err) {
        res.status(500).json({message:"Error fetching Slider", error: err.message});
    }
};


//   Edit Api 

const editSlider =async(req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"Invailid Slider ID"});
    }
    
    try {
    if(req.file){
        req.body.SliderImage = req.file ? req.file.filename: null
    }
    const updatedSlider = await Slider.findByIdAndUpdate(id, req.body, {new: true, recursive: true });
    if(!updatedSlider){
        return res.status(404).json({message:"Slider not found Successfully"});
    }
    res.status(200).json({message:"Slider updated Successfully", updatedSlider});
} catch (err) {
      res.status(400).json({message:"Error Updating Slider", error: err.message});
    }
};


//   Delete Api


const deleteSlider = async(req, res)=>{
    
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invailid Slider"});
        }
        const slider= await Slider.findByIdAndDelete(id);
        if(!slider){
            return res.status(404).json({message:"Slider not Found"});
        }
        res.status(200).json({message:"Slider Deleted Successfully"});
    } catch (err) {
        
        
    }
}







module.exports= {}