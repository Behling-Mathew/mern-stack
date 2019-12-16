
const router = require('express').Router();
const express = require('express');
let User = require('../models/user.model');
const UserSession = require('../models/UserSession')
var session = require('express-session');


const app = express();

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "secret"
}));

router.route('/').get((req, res) => {
    if (req.session.email) {
        console.log('sesion email is true');
    }
    else {
        console.log('sesion email is false', req.session.email);
    }
    User.find()
     .then(users => res.json(users))
     .catch(err => res.status(400).json('Error: ' + err));   
});


router.route('/add').post((req, res) => {

  /*
  const userToken = req.getToken();

   if (userToken != null blah blah) {
    UserSession.sessions

    ( (key, value), (key, value) );

   UserSession session =  UserSession.sessions.get(userToken)

   if (the session is null rerout them to login)

   otherwise do the stuff
  } */

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const isDeleted = req.body.isDeleted;
    
    const newUser = new User({
        username,
        email,
        password,
        isDeleted
    });

    newUser.password = newUser.generateHash(password);

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Sign in
router.route('/signin').post((req, res) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;

    // Verify Email
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }

    // Verify Password
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();
    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.username = user.username;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        // added express-session storage
        
        req.session.password = password;
        req.session.email = email;
        logged_in = true;
        //console.log(username);
      
        //return res.redirect('/add');
        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id,
          username: doc.username
        }); 
      });
    });
});


// Verify Login
router.route('/verify').get((req, res) => {
     // Get the token
     const { query } = req;
     const { token } = query;
     // ?token=test
 
     // Verify the token is one of a kind and it's not deleted.
 
     UserSession.find({
       _id: token,
       isDeleted: false
     }, (err, sessions) => {
       if (err) {
         console.log(err);
         return res.send({
           success: false,
           message: 'Error: Server error'
         });
       }
 
       if (sessions.length != 1) {
         return res.send({
           success: false,
           message: 'Error: Invalid'
         });
       } else {
         return res.send({
           success: true,
           message: 'Good'
         });
       }
     });
});

// Logout
router.route('/logout').get((req, res) => {


    // Get the token
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      logged_in = false;
      
      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });

  router.route('/test3').get((req, res) => {
    
    req.session.email = "larry@gmail.com"
    console.log("You are in testing3. Session email is: " + req.session.email);
    res.send();

    if (req.session.email) {
        console.log('sesion email is true');
    }
    else {
        console.log('sesion email is false', req.session.email);
    } 
});


//module.exports = app;
app.use('/', router);
module.exports = router;