const mongoose = require ('mongoose');



const sliderSchema = new mongoose.Schema({
    
    SliderImage:{
        type:String,
      
    },
    SliderTitle:{
        type:String,
        required:true
    },
});

const Slider = mongoose.model('Slider', sliderSchema);
module.exports= Slider;
