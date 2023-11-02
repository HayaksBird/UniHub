// Import the necessary modules and set up a router using Express
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Define a route that handles GET requests with a parameter in the URL
router.get('/:name', async (req, res) => {
  try {
    // Extract the 'name' parameter from the URL
    const name = req.params.name;
    console.log(`${process.env.SECOND_SERVER}/professors/${name}`); // Log a message

    // Send a GET request to the secon java spring server using Axios
    const response = await axios.get(`${process.env.SECOND_SERVER}/courses/${name}`);
    // Set the response status and send the data from the external server
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      // If the error has a response, send the error status and data to the client
      res.status(error.response.status).json(error.response.data);
    } else {
      // If there's an internal server error, send a generic error response
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Export the router for use in the application
module.exports = router;
