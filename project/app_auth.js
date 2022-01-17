const express = require('express');
const { sequelize, User } = require('./models'); //Treba nam sequelize da bismo dohvatili iz baze podatke koji nam trebaju (password Usera)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config(); //Ucitava isti .env fajl koji ucitava i app.js. Sto znaci da imamo deljeni secret da bismo da isti nacin enkriptovali i dekriptovali

const app = express();

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

app.use(express.json()); //Ovaj middleware koristimo da bi mogli da uymemo req.body
app.use(cors(corsOptions));

app.post('/register', (req, res) => {
    
    console.log("Usao u /register");
    const obj = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        banned: req.body.staff
    };

    User.create(obj).then( row => {

        const user = {
            userId: row.id,
            username: row.username
        };

        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        console.log("Register: " + token);

        res.json({ token: token });
    })
    .catch( err => res.status(500).json(err) );

});

app.post('/login', (req, res) => {

    console.log("Usao u /login");
    console.log(req.body.username);

    User.findOne({ where: { username: req.body.username } })
        .then( user => {

            if(bcrypt.compareSync(req.body.password, user.password)) {
                const obj = {
                    userId: user.id,
                    username: user.username
                };

                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);

                console.log("Login: " + token);

                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials" });
            }
        })
        .catch( err => res.status(500).json(err) );
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
    console.log("Auth server started");
});

//Ovaj .js sluzi da prihvati login i register i ako oni uspeju, da kreira token

// Imamo dve rute /register i /login
// app.post('/register', (req, res) => {

//     //Formiramo objekat novog usera tako sto pokupimo podatke iz req.body
//     //Sve sto je u req.body je klijent popunio na klijenskoj aplikaciji i poslao nam preko requesta
//     const obj = { //nemamo id jer ce on biti kreiran automatski
//         name: req.body.name,
//         email: req.body.email,
//         admin: req.body.admin,
//         //Pripremimo password tako sto ga enkriptujemo (zbog ovoga u login-u ispod dekriptujemo password)
//         password: bcrypt.hashSync(req.body.password, 10)
//     };

//     //Kreiramo objekat
//     Users.create(obj).then( rows => { //Ako uspe
        
//         const usr = {
//             userId: rows.id,
//             user: rows.name
//         };

//         //Ovo ispod automatski loginuje usera ako je sve okej
//         const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

//         console.log(token);
        
//         res.json({ token: token });

//     }).catch( err => res.status(500).json(err) ); //Ako ne uspe da kreira vraca FORBIDDEN
// });

// app.post('/login', (req, res) => { //req dobijamo iz login.js

//     Users.findOne({ where: { name: req.body.name } }) //Trazimo Usera po imenu
//         .then( usr => { //Ako nadje usera. Rezultat pretrage u bazi je usr sto predstavlja naseg usera iz baze

//             //Koristi se bcrypt zato sto se u bazi ne cuva plain text passworda nego se on cuva enkriptovan
//             if (bcrypt.compareSync(req.body.password, usr.password)) { //Uporedjuje password iz req.body i poredi sa passwordom iz baze za tog usera
//                 const obj = { //Kreiramo ovaj objekat zato sto nas zanimaju samo id i name usera
//                     userId: usr.id,
//                     user: usr.name
//                 };
        
//                 //Kreiramo token tako sto enkriptujemo ovaj objekat iznad
//                 const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
//                 //Posaljemo klijentu takav token
//                 res.json({ token: token });
//             } else {
//                 res.status(400).json({ msg: "Invalid credentials"});
//             }
//         })
//         .catch( err => res.status(500).json(err) ); //Ako ne nadje usera
// });
