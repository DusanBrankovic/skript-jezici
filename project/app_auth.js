const express = require('express');
const { sequelize, User } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/register', (req, res) => {
    
    console.log("Usao u /register");
    console.log(req.body.mod);
    const obj = {
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        admin: req.body.admin,
        mod: req.body.mod
    };

    User.create(obj).then( row => {

        const user = {
            userId: row.id,
            name: row.name,
            admin: row.admin,
            mod: row.mod
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

    User.findOne({ where: { name: req.body.name } })
        .then( user => {

            if(bcrypt.compareSync(req.body.password, user.password)) {
                const obj = {
                    userId: user.id,
                    name: user.name,
                    admin: user.admin
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


