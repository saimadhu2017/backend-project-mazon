const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
var cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.write('<h1>Welcome to the Backend</h1>');
    res.end();
});

app.use('/auth', authRoutes);

module.exports = app;