// Import the Express and Axios libraries
const express = require('express');
const axios = require('axios');

// Create an Express router
const router = express.Router();

// Load environment variables from .env file
require('dotenv').config();

// POST route to create a new review
router.post('/', async (req, res) => {
  // Try to make a POST request to the second server to create a new review
  try {
    const response = await axios.post(`${process.env.SECOND_SERVER}/reviews`, req.body);

    // If the request is successful, send the response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    // If the request fails, handle the error accordingly
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// DELETE route to delete a review
router.delete('/:Id', async (req, res) => {
  // Try to make a DELETE request to the second server to delete a review
  try {
    const response = await axios.delete(`${process.env.SECOND_SERVER}/reviews/${req.params.Id}`);

    // If the request is successful, send the response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    // If the request fails, handle the error accordingly
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// GET route to get a review by ID
router.get('/:Id', async (req, res) => {
  // Try to make a GET request to the second server to get a review by ID
  try {
    const reviewId = req.params.Id;
    const response = await axios.get(`${process.env.SECOND_SERVER}/reviews/${reviewId}`);

    // If the request is successful, send the response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    // If the request fails, handle the error accordingly
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      // If there is no response, handle the error accordingly
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.post('/last', async (req, res) => {
  // Try to make a GET request to the second server to get a review by ID
  try {
    const response = await axios.get(`${process.env.SECOND_SERVER}/reviews/last`);
    console.log(response.data)
    // If the request is successful, send the resposnse back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    // If the request fails, handle the error accordingly
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      // If there is no response, handle the error accordingly
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Export the router so that it can be used by other modules
module.exports = router;