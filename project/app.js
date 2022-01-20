const express = require('express');
const { sequelize } = require('./models');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/admin', adminRoutes);

app.listen({ port: 8001 }, async () => {
    await sequelize.authenticate();
    console.log("Pokrenut app server");
});