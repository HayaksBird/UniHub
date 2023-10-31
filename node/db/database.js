const mysql = require('mysql2/promise');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const pool = mysql.createPool({
  host           : process.env.HOST,
  user           : "root",
  password       : process.env.PASSWORD,
  database       : "uniHub",
  connectionLimit: 10,
});

const sessionStore = new MySQLStore({ createDatabaseTable: true }, pool);

const isUserUnique = async (username, email) => {
  try {
    const [existingUsers] = await pool.query('SELECT * FROM user WHERE username = ? OR email = ?', [username, email]);

    return existingUsers.length === 0; 
  } catch (error) {
    console.error('Error checking user uniqueness:', error);
    return; 
  }
};

const addUser = async (username, email, password, salt, code) => {
  try {
    const [result] = await pool.query('INSERT INTO user (user_type, username, email, password, salt, hash_algorithm, confirmationCode) VALUES (?, ?, ?, ?, ?, ?, ?)', ['regular', username, email, password, salt, "bcrypt", code]);
    if (result.affectedRows === 1) {
      console.log('User added successfully');
    } else {
      console.log('Failed to add user');
    }
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

const findUserByUsername = async(username) => {
  const [user] = await pool.query(`SELECT * FROM user WHERE username = ?`, [username]);
  return user;
}

const findUserByEmail = async(email) => {
  const [user] = await pool.query(`SELECT * FROM user WHERE email = ?`, [email]);
  return user;
}

const findUserById = async(id) => {
  const [user] = await pool.query(`SELECT * FROM user WHERE id = ?`, [id])
  return user;
}

const getAllUsers = async () => {
  const [users] = await pool.query(`SELECT * FROM user`)
  console.log(users)
  return users
}

const getAllProfessors = async () => {
  const [professors] = await pool.query("SELECT * FROM professor")
  return professors
}

const addOauth2User = async (oauthId, email, accessToken, refreshToken) => {
  try {
    const result = await pool.query(
      'INSERT INTO user (user_type, oauth_id, email, access_token, refresh_token) VALUES (?, ?, ?, ?, ?)',
      ['oauth2', oauthId, email, accessToken, refreshToken]
    );

    if (result.affectedRows === 1) {
      console.log('User added successfully');
    } else {
      console.log('Failed to add user');
    }

  } catch (error) {
    console.error('Error adding user:', error);
  }
};




module.exports = { addUser, isUserUnique, findUserByUsername, findUserById, getAllUsers, getAllProfessors, findUserByEmail, addOauth2User, sessionStore}
