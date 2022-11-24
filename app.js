const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
var cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.write('<h1>Welcome to the Backend</h1>');
    res.end();
});

app.use('/user', userRoutes);

module.exports = app;