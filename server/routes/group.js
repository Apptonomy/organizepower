/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { Router } = require('express');
const {
  addGroup, getGroupByName, getAllGroups, getGroupById,
} = require('../db/methods');

const groupRouter = Router();

groupRouter.post('/', (req, res, next) => {
  const newGroup = req.body.group;
  const { groupName } = newGroup;

  getGroupByName(groupName)
    .then(user => {
      if (user !== undefined) {
        res.send({ message: 'invalidUser' });
      } else {
        addGroup(newGroup)
          .then(() => res.send({ message: 'newGroup' }));
      }
    })
    .catch(err => console.error(err));
});

groupRouter.get('/', (req, res, next) => {
  getAllGroups()
    .then(groups => res.send(groups))
    .catch(err => console.error(err));
});

groupRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  getGroupById(id)
    .then(group => {
      res.send(group);
    })
    .catch(err => console.error(err));
});

module.exports = {
  groupRouter,
};
