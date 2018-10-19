const express = require('express');
const jsonfile = require('jsonfile');
const validator = require('validator');
const session = require('express-session');
const sha256 = require('sha256');
const router = express.Router();

const file = "./private/SECRET.json";
router.post('/', (req, res, next) => {
    jsonfile.readFile(file)
        .then(obj => {
            let kayttaja = req.body.username;
            let salasana = sha256(req.body.password);
            //https://passwordsgenerator.net/sha256-hash-generator/
            if(kayttaja === obj.username && salasana === obj.password)
            {
                req.session.login = true;
                req.session.cookie.expires = new Date(Date.now() + 900000);
                res.send('/dashboard');
            }
            else
            {
                res.send("/login");
            }
        })
        .catch(error => console.error(error))
});

router.post("/logout", (req, res, next) => {
    if(req.session.login)
    {
        req.session.login = false
        res.send("/login");
    }
});

module.exports = router;