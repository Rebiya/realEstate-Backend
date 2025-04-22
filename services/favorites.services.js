//import the db config
const db = require("../DB/dbconfig.js");

//create favorite
const createfavorite = async (favoriteData) => {
  const { user_email, residency_id } = favoriteData;

  const sql = `
    INSERT INTO favorites (user_email, property_id)
    VALUES (?, ?)
  `;

  const params = [user_email, residency_id];

  const result = await db.query(sql, params);
  return result;
};
//get favorites by user email don't return empty array so check using if or try catch
const getfavoritesByUserEmail = async (user_email) => {
  const sql = `
    SELECT * FROM favorites WHERE user_email = ?
  `;

  const params = [user_email];

  const result = await db.query(sql, params);
  if (result.length === 0) {
    return null;
  }
  return result;
};

//delete favorite
const deletefavorite = async (id) => {
  const sql = `
    DELETE FROM favorites WHERE property_id = ?
  `;
  const params = [id];

  const result = await db.query(sql, params);
  return result;
};
//export all functions
module.exports = {
  createfavorite,
  getfavoritesByUserEmail,
  deletefavorite
};