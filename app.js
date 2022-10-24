const express = require('express');
const app = express();
const user = require('./routes/user');

app.use(express.json());

app.get('/', (req, res) => {
    res.write('<h1>Welcome to the Backend</h1>');
    res.end();
});

app.use('/user', user);

module.exports = app;