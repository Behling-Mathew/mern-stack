const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
const path = require('path');

global.logged_in = false;


require('dotenv').config();


const port = process.env.PORT || 5000;

const app = express();


// Uncomment if Cors issue arises
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
    });
    app.options("*", cors());
*/

app.use(cors());

app.set('trust proxy', 1) // trust first proxy

app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret"
}));
/* app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret",
    store: new MongoStore({ mongooseConnection: mongoose.connection })
   }));  */




app.use(express.json());



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.get('/test', (req, res) => {
    req.session.email = "bob@gmail.com"
    console.log("You are in testing1. Session email is: " + req.session.email + " Logged in is: " + logged_in);
    res.send();
    /* if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
     } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
     } */
    


})

app.get('/test2', (req, res) => {
    res.send('Test 2!');
    console.log("You are in test 2. Session email is: " + req.session.email);
})


const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');

app.use('/exercises', exercisesRouter);

app.use('/users', usersRouter);

app.use('/messages', messagesRouter);

// To use when deploying to production

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, "../mern-fitness/build")));

    // React root

    app.get('*', (req, res) => {
        let url = path.join(__dirname, '../mern-fitness/build', 'index.html');
        if (!url.startsWith('/app/')) // since we're on local windows
        url = url.substring(1);
        res.sendFile(url); 
    }); 
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});





