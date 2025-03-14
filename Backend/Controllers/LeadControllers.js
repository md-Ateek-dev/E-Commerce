const { default: mongoose } = require("mongoose");
const Lead = require("../Models/Lead");



// Post API for Leads

const signupLead = async (req, res) => {
    try {
      const { Productname, Price, Description, Date, Category } = req.body;
      
      // Fixing Image URL
      const ProductImage = req.file ? req.file.filename : null;
      const lead = new Lead({ Productname, Price, ProductImage, Description, Date, Category });
  
      await lead.save();
      res.status(201).json({ message: "Lead posted successfully!", lead });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };
  
  // Get API
  const getLead = async (req, res) => {
    try {
      const leads = await Lead.find();
      res.status(200).json({ message: "Leads fetched successfully", leads });
    } catch (err) {
      res.status(500).json({ message: "Error fetching leads", error: err.message });
    }
  };
  
//  Edit Api

const editLead = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Product ID" });
    }
    

    try {
      
      if(req.file){
        req.body.ProductImage = req.file ? req.file.filename:null
      }
        const updatedLead = await Lead.findByIdAndUpdate(id, req.body, { new: true ,recursive:true });

        if (!updatedLead) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", updatedLead });
    } catch (err) {
        res.status(400).json({ message: "Error updating product", error: err.message });
    }
};


//  Delete Api

const deleteLead = async(req, res)=>{
   try {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"Invailid user "});
    }
    const lead = await Lead.findByIdAndDelete(id);
    if(!lead){
        return res.status(404).json({message:"user not found"});
    }
    res.status(200).json({message:"User deleted successfully"});
   } catch (err) {
    res.status(500).json({message:"Error deleteing user", error: err.message});
   }
}

module.exports= {signupLead,editLead,deleteLead,getLead}