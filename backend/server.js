const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
const User = require("./user");
const Favourites = require('./favoriteCities');

//----------------------------------------- END OF IMPORTS---------------------------------------------------
mongoose.connect(
    `mongodb://svf_database_mongo:27017/weather_database`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("Mongoose Is Connected");
    }
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: "*", // <-- allow all origins
        credentials: true,
    })
);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) res.status(200).json(err);
        if (!user) res.status(200).json(info);
        else {
            req.logIn(user, (err) => {
                if (err) res.status(200).json(err);
                res.status(200).json({ info: info, userid: user.id });
                console.log(req.user);
            });
        }
    })(req, res, next);
});
app.post("/register", (req, res) => {
    console.log("register")
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        console.log("SIGNUP RES==>>", doc)
        if (doc) res.status(403).json({ status: 'user_exists', message: 'User Already Exists' });
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                id: uuidv4(),
                username: req.body.username,
                password: hashedPassword,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email

            });
            await newUser.save();
            res.status(200).json({ status: 'done', message: 'Add new user success' });
        }
    });
});
app.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({ status: 'done', message: 'logout success' });
});
app.get("/user", (req, res) => {
    res.status(200).json(req.user);
});

app.post("/favourites", (req, res) => {
    console.log("POST req.body", req.body)
    Favourites.findOne({ userId: req.body.userId, cityName: req.body.cityName }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            Favourites.updateOne({
                userId: req.body.userId,
                cityName: req.body.cityName,
            },
                {
                    temperature: req.body.temperature,
                    clouds: req.body.clouds,
                    lastUpdatedTime: Date.now(),
                    icon: req.body.icon,
                }, function (err, docs) {
                    if (err) {
                        res.status(500).json({ status: 'error', message: 'City not added' });
                    }
                    else {
                        res.status(200).json({ status: 'updated', message: 'Favourite City details updated', data: docs });
                    }
                }
            );
        }
        if (!doc) {
            const newCityDetails = new Favourites({
                userId: req.body.userId,
                cityName: req.body.cityName,
                temperature: req.body.temperature,
                clouds: req.body.clouds,
                icon: req.body.icon,
                lastUpdatedTime: Date.now()
            });
            await newCityDetails.save();
            res.status(200).json({ status: 'updated', message: 'Favourite City added' });
        }
    });
});


app.get('/favourites/:userId', (req, res) => {
    Favourites.find({ userId: req.params.userId }, null, { sort: { lastUpdatedTime: -1 } }, function (err, docs) {
        if (err) throw err;
        if (docs && docs.length) {
            res.status(200).json({ data: docs });
        } else {
            res.status(404).json({ status: 'error', message: 'Results not found' });
        }
    });
});

app.delete('/favourites/:id', (req, res) => {
    Favourites.deleteOne({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.status(500).json({ status: 'error', data: err });
        } else {
            res.status(200).json({ status: 'done', message: 'Delete success', data: result });
        }
    });
});

//Weather API
app.get('/weather/:cityName', async (req, res) => {
    try {
        const results = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&appid=fa49bad2b8e2d60f18e8a0d77911f219`);
        res.status(200).json(results.data); 
        // then(resp => {
        //     res.status(200).json(resp.data); 
        // }).catch((e) = {
        //     //res.status(404).json(e); 
        // });
    } catch {
        res.status(404).json({ status: 'error', message: 'Results not found' });
    }
});
//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listing to port ${port}`);
})