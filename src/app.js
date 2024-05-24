const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const connectDB = require('./config/db');
const { redisClient, getAsync, setAsync, delAsync } = require('./config/redis');

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

app.use((req, res, next) => {
    req.redisClient = redisClient;
    req.getAsync = getAsync;
    req.setAsync = setAsync;
    req.delAsync = delAsync;
    next();
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: err.message });
});

module.exports = app;
