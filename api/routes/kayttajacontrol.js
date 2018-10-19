const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const qIstumaPaikka = require("../models/istumapaikat");

router.get('/', (req, res) =>{
    qIstumaPaikka.find({},{Etunimi:1, Sukunimi:1, Istumapaikka: 1, Confirmed: 1}, function(err, users){
        if(err){
            res.sendStatus(403);
            next();
        }
        else{
            const userlength = users.push();
            for(let i = 0; i < userlength; i++)
            {
                users[i].Sukunimi = users[i].Sukunimi.charAt(0);
            }
            res.json(users);
        }
    });
});

module.exports = router;