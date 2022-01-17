const express = require('express');
const { sequelize, Staff } = require('./models');
const msgs = require('./routes/messages'); //Pokupi ih kao modul
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config(); //pokupi iz .env da bi mogli da koristimo ACCESS_TOKEN_SECRET
//ACCESS_TOKEN_SECRET je kljuc kojim zakljucavamo sadrzaj tokena

const app = express();

app.use('/api', msgs); //rute koje koristi

function getCookies(req) { //Pokuplja cookie-je
    if (req.headers.cookie == null) return {};

    //Format jednog cooki-ja je name=value
    const rawCookies = req.headers.cookie.split('; '); //Ako imamo vise cookie-ja oni ce biti razdvojeni ;
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => { //Za svaki cookie splituje po = 
        //Za primer lampa=2
        const parsedCookie = rawCookie.split('='); 
        //Kreira se 'hash tabela' gde je key = 'lampa' a value = 2
        //Pa se cookie-ima pristupa preko naziva kao cookies['name']=2
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};
//Dohvata token iz cookie-ja i raspakuje ga
//Ovo je middleware koji se ubacuje izmedju res i req i kada on zavrsi svoj posao preko next-a zna koja je sledeca funkcija
function authToken(req, res, next) { //next referenca na sledecu funkciju u nizu
    const cookies = getCookies(req); //Dohvata cookie
    const token = cookies['token']; //Izvlaci token
  
    if (token == null) return res.redirect(301, '/login');  //Ako je token null vraca se na login stranicu
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { //Ovo user je zapravo raspakovan objekat koji je dekriptovan uz pomoc .env
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user; //Svuda gde je koriscen ovaj middlware on u svom req-tu sadrzi req.user
    
        next();
    });
}

//Login i register nemaju middleware zato sto svako treba da ima pristup tim stranicama
// app.get('/register', (req, res) => { //rute koje serviraju .html fajlove iz foldera static
//     res.sendFile('register.html', { root: './static' }); 
// });

// app.get('/login', (req, res) => { //rute koje serviraju .html fajlove iz foldera static
//     res.sendFile('login.html', { root: './static' });
// });

//Index.html ima middleware zato sto mogu da mu pristupe samo logovani korisnici
// app.get('/', authToken, (req, res) => {
//     //Ovde moze da se ubaci provera tipa korisnika, na primer: if(req.user.role == 'admin'){}
//     res.sendFile('index.html', { root: './static' }); //rute koje serviraju .html fajlove iz foldera static
// });

app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
})

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('welcome.html', { root: './static' });
});

app.use(express.static(path.join(__dirname, 'static'))); //Koristimo fajlove iz static foldera

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate(); //Kacimo se na sequelize
    console.log("Pokrenut app server");
});