const mongoose = require('mongoose');
const Slider = require("../Models/Slider");

// Post API
const saveSlider = async (req, res) => {
    try {
        const { SliderTitle } = req.body;
        const SliderImage = req.file ? req.file.filename : null;

        const slider = new Slider({ SliderImage, SliderTitle });
        await slider.save();

        res.status(201).json({ message: 'Slider saved successfully', slider });
    } catch (err) {
        console.error("Error saving slider:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Get API
const getSlider = async (req, res) => {
    try {
        const sliders = await Slider.find();
        res.status(200).json({ message: "Sliders fetched successfully", sliders });
    } catch (err) {
        console.error("Error fetching sliders:", err);
        res.status(500).json({ message: "Error fetching sliders", error: err.message });
    }
};

// Edit API
const editSlider = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Slider ID" });
    }

    try {
        const updateData = { ...req.body };

        if (req.file) {
            updateData.SliderImage = req.file.filename;
        }

        const updatedSlider = await Slider.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedSlider) {
            return res.status(404).json({ message: "Slider not found" });
        }

        res.status(200).json({ message: "Slider updated successfully", updatedSlider });
    } catch (err) {
        console.error("Error updating slider:", err);
        res.status(400).json({ message: "Error updating slider", error: err.message });
    }
};

// Delete API
const deleteSlider = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Slider ID" });
        }

        const slider = await Slider.findByIdAndDelete(id);

        if (!slider) {
            return res.status(404).json({ message: "Slider not found" });
        }

        res.status(200).json({ message: "Slider deleted successfully" });
    } catch (err) {
        console.error("Error deleting slider:", err);
        res.status(500).json({ message: "Error deleting slider", error: err.message });
    }
};

module.exports = { saveSlider, getSlider, editSlider, deleteSlider };