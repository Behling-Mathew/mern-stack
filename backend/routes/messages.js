
const router = require('express').Router();
let Message = require('../models/messages.model');


router.route('/chat').get((req, res) => {
  
    Message.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
    const sender = req.body.sender;
    const message = req.body.message;
    const senderAvatar = req.body.senderAvatar; 

    const newMessage = new Message({
        sender, 
        message,
        senderAvatar
    });

    newMessage.save()
    .then(() => res.json('Message added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}); 

module.exports = router;