const express = require('express')
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

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.SECOND_SERVER}/professors`, { params: req.query });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

module.exports = router;
