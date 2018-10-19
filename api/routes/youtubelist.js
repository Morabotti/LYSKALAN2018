const express = require('express');
const jsonfile = require('jsonfile');
const router = express.Router();

const file = './public/json/song-data.json'


router.post('/delete-first', (req,res,next)=>{
    let List = jsonfile.readFileSync(file);
    List.splice(0,1);
    jsonfile.writeFile(file, List, { spaces: 2 }, function (err) {
        if (err) console.error(err)
        res.send("Success");
    });
});

router.post('/bump', (req,res,next)=>{
    if(req.session.login)
    {
        let UpdatedIndex;
        let Fytid = req.body.ytid;
        let List = jsonfile.readFileSync(file);
        let index = List.map((o) => o.yt_id).indexOf(Fytid);
        UpdatedIndex = List[index];
        List.splice(index, 1);
        List.unshift(UpdatedIndex);
        jsonfile.writeFile(file, List, { spaces: 2 }, function (err) {
            if (err) console.error(err)
            res.send("Success");
        });
    }
    else
    {
        res.sendStatus(403);
    }
});

router.post('/delete', (req,res,next)=>{
    if(req.session.login)
    {
        let DelIndex = req.body.ChDel;
        let fList = jsonfile.readFileSync(file);
        for(let i = 0; i < DelIndex.length; i++)
        {
            let index = fList.map((o) => o.yt_id).indexOf(DelIndex[i]);
            fList.splice(index, 1);
        }
        jsonfile.writeFile(file, fList, { spaces: 2 }, function (err) {
            if (err) console.error(err)
            res.send("Success");
        });
    }
    else
    {
        res.sendStatus(403);
    }
});

module.exports = router;

