const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const getIP = require('ipware')().get_ip;
const router = express.Router();

const qIstumaPaikka = require("../models/istumapaikat");

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Fetched'
    });
});

router.post('/', (req, res, next) =>{
    validator.blacklist(req.body.nimi, '!"#¤%&/()=?`´¨£@$€<{[]}}\>.,');
    validator.blacklist(req.body.sukumimi, '!"#¤%&/()=?`´¨£@$€<{[]}}\>.,');
    validator.blacklist(req.body.luokka, '!"#¤%&/()=?`´¨£@$€<{[]}}\>.,');
    validator.blacklist(req.body.paikka, '!"#¤%&/()=?`´¨£@$€<{[]}}\>.,');
    if(!validator.isBoolean(req.body.turnaus))
    {
        res.status(500).json({
            error: "Error",
        });
        req.body.turnaus = false;
    }
    if(!req.body.turnaus)
    {
        req.body.turnausnimi = "";
        req.body.turnauspeli = "";
    }
    validator.blacklist(req.body.info, '<>');

    
    const UPaikka = new qIstumaPaikka({
        _id: new mongoose.Types.ObjectId(),
        Etunimi: req.body.nimi,
        Sukunimi: req.body.sukumimi,
        Luokka: req.body.luokka,
        Istumapaikka: req.body.paikka,
        Confirmed: false,
        Turnaus: req.body.turnaus,
        Tiiminimi: req.body.turnausnimi,
        Turnauspelit: req.body.turnauspeli,
        ExtraInfo: req.body.info,
        IP: getIP(req),
    });
    UPaikka.save().then(result =>{
        console.log(result);
        res.status(201).json({
            message: "Handling POST request",
            Object: UPaikka
        });
        return next();
    }).catch(err => console.log(err));
});

module.exports = router;