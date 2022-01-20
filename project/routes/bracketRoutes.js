const { Bracket } = require('../models');
const express = require('express');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/', (req, res) => {
    
    Bracket.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/:id', (req, res) => {

    Bracket.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.get('/:name', (req, res) => {

    Bracket.findOne({ where: { name: req.params.name } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/', async (req, res) => {
   
    try{
        const obj = {
            name: req.body.name,
            type: req.body.type,
            size: req.body.size
        }
        
        Bracket.create(obj)
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
    
    Bracket.findOne({ where: { id: req.params.id } })
        .then( bracket => {
            bracket.name = req.body.name;
            bracket.type = req.body.type;
            bracket.size = req.body.size;
            bracket.status = req.body.status;
            bracket.tournamentId = req.body.tournamentId;
            bracket.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/:id', (req, res) => {

    Bracket.findOne({ where: { id: req.params.id } })
        .then( event => {
            event.destroy({ force: true })
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;