//import db config using commonjs
const db = require("../DB/dbconfig.js");


//get all residencies using relational procedural database
const getAllResidencies = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM residencies");
    return rows;
  } catch (error) {
    throw new Error("Error fetching residencies: " + error.message);
  }
};
//get residency by id using relational procedural database
const getResidencyById = async (id) => {
  try {
    const [rows] = await db.query("SELECT * FROM residencies WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    throw new Error("Error fetching residency: " + error.message);
  }
};
//create residency using relational procedural database
const createResidency = async (residencyData) => {
  try {
    const [result] = await db.query("INSERT INTO residencies SET ?", [residencyData]);
    return { id: result.insertId, ...residencyData };
  } catch (error) {
    throw new Error("Error creating residency: " + error.message);
  }
};
//update residency using relational procedural database
const updateResidency = async (id, residencyData) => {
  try {
    const [result] = await db.query("UPDATE residencies SET ? WHERE id = ?", [residencyData, id]);
    if (result.affectedRows === 0) {
      return null;
    }
    return { id, ...residencyData };
  } catch (error) {
    throw new Error("Error updating residency: " + error.message);
  }
};
//delete residency using relational procedural database
const deleteResidency = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM residencies WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return null;
    }
    return { id };
  } catch (error) {
    throw new Error("Error deleting residency: " + error.message);
  }
};
//get residencies by user email using relational procedural database
const getResidenciesByUserEmail = async (email) => {
  try {
    const [rows] = await db.query("SELECT * FROM residencies WHERE user_email = ?", [email]);
    return rows;
  } catch (error) {
    throw new Error("Error fetching residencies by user email: " + error.message);
  }
};
//export all functions
// At the end of residencies.services.js
module.exports = {
    getAllResidencies,
    getResidencyById,
    createResidency,
    updateResidency,
    deleteResidency,
    getResidenciesByUserEmail,
  };
  
