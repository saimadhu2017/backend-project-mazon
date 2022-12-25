const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
var cookieParser = require('cookie-parser');
var cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
    res.write('<h1>Welcome to the Backend</h1>');
    res.end();
});

//Project Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);

module.exports = app;