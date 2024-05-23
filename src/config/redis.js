const redis = require('redis');
const { promisify } = require('util');
const { redis_uri } = require('./config');

const redisClient = redis.createClient(redis_uri);


redisClient.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error}`);
});

redisClient.on('connect', () => {
    console.log('Redis client connected to the server');
});

(async () => {
    try {
        await redisClient.connect();
        console.log('Redis client successfully connected');
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
    }
})();


const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

module.exports = { redisClient, getAsync, setAsync, delAsync };