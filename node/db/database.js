// Import the necessary modules
const mysql = require('mysql2/promise');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.HOST,
  user: "root",
  password: process.env.PASSWORD,
  database: "uniHub",
  connectionLimit: 10,
});

// Create a session store using MySQL for Express
const sessionStore = new MySQLStore({ createDatabaseTable: true }, pool);

// Function to check if a user is unique by username and email
const isUserUnique = async (username, email) => {
  try {
    const [existingUsers] = await pool.query('SELECT * FROM user WHERE username = ? OR email = ?', [username, email]);
    return existingUsers.length === 0;
  } catch (error) {
    console.error('Error checking user uniqueness:', error);
    return;
  }
};

// Function to add a user to the database
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

// Function to find a user by their username
const findUserByUsername = async (username) => {
  const [user] = await pool.query(`SELECT * FROM user WHERE username = ?`, [username]);
  return user;
}

// Function to find a user by their email
const findUserByEmail = async (email) => {
  const [user] = await pool.query(`SELECT * FROM user WHERE email = ?`, [email]);
  return user;
}

// Function to find a user by their ID
const findUserById = async (id) => {
  const [user] = await pool.query(`SELECT * FROM user WHERE id = ?`, [id]);
  return user;
}

// Function to get all users from the database
const getAllUsers = async () => {
  const [users] = await pool.query(`SELECT * FROM user`);
  console.log(users);
  return users;
}

// Function to get all professors from the database
const getAllProfessors = async () => {
  const [professors] = await pool.query("SELECT * FROM professor");
  return professors;
}

// Function to add an OAuth2 user to the database
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

// Export the functions and session store for use in the application
module.exports = {
  addUser,
  isUserUnique,
  findUserByUsername,
  findUserById,
  getAllUsers,
  getAllProfessors,
  findUserByEmail,
  addOauth2User,
  sessionStore
};
