const express = require('express');
const path    = require("path");
const validator = require('validator');
const session = require('express-session');
const router = express.Router();

var auth = function(req, res, next) {
    if (req.session.login === true)
    {
        return next();
    }
    else
    {
        res.redirect('/login');
    }
};

router.get('/',auth, (req, res, next) => {
    
    res.render("dashboard");
});

module.exports = router;