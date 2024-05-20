const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error(error.stack);
    console.error('Something broke!');
});

module.exports = app;
