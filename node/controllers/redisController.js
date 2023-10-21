const redisClient = require('../cache/redis-config')

const getOrSetCache = (key, cb, exp) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error)
      if (data != null) return resolve(JSON.parse(data))
      const freshData = await cb();
      redisClient.setex(key, exp, JSON.stringify(freshData))
      resolve(freshData)
    })
  })
}

const updateCache = (key, valueToAdd) => {
  //
}



module.exports = { getOrSetCache }