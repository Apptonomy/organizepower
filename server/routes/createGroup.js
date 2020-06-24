/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { Router } = require('express');
const { addGroup, getGroupByName } = require('../db/methods');

const signupRouter = Router();

signupRouter.post('/', (req, res, next) => {
  const newGroup = req.body.group;
  const { groupName } = newGroup;

  getGroupByName(groupName)
    .then(user => {
      if (user !== null) {
        res.send({ message: 'invalidUser' });
      } else {
        addGroup(newGroup)
          .then(() => res.send({ message: 'newGroup' }));
      }
    })
    .catch(err => console.error(err));
});

module.exports = {
  signupRouter,
};
