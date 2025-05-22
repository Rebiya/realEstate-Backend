//import db config using commonjs
const db = require("../DB/dbconfig.js");


//get all residencies using relational procedural database
const getAllResidencies = async () => {
const query = `SELECT * FROM residencies`;
return await db.query(query);
};
//get residency by id using relational procedural database
//get residency by id using relational procedural database
const getResidencyById = async (id) => {
  console.log("Fetching residency with ID:", id); // Add this for debugging
  const query = `SELECT * FROM residencies WHERE id = ?`;
  const result = await db.query(query, [id]);
  console.log("Database result:", result); // Add this for debugging
  return result;
};
// Service function with destructuring
const createResidency = async (residencyData) => {
    const {
      title,
      description,
      price,
      subcity,
      city,
      country,
      image_url,
      bedrooms,
      bathrooms,
      parking,
      user_email,
      created_at = new Date(),  // Default to current time if not provided
      updated_at = new Date()   // Default to current time if not provided
    } = residencyData;

    const sql = `
      INSERT INTO residencies 
      (title, description, price, subcity, city, country, image_url, bedrooms, 
       bathrooms, parking, user_email, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const params = [
      title,
      description,
      price,
      subcity,
      city,
      country,
      image_url,
      bedrooms,
      bathrooms,
      parking,
      user_email,
      created_at,
      updated_at
    ];

    const result = await db.query(sql, params);
    // console.log(result)
    return result;
 
};

//update residency using relational procedural database
const updateResidency = async (id, residencyData) => {
  const { 
    title, 
    description, 
    price, 
    subcity, 
    city, 
    country, 
    image_url, 
    bedrooms, 
    bathrooms, 
    parking 
  } = residencyData;

  const sql = `
    UPDATE residencies
    SET title = ?, description = ?, price = ?, subcity = ?, city = ?, 
        country = ?, image_url = ?, bedrooms = ?, bathrooms = ?, 
        parking = ?
    WHERE id = ?
  `;

  const params = [
    title,
    description,
    price,
    subcity,
    city,
    country,
    image_url,
    bedrooms,
    bathrooms,
    parking,
    id 
  ];

  const result = await db.query(sql, params);
  if (result.affectedRows === 0) {
    return null; 
  }
  
  // Return the updated residency data instead of just the result
  return {
    id,
    ...residencyData
  };
};

//delete residency using relational procedural database
const deleteResidency = async (id) => {
  try {
    // For most MySQL drivers, the result structure is [result, metadata]
    const result = await db.query("DELETE FROM residencies WHERE id = ?", [id]);
    
    console.log('Delete result:', result); // For debugging
    
    // Check affectedRows based on your specific DB driver's response structure
    if (result.affectedRows === 0) {
      return null;
    }
    return { id };
  } catch (error) {
    console.error('Delete error:', error); // Log the actual error
    throw new Error("Error deleting residency: " + error.message);
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
  };
  
