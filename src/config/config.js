const dotenv = require('dotenv');

// loading the environment variables
dotenv.config();

const port = process.env.PORT || 3000;
const db = process.env.MONGODB_LOCAL_URI || process.env.MONGODB_ONLINE_URI;
const secret = process.env.JWT_SECRET;
const redis_uri = process.env.REDIS_URI;

module.exports = { port, db, secret, redis_uri };