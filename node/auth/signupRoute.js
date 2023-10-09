const express = require('express');
const router = express.Router();
const path = require('path')

const { addUser, isUserUnique } = require('../db/database')
const { genSaltAndHash, checkAuthenticated, checkNotAuthenticated } = require('../controllers/controller')

router.post('/', async (req, res, next) => {
  const { username, email, password } = req.body;
  const isUnique = await isUserUnique(username, email);
  if(isUnique){
    const { salt, hash } = await genSaltAndHash(password)
    await addUser(username, email, hash, salt);
    
    res.json({ success: true })
  } else{
    res.json({ success: false })
  }
  
})


module.exports = router;



