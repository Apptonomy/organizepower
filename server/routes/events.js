const { Router } = require('express');
const {
  addEvent,
  getEvent,
  getAllEventsForMovement,
  addRSVP,
  addRSVPCount,
  getMovementsRSVPByUser,
} = require('../db/methods');

const eventRouter = Router();

// this route will get all the events for the eventLists
eventRouter.get('/movement/:id', (req, res) => {
  const { id } = req.params || {};
  // unstring the id to a number
  const moveId = parseFloat(id);
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

// get all events rsvped to by user
eventRouter.get('/rsvp/:id', (req, res) => {
  const { id } = req.params || {};
  const userId = parseFloat(id);
  getMovementsRSVPByUser(userId)
    .then((events) => {
      res.send(events);
    })
    .catch(err => {
      console.error('Error GETting rsvp events for user:', err);
      res.sendStatus(500);
    });
});

// add an event to db
eventRouter.post('/', (req, res) => {
  addEvent(req.body)
    .then(event => {
      console.log('posted event', event);
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
    .catch((err) => {
      console.error('Error adding an rsvp to database:', err);
    });
});

module.exports = {
  eventRouter,
};
