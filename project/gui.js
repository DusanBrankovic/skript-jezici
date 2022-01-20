const express = require('express');
const { sequelize, User } = require('./models');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
}

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}

app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static/html' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static/html' });
});

app.get('/admin', (req, res) => {
    res.sendFile('hub.html', { root: './static/html' });
})

app.get('/admin/users', (req, res) => {
    res.sendFile('userAdministration.html', { root: './static/html' });
});

app.get('/admin/users/updateUser/:id', (req, res) => {
    res.sendFile('updateUser.html', { root: './static/html' });
});

app.get('/admin/events', (req, res) => {
    res.sendFile('eventAdministration.html', { root: './static/html' });
});

app.get('/admin/events/updateEvent/:id', (req, res) => {
    res.sendFile('updateEvent.html', { root: './static/html' });
});

app.get('/admin/events/:id/tournaments', (req, res) => {
    res.sendFile('tournamentAdministration.html', { root: './static/html' });
});

app.get('/admin/events/:id/updateTournament/:id', (req, res) => {
    res.sendFile('updateTournament.html', { root: './static/html' });
});

app.get('/admin/events/:id/tournaments/:id/chooseBracket', (req, res) => {
    res.sendFile('bracketAdministration.html',  { root: './static/html' });
});

app.get('/admin/tournaments', (req, res) => {
    res.sendFile('tournamentView.html',  { root: './static/html' });
});

app.get('/admin/brackets', (req, res) => {
    res.sendFile('bracketAdministration.html',  { root: './static/html' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('hub.html', { root: './static/html' });
});

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});