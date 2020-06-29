const { Router } = require('express');
const {
  getAllUserMessages,
  sendUserMessage,
} = require('../db/methods');

const messagesRouter = Router();

// this route will get all the messages for a specified users from a specified user
messagesRouter.get('/:recipient_id/from/:sender_id', (req, res) => {
  const {
    recipient_id,
    sender_id
  } = req.params;
  // get all the messages from the database
  getAllUserMessages(recipient_id, sender_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(`Failed to grab messages from User: ${sender_id} to User: ${recipient_id}`);
    });
});

messagesRouter.post('/:sender_id/to/:recipient_id', (req, res) => {
  const { sender_id, recipient_id } = req.params;
  //  send user message to recipient_id for saving
  sendUserMessage({
    message: req.body.message,
    sender_id,
    recipient_id,
  })
    .then(() => {
      res.send(`User: ${sender_id} sent a message to User:${recipient_id}`);
    })
    .catch(err => {
      console.error(err);
      res.send(`Message to User:${recipient_id} from User:${sender_id} not sent`);
    });
});

module.exports = {
  messagesRouter,
};
