const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.write('<h1>Welcome to the Backend</h1>');
    res.end();
})

app.get('/error', (req, res, next) => {
    next('custom');
})

app.use((err, req, res, next) => {
    res.write(`<p>Error is ${err}</p>`);
    res.end();
})

module.exports = app;