const mysql = require('mysql2/promise');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: "root",
  password: process.env.PASSWORD,
  database: "uniHub",
  connectionLimit: 10,
});

const sessionStore = new MySQLStore({ createDatabaseTable: true }, pool);

const isUserUnique = async (username, email) => {
  try {
    const [existingUsers] = await pool.query('SELECT * FROM user_table WHERE username = ? OR email = ?', [username, email]);

    return existingUsers.length === 0; 
  } catch (error) {
    console.error('Error checking user uniqueness:', error);
    return; 
  }
};

const addUser = async (username, email, password, salt, code) => {
  try {
    const [result] = await pool.query('INSERT INTO user_table (username, email, password, salt, hash_algorithm, confirmationCode) VALUES (?, ?, ?, ?, ?, ?)', [username, email, password, salt, "bcrypt", code]);
    console.log(result)
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
  const [user] = await pool.query(`SELECT * FROM user_table WHERE username = ?`, [username]);
  return user;
}

const findUserById = async(id) => {
  const [user] = await pool.query(`SELECT * FROM user_table WHERE id = ?`, [id])
  return user;
}

const getAllUsers = async () => {
  const [users] = await pool.query(`SELECT * FROM user_table`)
  console.log(users)
  return users
}

const getAllProfessors = async () => {
  const [professors] = await pool.query("SELECT * FROM professor_table")
  return professors
}


module.exports = { addUser, isUserUnique, findUserByUsername, findUserById, getAllUsers, getAllProfessors, sessionStore}