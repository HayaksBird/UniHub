// Import the necessary modules and set up a router using Express
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Define a route that handles POST requests
router.post('/', async (req, res) => {
  try {
    // Send a POST request to an external server using Axios with the request body
    const response = await axios.post(`${process.env.SECOND_SERVER}/professors`, req.body);
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

// Define a route that handles DELETE requests with a professorId parameter
router.delete('/:professorId', async (req, res) => {
  try {
    // Extract the 'professorId' parameter from the URL
    const professorId = req.params.professorId;
    
    // Send a DELETE request to the second Java Spring server using Axios
    const response = await axios.delete(`${process.env.SECOND_SERVER}/professors/${professorId}`);
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

// Define a route that handles GET requests with a 'name' parameter in the URL
router.get('/:name', async (req, res) => {
  try {
    // Extract the 'name' parameter from the URL
    const name = req.params.name;
    const byName = req.query.byName || ''; // Extract the 'byName' query parameter

    let apiUrl = `${process.env.SECOND_SERVER}/professors/${name}`;

    // Append query parameter to the API URL if byName is provided and is either 'true' or 'false'
    if (byName.toLowerCase() === 'true' || byName.toLowerCase() === 'false') {
      apiUrl += `?byName=${byName.toLowerCase()}`;
    }

    // Send a GET request to the second Java Spring server using Axios
    const response = await axios.get(apiUrl);
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

// Define a route that handles GET requests without any parameters
router.get('/', async (req, res) => {
  try {
    console.log("i am here"); // Log a message
    // Send a GET request to the second Java Spring server using Axios
    const response = await axios.get(`${process.env.SECOND_SERVER}/professors`);
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
