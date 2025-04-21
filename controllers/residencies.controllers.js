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
    res.status(201).json(residency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update residency
const updateResidency = async (req, res) => {
  try {
    const residency = await residenciesService.updateResidency(
      req.params.id,
      req.body
    );
    if (!residency) {
      return res.status(404).json({ message: "Residency not found" });
    }
    res.status(200).json(residency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//delete residency
const deleteResidency = async (req, res) => {
  try {
    const residency = await residenciesService.deleteResidency(req.params.id);
    if (!residency) {
      return res.status(404).json({ message: "Residency not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get residencies by user email
const getResidenciesByUserEmail = async (req, res) => {
  try {
    const residencies = await residenciesService.getResidenciesByUserEmail(
      req.params.email
    );
    if (!residencies) {
      return res.status(404).json({ message: "Residency not found" });
    }
    res.status(200).json(residencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




//export all controllers
module.exports = {
  getAllResidencies,
  getResidencyById,
  createResidency,
  updateResidency,
  deleteResidency,
  getResidenciesByUserEmail,
};
