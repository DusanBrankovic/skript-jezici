const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const tournamentRoutes = require('./tournamentRoutes');
const bracketRoutes = require('./bracketRoutes');

const express = require('express');

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.use('/users', userRoutes);
route.use('/events', eventRoutes);
route.use('/tournaments', tournamentRoutes);
route.use('/brackets', bracketRoutes);

module.exports = route;