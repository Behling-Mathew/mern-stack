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

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('build'))

    app.get('*', (req, res) => {
       res.sendFile(path.resolve(__dirname, 'build', 'index.html')); 
    })
}

const port = process.env.PORT || 5000;

const app = express();
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
    



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});





