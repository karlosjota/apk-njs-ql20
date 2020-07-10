"use strict";
const express = require('express');
const router = express.Router();

const pool  = require('../database');
const e = require('express');

router.get('/add', (req, res) => {
    res.render('links/add');
});

// stackoverflow
router.post('/add', (req,res) =>{ // <- La función middleware ya no es async
    const {title, url, description } = req.body;
    const newLink={
        title,
        url,
        description
        //ALMACENA ESOS DATOS EN LA VARIABLE NEWLINK
    };
    pool.query('INSERT INTO links set ?',[newLink], (error, results, fields) => { // <- usamos una función callback
        if(error) { // <- Si ocurre un error en la consulta
            console.log(error); // <- mostramos error por consola
            return res.status(500).send('error'); // <- enviamos mensaje al cliente
        }
        // ...
        // console.log(req.body);
        // ...
        return res.status(200).send('recibido'); // <- enviamos mensaje al cliente
    });
});

module.exports = router;

