const { User } = require('../models');
const { authSchema, registerSchema } = require('../joi/userSchema');
const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1].split('\.')[1];
    payload = JSON.parse(atob(token));
    
    if(payload.admin === false)
        res.status(403).json({ message: "You do not have admin priveledges!"});
    else{
        User.findAll()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    }
    
});

route.get('/:id', (req, res) => {

    User.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.get('/:name', (req, res) => {

    User.findOne({ where: { name: req.params.name } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/', async (req, res) => {
   
    try{
        const dataValid = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        }
        await registerSchema.validateAsync(dataValid);
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        
        User.create({ name: req.body.name, email: req.body.email, password: hashPassword, admin: req.body.admin, mod: req.body.mod })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    }
    catch(err){
        console.log(err);
        const data = {
            msg: err.details[0].message
        }
        console.log(data);
        return res.status(400).json(data);
    }
});

route.put('/:id', (req, res) => {
    
    User.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.name = req.body.name;
            usr.admin = req.body.admin;
            usr.mod = req.body.mod;
            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/:id', (req, res) => {

    User.findOne({ where: { id: req.params.id } })
        .then( user => {
            user.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;