const express = require('express')
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.SECOND_SERVER}/reviews`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } 

    res.status(500).json({ error: 'Internal server error' });

  }
});

router.delete('/:Id', async (req, res) => {
  try { 
    const response = await axios.delete(`${process.env.SECOND_SERVER}/reviews/${req.params.Id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.get('/:Id', async (req, res) => {
  try {
    const reviewId = req.params.Id;
    const response = await axios.get(`${process.env.SECOND_SERVER}/reviews/${reviewId}`);
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



module.exports = router;







