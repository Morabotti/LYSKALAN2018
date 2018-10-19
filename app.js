const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const rateLimit = require("express-rate-limit");
const helmet = require('helmet')
require('dotenv').config()


//API PATH
const Istumapaikka = require('./api/routes/istumapaikka');
const Kayttajacontrol = require('./api/routes/kayttajacontrol');
const Kayttajat = require('./api/routes/kayttajat');
const LoginControl = require("./api/login/logincontrol");
const LoginAuth = require("./api/login/loginauth");
const Article = require("./api/routes/article");
const Timetable = require("./api/routes/timetable");
const YoutubeReq = require("./api/routes/youtubeurl");
const YoutubeList = require("./api/routes/youtubelist");

const app = express();

//Express session / Cookie
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: JSON.parse(process.env.COOKIE_HTTPS), httpOnly:true},
}));


//Express middleware & stuff
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use("/login", express.static("index"));
app.use(express.static(path.join(__dirname, 'public')));
app.enable("trust proxy");
app.disable('x-powered-by');


//API LIMITER
const apiLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 1
});

const apiLimiterSong = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5
});
app.use("/api/istumapaikka", apiLimiter);
app.use("/api/youtubereq", apiLimiterSong);


//API request
app.use("/dashboard", LoginAuth);
app.use("/api/istumapaikka", Istumapaikka);
app.use("/api/kayttajacontrol", Kayttajacontrol);
app.use("/api/kayttajat", Kayttajat);
app.use("/api/login", LoginControl);
app.use("/api/article", Article);
app.use("/api/timetable", Timetable);
app.use("/api/youtubereq", YoutubeReq);
app.use("/api/youtubelist", YoutubeList);


//MongoDB connection
mongoose.connect(process.env.DB, { useNewUrlParser: true })
const db = mongoose.connection;


//PORT
const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () => {
  console.log('We have a server running on PORT: ' + PORT);
});


//Socket IO
const io = require('socket.io').listen(server);

io.of("/musicplayer-socket").on("connection", function (socket) {
  console.log("New socket trigger in music-player "+ socket.handshake.address)
});


//Socket IO API requests
app.post('/api/youtubelist/play', (req, res) =>{
    if(req.session.login)
    {
      io.of("/musicplayer-socket").emit("play");
      res.send("success");
    }
    else{ res.sendStatus(403);}
});

app.post('/api/youtubelist/pause', (req, res) =>{
    if(req.session.login)
    {
      io.of("/musicplayer-socket").emit("pause");
      res.send("success");
    }
    else{ res.sendStatus(403);}
});

app.post('/api/youtubelist/refresh', (req, res) =>{
    if(req.session.login)
    {
      io.of("/musicplayer-socket").emit("refresh");
      res.send("success");
    }
    else{ res.sendStatus(403);}
});

app.post('/api/youtubelist/skip', (req, res) =>{
    if(req.session.login)
    {
      io.of("/musicplayer-socket").emit("skip");
      res.send("success");
    }
    else{ res.sendStatus(403);}
});