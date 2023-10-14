const express = require('express')
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.SECOND_SERVER}/professors`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

router.delete('/', async (req, res) => {
  try {
    const response = await axios.delete(`${process.env.SECOND_SERVER}/professors`, { data: req.body });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

router.get('/:professorId', async (req, res) => {
  try {
    const professorId = req.params.professorId; 

    const response = await axios.get(`${process.env.SECOND_SERVER}/professors/${professorId}`);
    console.log('After Axios request');
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      // If there is no response, handle the error accordingly
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// const response = await axios.get(`https://5038-46-106-249-149.ngrok.io/professors/${professorId}`);
// console.log(response)

module.exports = router;
