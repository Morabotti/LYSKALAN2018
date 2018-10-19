const express = require('express');
const jsonfile = require('jsonfile');
const router = express.Router();


router.post('/update/', (req,res,next)=>{
    const file = './public/json/table-data.json'
    const obj = req.body;
 
    jsonfile.writeFile(file, obj, { spaces: 2 }, function (err) {
    if (err){
        res.sendStatus(403);
    }
    console.log("updated table-data");
    res.sendStatus(200);
    });
});

router.get('/', (req,res,next)=>{

    const file = './public/json/table-data.json'
 
    jsonfile.readFile(file, function (err,obj) {
    if (err){
        res.sendStatus(403);
    }
    res.send(obj);
    });
    
    
});


module.exports = router;