// const { Router } = require('express');
// const {
//   addEvent,
//   getEvent,
//   getAllEvents,
//   addRSVPCount,
// } = require('../db/methods');

// const eventRouter = Router();

// // this route will get all the events for the eventLists
// eventRouter.get('/:movId/:eventId', (req, res) => {
//   // get all the events from the database
//   getAllEvents()
//     .then(movements => {
//       res.send(movements);
//     })
//     .catch(err => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

// // movementRouter.get('/:id', (req, res) => {
// //   // this route will get the clicked on movement by the id
// //   const { id } = req.params || {};
// //   // unstring the id to a number and remove the colon
// //   const movementId = parseFloat(id.slice(1));
// //   // method that get the movement by a particular id from the db
// //   getMovement(movementId)
// //     .then(movement => {
// //       res.send(movement);
// //     })
// //     .catch(err => {
// //       console.error(err);
// //       res.sendStatus(500);
// //     });
// // });

// eventRouter.post('/', (req, res) => {
//   const { eventObj, id } = req.body;
//   // add an event to db
//   addEvent(eventObj, id)
//     .then(event => {
//       res.send(event);
//     })
//     .catch(err => {
//       console.error('Error adding the new event', err);
//     });
// });

// eventRouter.post('/RSVPCount/', (req, res) => {
//   const { id } = req.body;
//   const eventId = parseFloat(id);

//   addRSVPCount(eventId)
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });

// module.exports = {
//   eventRouter,
// };
