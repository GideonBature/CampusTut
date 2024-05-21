const redis = require('redis');
const { promisify } = require('util');
const { redis_uri } = require('./config');

const redisClient = redis.createClient(redis_uri);

redisClient.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error}`);
});

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

module.exports = { redisClient, getAsync, setAsync, delAsync };