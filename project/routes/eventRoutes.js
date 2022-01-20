const { Event } = require('../models');
const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/', (req, res) => {

    Event.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/:id', (req, res) => {

    Event.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.get('/:name', (req, res) => {

    Event.findOne({ where: { name: req.params.name } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/', async (req, res) => {
   
    try{
        const obj = {
            name: req.body.name,
            description: req.body.description,
            dateFrom: req.body.dateFrom,
            dateTo: req.body.dateTo
        }
        
        Event.create(obj)
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
    
    Event.findOne({ where: { id: req.params.id } })
        .then( event => {
            event.name = req.body.name;
            event.description = req.body.description;
            event.dateFrom = req.body.dateFrom;
            event.dateTo = req.body.dateTo;

            event.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/:id', (req, res) => {

    Event.findOne({ where: { id: req.params.id } })
        .then( event => {

            event.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;