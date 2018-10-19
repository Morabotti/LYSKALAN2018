const express = require('express');
const jsonfile = require('jsonfile');
const router = express.Router();

router.post('/update/', (req,res,next)=>{
    if(req.session.login)
    {
        const file = './public/json/info-data.json'
        const obj = req.body;
        jsonfile.writeFile(file, obj, { spaces: 2 }, function (err) {
        if (err){
            res.sendStatus(403);
        }
        console.log("updated info");
        res.sendStatus(200);
        });
    }
    else
    {
        res.sendStatus(403);
    }
    
});

router.get('/', (req,res,next)=>{
    const file = './public/json/info-data.json'
    jsonfile.readFile(file, function (err,obj) {
    if (err){
        res.sendStatus(403);
    }
    res.send(obj);
    });
});

router.post('/kilta/update/', (req,res,next)=>{
    if(req.session.login)
    {
        const file = './public/json/kilta-data.json'
        const obj = req.body;
        jsonfile.writeFile(file, obj, { spaces: 2 }, function (err) {
            if (err){
                res.sendStatus(403);
            }
            console.log("updated kilta");
            res.sendStatus(200);
        });
    }
    else
    {
        res.sendStatus(403);
    }
});

router.get('/kilta/', (req,res,next)=>{
    const file = './public/json/kilta-data.json'
    jsonfile.readFile(file, function (err,obj) {
    if (err){
        res.sendStatus(403);
    }
    res.send(obj);
    });
});

module.exports = router;