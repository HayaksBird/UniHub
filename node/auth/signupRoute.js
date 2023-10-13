const express = require('express');
const router = express.Router();
const { generateRandomString } = require('../controllers/controller')
const sendEmail = require('./nodeMailer-config')
const { addUser, isUserUnique } = require('../db/database')
const { genSaltAndHash, checkAuthenticated, checkNotAuthenticated } = require('../controllers/controller')
require('dotenv').config();

router.post('/', async (req, res, next) => {
  const { username, email, password } = req.body;
  const isUnique = await isUserUnique(username, email);
  if(isUnique){
    const code =  generateRandomString()
    const { salt, hash } = await genSaltAndHash(password)

    console.log(email, code)

    sendEmail(email, code)
  
    await addUser(username, email, hash, salt, code); 

    res.status(200).send()
  } else{
    res.status(401).send()
  }
  
})

module.exports = router;



