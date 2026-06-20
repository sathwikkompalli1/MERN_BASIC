const express = require('express');
const cors    = require('cors');
const path    = require('path');
const app     = express();

app.use(cors());

app.use(express.json());

app.use('/api/users',    require('./src/router/user.router'));
app.use('/api/products', require('./src/router/product.router'));
app.use('/api/orders',   require('./src/router/order.router'));

app.use(express.static(path.join(__dirname, 'frontend')));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

module.exports = app;

