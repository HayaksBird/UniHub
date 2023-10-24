const express = require('express')
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.SECOND_SERVER}/professors`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.delete('/:professorId', async (req, res) => {
  try {
    const professorId = req.params.professorId; 

    const response = await axios.delete(`${process.env.SECOND_SERVER}/professors/${professorId}`);
    console.log('After Axios request');
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } 

    res.status(500).json({ error: 'Internal server error' });
    
  }
});

router.get('/:name', async (req, res) => {
  try {
    const name = req.params.name;
    console.log(`${process.env.SECOND_SERVER}/professors/${name}`);

    const response = await axios.get(`${process.env.SECOND_SERVER}/professors/${name}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.get('/', async (req, res) => {
  try {
    console.log("i am here")
    const response = await axios.get(`${process.env.SECOND_SERVER}/professors`);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    }
    
    res.status(500).json({ error: 'Internal server error' });
    
  }
});

module.exports = router;
