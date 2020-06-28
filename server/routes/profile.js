const { Router } = require('express');
const {
  getAllUsers,
  getUserByUsername,
  getUserById,
  getMovementsFollowedByUser,
  getMovementsLedByUser,
} = require('../db/methods');

const profileRouter = Router();

profileRouter.get('/:username', (req, res) => {
  const {
    username,
  } = req.params;
  getUserByUsername(username)
    .then((user) => {
      res.send(user);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

profileRouter.get('/all/users', (req, res) => {
  console.log(req);
  getAllUsers()
    .then((users) => {
      // strip the hash and salt from each user for safety
      users.forEach((user) => {
        user.salt = null;
        user.hash = null;
      });
      res.send(users);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

profileRouter.get('/:id', (req, res) => {
  const { id } = req.params || {};
  const userId = parseFloat(id.slice(1));
  // get user information by ID form db
  getUserById(userId)
    .then((user) => {
      res.send(user);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// a route to get the movements a user created by userID
profileRouter.get('/following/:id', (req, res) => {
  const { id } = req.params || {};
  const userId = parseFloat(id.slice(1));
  // database method that get the movements that a user follows
  getMovementsFollowedByUser(userId)
    .then((movements) => {
      res.send(movements);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// a route to get the movements a user started
profileRouter.get('/leading/:id', (req, res) => {
  const { id } = req.params || {};
  const userId = parseFloat(id.slice(1));
  // db method that get the movements led by a user
  getMovementsLedByUser(userId)
    .then((movements) => {
      res.send(movements);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = {
  profileRouter,
};
