const express = require('express');
const jsonfile = require('jsonfile');
const fetchVideoInfo = require('youtube-info');
const router = express.Router();

const file = './public/json/song-data.json'


router.post('/', (req,res,next)=>{
    let youtubeid = req.body.youtubeId
    if(req.body.youtubeId != undefined)
    {
        fetchVideoInfo(youtubeid, function (err, videoInfo) {
            if (err) throw new Error(err);
            let returnData = {
                "yt_title": videoInfo.title,
                "yt_url": videoInfo.url,
                "yt_owner": videoInfo.owner,
                "yt_thumbnail": videoInfo.thumbnailUrl,
                "yt_duration": videoInfo.duration,
                "yt_id": youtubeid
            }
            AddNewSong(returnData);
            res.send(returnData);
        });
    }
    else
    {
        res.sendStatus(403);
    }
    
});



function AddNewSong(SongObj)
{
    let Isupdated = false;
    let OldData = jsonfile.readFileSync(file);
    let fHandler = OldData;
    let obj = SongObj;
    let Pituus = OldData.push();
    for(let x = 0; x < Pituus; x++)
    {
        if(fHandler[x].yt_url == obj.yt_url)
        {
            fHandler.splice(x, 1);
            fHandler.push(obj);
            Isupdated = true;
        }
    }
    if(!Isupdated)
    {
        fHandler.push(obj);
    }
    jsonfile.writeFile(file, fHandler, { spaces: 2 }, function (err) {
        if (err) console.error(err)
    });
}

module.exports = router;