const { Router } = require('express');
const {
  getMovement,
  addMovement,
  getAllMovements,
  linkUserMovement,
  addEmailCount,
  addTextCount,
  addFollower,
  editMovement,
} = require('../db/methods');

const movementRouter = Router();

// this route will get all the movements for the movementLists
movementRouter.get('/', (req, res) => {
  // get all the movements from the database
  getAllMovements()
    .then(movements => {
      res.send(movements);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

movementRouter.get('/:id', (req, res) => {
  // this route will get the clicked on movement by the id
  const { id } = req.params || {};
  // unstring the id to a number and remove the colon
  const movementId = parseFloat(id.slice(1));
  // method that get the movement by a particular id from the db
  getMovement(movementId)
    .then(movement => {
      res.send(movement);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

movementRouter.post('/followers', (req, res) => {
  // use the linkUserMovement method to join the user to a particular movement
  const { userId, movementId } = req.body;
  linkUserMovement(userId, movementId)
    .then(linked => {
      // add the follower of this movement to the join table
      addFollower(movementId);
      res.send(linked).status(200);
    })
    .catch(err => res.sendStatus(400).send(err));
});

movementRouter.post('/', (req, res) => {
  const { movementObj, id } = req.body;
  // add a movement to db
  addMovement(movementObj, id)
    .then(movement => {
      res.send(movement);
    })
    .catch(err => {
      console.error(err);
    });
});

movementRouter.post('/emailCount/', (req, res) => {
  const { id } = req.body;
  const movementId = parseFloat(id);

  addEmailCount(movementId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
    });
});

movementRouter.post('/textCount/', (req, res) => {
  const { id } = req.body;
  const movementId = parseFloat(id);

  addTextCount(movementId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
    });
});

// route to update a movement
movementRouter.put('/', (req, res) => {
  const { movementObj } = req.body;
  editMovement(movementObj)
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = {
  movementRouter,
};
