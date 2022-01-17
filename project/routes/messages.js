const express = require('express');
const { sequelize, Users, Messages } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) { //Ovde se malo razlikuje od logina, razlika je u dohvatanju tokena
    //Ovde dospevaju html requestovi razliciti od onih koji dolaze od login.html, register.html i index.html
    //Ove requestove saljemo Ajax-om i unutar takvih requestova mi saljemo authorization header
    //To znaci da ne saljemo token kao cookie nego ga bas saljemo kroz header i zato je nacin za dolazenje do tokena drugaciji
    const authHeader = req.headers['authorization']; //taj header se bas ovako i zove
    const token = authHeader && authHeader.split(' ')[1];
  
    //kada ga dohvatimo, ako ga dohvatimo autentifikaciju radimo isto
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

//Ovde nismo eksplicitno koristili authToken zato sto linija ispod znaci da ce sve rute u ovom paketu da ga koriste
route.get('/users', (req, res) => {
    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/messages', (req, res) => {
    Messages.findAll({ include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/messages', (req, res) => {
    
    //Dobro je sto uzimamo userID iz requesta jer tako obezbedjujemo da logovani korisnik moze samo za sebe da kreira nove poruke
    Users.findOne({ where: { id: req.user.userId } }) //Nadje usera koji je ulogovan, req.user se nalazi tu zbog route.use(authToken) koji smesti objekat usera u request
        .then( usr => { //ako nadje 
            if (usr.admin) { //Ako je user admin
                Messages.create({ body: req.body.body, userId: req.user.userId }) //Kreira novu poruku, setuje tekst i id usera cija je poruka
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) ); //ako ne nadje
        
});

module.exports = route;