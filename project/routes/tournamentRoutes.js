const { Tournament } = require('../models');
const express = require('express');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/', (req, res) => {
    Tournament.findAll()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
});

route.get('/:id', (req, res) => {

    Tournament.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/', async (req, res) => {
  
    try{
        const obj = {
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            eventId: req.body.eventId
        }
        
        Tournament.create(obj)
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
    
    Tournament.findOne({ where: { id: req.params.id } })
        .then( tour => {

            if(tour.bracketId == -1){

                tour.name = req.body.name;
                tour.description = req.body.description;
                tour.date = req.body.date;
                tour.time = req.body.time;
                tour.bracketId = req.body.bracketId;
                
                tour.save()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {

                tour.name = req.body.name;
                tour.description = req.body.description;
                tour.date = req.body.date;
                tour.time = req.body.time;
                
                tour.save()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            }
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/:id', (req, res) => {

    Tournament.findOne({ where: { id: req.params.id } })
        .then( cat => {
            cat.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;