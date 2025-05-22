const db = require('../DB/dbconfig.js');

module.exports = {
  getAllUsers: async () => {
    try {
      return await db.query('SELECT * FROM users');
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },

  registerUser: async (userData) => {
    try {
      const { email, auth0_id = null, fname, lname, phone_number } = userData;
      const result = await db.query(
        `INSERT INTO users (email, auth0_id, fname, lname, phone_number) 
         VALUES (?, ?, ?, ?, ?)`,
        [email, auth0_id, fname, lname, phone_number]
      );
      return result;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw { status: 409, message: 'Email already exists' };
      }
      throw { status: 500, message: 'Failed to register user' };
    }
  },

  updateUser: async (uuid, userData) => {
    try {
      const { email, fname, lname, phone_number } = userData;
      const result = await db.query(
        `UPDATE users 
         SET email = ?, fname = ?, lname = ?, phone_number = ? 
         WHERE uuid = ?`,
        [email, fname, lname, phone_number, uuid]
      );
      
      if (result.affectedRows === 0) {
        throw { status: 404, message: 'User not found' };
      }
      return result;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw { status: 409, message: 'Email already exists' };
      }
      throw { status: error.status || 500, message: error.message || 'Failed to update user' };
    }
  },

  deleteUser: async (uuid) => {
    try {
      const result = await db.query(
        'DELETE FROM users WHERE uuid = ?',
        [uuid]
      );
      
      if (result.affectedRows === 0) {
        throw { status: 404, message: 'User not found' };
      }
      return result;
    } catch (error) {
      throw { status: error.status || 500, message: error.message || 'Failed to delete user' };
    }
  }
};