const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const qIstumaPaikka = require("../models/istumapaikat");

router.post('/', (req, res) =>{
    if(req.session.login)
    {
        qIstumaPaikka.find({}, function(err, users){
            if(err){
                res.sendStatus(403);
                next();
            }
            else{
                res.json(users);
            }
        });
    }
    else
    {
        res.sendStatus(403);
    }
    
});

router.post('/confirm/', (req,res,next) =>{
    if(req.session.login)
    {
        var id = req.body.userid;
        qIstumaPaikka.findById(id, function(err, data){
        if(err) return res.sendStatus(404);
        if(data.Confirmed)
        {
            data.Confirmed = false;
        }
        else
        {
            data.Confirmed = true;
        }
        data.save(function (err, updated){
            if(err) return res.status(404);
            res.sendStatus(200);
        });
        });
    }
    else
    {
        res.status(403);
    }
    
});

router.post('/remove/', (req,res,next)=>{
    if(req.session.login)
    {
        var id = req.body.userid;
        qIstumaPaikka.findById(id).deleteOne( function(err, data){
        if(err) return res.sendStatus(404);
        else
        {
            res.sendStatus(200);
        }
        });
    }
    else
    {
        res.sendStatus(403);
    }
});

router.post('/specific/', (req,res,next)=>{
    if(req.session.login)
    {
        var id = req.body.userid;
        qIstumaPaikka.findById(id, function(err, data){
        if(err) return res.sendStatus(404);
        else
        {
            res.send(data);
        }
        })
    }
    else
    {
        res.sendStatus(403);
    }
});

router.post('/update/', (req,res,next)=>{
    if(req.session.login)
    {
        var id = req.body.userid;
        if(!req.body.turnaus)
        {
        req.body.turnausnimi = "";
        req.body.turnauspeli = "";
        }
        qIstumaPaikka.findById(id, function(err, data){
        if(err) return res.sendStatus(404);
        
        
        data.Etunimi = req.body.nimi;
        data.Sukunimi = req.body.sukunimi;
        data.Luokka = req.body.luokka;
        data.Istumapaikka = req.body.paikka;
        data.Turnaus = req.body.turnaus;
        data.Tiiminimi = req.body.turnausnimi;
        data.Turnauspelit = req.body.turnauspeli;
        data.ExtraInfo = req.body.info;

        data.save().then(result =>{
            console.log(result);
            res.status(201).json({
                message: "Handling POST request",
            });
            return next();
        }).catch(err => console.log(err));
    });
    }
    else
    {
        res.sendStatus(403);
    }
});

module.exports = router;