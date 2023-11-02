// Import the Redis client for caching
const redisClient = require('../cache/redis-config');

// Function to get data from the cache or set it if not found
const getOrSetCache = (key, cb, exp) => {
  return new Promise((resolve, reject) => {
    // Attempt to get data from the cache
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error); // Handle any Redis client error

      if (data != null) return resolve(JSON.parse(data)); // If data is found in the cache, return it

      // If data is not found in the cache, fetch it using the provided callback
      const freshData = await cb();

      // Set the data in the cache with an expiration time
      redisClient.setex(key, exp, JSON.stringify(freshData));
      resolve(freshData); // Return the fetched data
    });
  });
}

// Function to update the cache with a new value for a given key
const updateCache = (key, valueToAdd) => {
  //
}

// Export the getOrSetCache function for use in the application
module.exports = { getOrSetCache };
