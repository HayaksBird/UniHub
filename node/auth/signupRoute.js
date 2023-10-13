const express = require('express');
const router = express.Router();

const { addUser, isUserUnique } = require('../db/database')
const { genSaltAndHash, checkAuthenticated, checkNotAuthenticated } = require('../controllers/controller')

router.post('/', async (req, res, next) => {
  const { username, email, password } = req.body;
  const isUnique = await isUserUnique(username, email);
  if(isUnique){
    const { salt, hash } = await genSaltAndHash(password)
    await addUser(username, email, hash, salt);
    
    res.status(200).send()
  } else{
    res.status(401).send()
  }
  
})


module.exports = router;



