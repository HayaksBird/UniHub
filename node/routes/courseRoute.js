const express = require('express')
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/:name', async (req, res) => {
  try {
    const name = req.params.name;
    console.log(`${process.env.SECOND_SERVER}/professors/${name}`);

    const response = await axios.get(`${process.env.SECOND_SERVER}/courses/${name}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

module.exports = router;