const db = require('../DB/dbconfig.js');

// Get all users
async function getAllUsers() {
    const query = `SELECT * FROM users`;
    return await db.query(query);
}
async function registerUser(userData) {
    const { email, auth0_id, fname, lname, phone_number } = userData;
    const query = `INSERT INTO users (email, auth0_id, fname, lname, phone_number) VALUES (?, ?, ?, ?, ?)`;
    return await db.query(query, [email, auth0_id, fname, lname, phone_number]);
}

module.exports = {
    getAllUsers,
    registerUser
};
