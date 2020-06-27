const { Router } = require('express');
const {
  addEvent,
  getEvent,
  getAllEventsForMovement,
  addRSVP,
  addRSVPCount,
} = require('../db/methods');

const eventRouter = Router();

// this route will get all the events for the eventLists
eventRouter.get('/movement/:id', (req, res) => {
  const { id } = req.params || {};
  // unstring the id to a number and remove the colon
  const moveId = parseFloat(id.slice(1));
  // get all the events from the database
  getAllEventsForMovement(moveId)
    .then(events => {
      res.send(events);
    })
    .catch(err => {
      console.error('Error GETting the events for a movement:', err);
      res.sendStatus(500);
    });
});

// this route will get the clicked on event by the id
eventRouter.get('/:id', (req, res) => {
  const { id } = req.params || {};
  // unstring the id to a number and remove the colon
  const eventId = parseFloat(id.slice(1));
  // method that get the event by a particular id from the db
  getEvent(eventId)
    .then(event => {
      res.send(event);
    })
    .catch(err => {
      console.error('Error GETting single event by Id:', err);
      res.sendStatus(500);
    });
});

eventRouter.post('/', (req, res) => {
  const { eventObj } = req.body;
  // add an event to db
  addEvent(eventObj)
    .then(event => {
      res.send(event);
    })
    .catch(err => {
      console.error('Error POSTing the new event:', err);
    });
});

eventRouter.post('/rsvp/:eventId/:userId', (req, res) => {
  let { userId, eventId } = req.body;
  userId = parseFloat(userId);
  eventId = parseFloat(eventId);
  addRSVP(userId, eventId)
    .then(() => {
      addRSVPCount(eventId)
        .then(() => {
          res.sendStatus(200);
        })
        .catch(err => {
          console.error('Error POSTing to RSVPCount for event:', err);
        });
    })
    .catch(() => {

    });
});

module.exports = {
  eventRouter,
};
