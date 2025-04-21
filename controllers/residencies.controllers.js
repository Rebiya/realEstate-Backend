//import the residencies service
const residenciesService = require("../services/residencies.services.js");

//get all residencies
const getAllResidencies = async (req, res) => {
  try {
    const residencies = await residenciesService.getAllResidencies();
    res.status(200).json(residencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message
    )
  }
};
//get residency by id
const getResidencyById = async (req, res) => {
  try {
    const residency = await residenciesService.getResidencyById(req.params.id);
    if (!residency) {
      return res.status(404).json({ message: "Residency not found" });
    }
    res.status(200).json(residency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//create residency
const createResidency = async (req, res) => {
  try {
    const residency = await residenciesService.createResidency(req.body);
    // console.log(residency)
    res.status(201).json(residency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update residency
const updateResidency = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedResidency = await residenciesService.updateResidency(id, req.body);
    
    if (!updatedResidency) {
      return res.status(404).json({ message: "Residency not found" });
    }
    
    res.status(200).json({ 
      success: true,
      message: "Residency updated successfully",
      data: updatedResidency
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete residency
const deleteResidency = async (req, res) => {
  try {
    const residency = await residenciesService.deleteResidency(req.params.id);
    
    if (!residency) {
      const errorMessage = `Residency not found with ID: ${req.params.id}`;
      console.log(errorMessage);
      return res.status(404).json({ message: errorMessage });
    }
    
    console.log(`Successfully deleted residency with ID: ${req.params.id}`);
    return res.status(204).end();
  } catch (error) {
    console.error('Controller error:', error);
    return res.status(500).json({ 
      message: `Error deleting residency: ${error.message}` 
    });
  }
};





//export all controllers
module.exports = {
  getAllResidencies,
  getResidencyById,
  createResidency,
  updateResidency,
  deleteResidency,
};
