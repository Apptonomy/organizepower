/* eslint-disable camelcase */
const {
  sequelize,
  User,
  Group,
  Movement,
  UserMovement,
  Comment,
} = require('./index');

/* MODEL METHODS
 * Note: organizer is term for users that create movements.
 * There is only one table for all users, organizers & participants:
 * all users are participants, some users are organizers
 *
 * Sequelize automatically makes custom methods for getting/setting
 * foreign keys in your tables.
 *
 * For many-to-one associations, hasOne & belongsTo methods:
 * .get() & .set()
 * example: comment.getUser() or comment.setMovement()
 *
 * For join tables, belongsToMany methods:
 * .get(), .set(), .add()
 * example: movement.addUser(user);
 */

// ADD NEW USER
const addUser = async(userObj) => {
  try {
    await User.create(userObj);
  } catch (err) {
    console.error(err);
  }
};

// ADD A GROUP
const addGroup = async(groupObj) => {
  try {
    await Group.create(groupObj);
  } catch (err) {
    console.error(err);
  }
};

// GET USER BY USERNAME
const getUserByUsername = async(username) => {
  try {
    const user = await User.findOne({ where: { username } });
    return user;
  } catch (err) {
    console.error(err);
  }
};

const getGroupByName = async(groupName) => {
  try {
    const gn = groupName;
    const group = await Group.findOne({ where: { groupName } });
    return group;
  } catch (err) {
    console.error(err);
  }
};

// GET USER BY ID
const getUserById = async(userId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    return user;
  } catch (err) {
    console.error(err);
  }
};

// EDIT USER BY FIELD
const editUserField = async(userId, prop, newValue) => {
  try {
    await User.update({ [prop]: newValue },
      { returning: true, where: { id: userId } });
  } catch (err) {
    console.error(err);
  }
};

// UPDATE ENTIRE USER'S RECORD
const editUser = async(userObj) => {
  try {
    await User.update(userObj,
      { returning: true, where: { id: userObj.id } });
  } catch (err) {
    console.error(err);
  }
};

// ORGANIZER ADDS NEW MOVEMENT
// one to many relationship
const addMovement = async(movementObj, userId) => {
  // get the organizer's record
  try {
    const user = await User.findOne({ where: { id: userId } });
    // create the movement
    const movement = await Movement.create(movementObj);
    // set the user (organizer) foreign key
    movement.setUser(user);
    return movement;
  } catch (err) {
    console.error(err);
  }
};

// EDIT MOVEMENT BY FIELD
const editMovementField = async(movementId, prop, newValue) => {
  try {
    await Movement.update({ [prop]: newValue },
      { returning: true, where: { id: movementId } });
  } catch (err) {
    console.error(err);
  }
};

// UPDATE ENTIRE MOVEMENT'S RECORD
const editMovement = async(movementObj) => {
  try {
    await Movement.update(movementObj,
      { returning: true, where: { id: movementObj.id } });
  } catch (err) {
    console.error(err);
  }
};

// GET MOVEMENT BY ID
const getMovement = async(movementId) => {
  try {
    const movement = await Movement.findOne({
      where: { id: movementId },
      raw: true, // returns just the object from the db
    });
    return movement;
  } catch (err) {
    console.error(err);
  }
};

// GET ALL MOVEMENTS
const getAllMovements = async() => {
  try {
    const movements = await Movement.findAll({
      raw: true,
    });
    return movements;
  } catch (err) {
    console.error(err);
  }
};

// ADD TO EMAIL COUNT
const addEmailCount = async(movementId) => {
  try {
    await Movement.update({ emailCount: sequelize.literal('email_count + 1') },
      { where: { id: movementId } });
  } catch (err) {
    console.error(err);
  }
};

// ADD TO TEXT COUNT
const addTextCount = async(movementId) => {
  try {
    await Movement.update({ textCount: sequelize.literal('text_count + 1') },
      { where: { id: movementId } });
  } catch (err) {
    console.error(err);
  }
};

// ADD FOLLOWER
const addFollower = async(movementId) => {
  try {
    await Movement.update({ followers: sequelize.literal('followers + 1') },
      { where: { id: movementId } });
  } catch (err) {
    console.error(err);
  }
};

// USER JOINS MOVEMENT
const linkUserMovement = async(userId, movementId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    const movement = await Movement.findOne({ where: { id: movementId } });
    // add movement and user to the join table with the custom method:
    movement.addUser(user);
  } catch (err) {
    console.error(err);
  }
};

// ADD COMMENTS
const addComment = async(movementId, commentText, userId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    const movement = await Movement.findOne({ where: { id: movementId } });
    const commentObj = { commentText, username: user.username };
    const comment = await Comment.create(commentObj);
    // set the user and movement foreign keys with the custom methods:
    comment.setUser(user);
    comment.setMovement(movement);
  } catch (err) {
    console.error(err);
  }
};

// GET COMMENTS BY MOVEMENT
const getComments = async(movementId) => {
  try {
    const comments = await Comment.findAll({
      where: { id_movement: movementId },
      raw: true,
    });
    if (!comments.length) {
      return [];
    }
    return comments;
  } catch (err) {
    console.error(err);
  }
};

// GET MOVEMENTS LED BY USER
const getMovementsLedByUser = async(idUser) => {
  try {
    return await Movement.findAll({
      where: { id_organizer: idUser },
      raw: true,
    });
  } catch (err) {
    console.error(err);
  }
};

// FIND MOVEMENTS FOLLOWED BY USER
const getMovementsFollowedByUser = async(idUser) => {
  try {
    const movementIds = await UserMovement.findAll({
      attributes: ['id_movement'],
      where: { id_user: idUser },
      raw: true,
    });
    const movements = await Promise.all(
      movementIds.map(({ id_movement }) => getMovement(id_movement)),
    );
    return movements.filter(movement => movement.id_organizer !== idUser);
  } catch (err) {
    console.error(err);
  }
};

// ADD NEW POLITICIAN
const addPolitician = async(politicianObj) => {
  try {
    await Politician.create(politicianObj);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {

  addMovement,
  addPolitician,
  addUser,
  addGroup,
  linkUserMovement,
  editMovement,
  editMovementField,
  editUser,
  editUserField,
  getUserById,
  getUserByUsername,
  getGroupByName,
  getMovement,
  getAllMovements,
  getMovementsLedByUser,
  getMovementsFollowedByUser,
  addEmailCount,
  addTextCount,
  addFollower,
  addComment,
  getComments,
};
