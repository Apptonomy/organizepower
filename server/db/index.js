/*
 * DATABASE NOTES:
 * start mysql server in directory: sudo service mysql start
 * open mysql shell: mysql -u root
 * create database locally: create database op;
 *                          ^^^^^^^^^^^^^^^^^^
 * Note that this file will not create the database automatically,
 * but it will create all the tables and assign the foreign keys.
 *
 * DEPLOYMENT:
 * For Google Cloud deployment via App Engine, the environmental variables
 * are stored in an app.yaml rather than the .env:
 * https://cloud.google.com/appengine/docs/standard/nodejs/config/appref
 * However, they are stil accessed using process.env in this file.
 *
 * Google's Cloud SQL will have an instance name that is used to
 * connect to MySQL via socket path rather than the host IP.
 *
 */

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || 'op';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const { DB_INSTANCE, NODE_ENV } = process.env;

let sequelize = null;

if (NODE_ENV === 'production') {
  // production (cloud sql) database connection
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: `/cloudsql/${process.env.DB_INSTANCE}`,
    dialect: 'mysql',
    logging: false, // toggle logging SQL in console
    dialectOptions: {
      socketPath: `/cloudsql/${DB_INSTANCE}`,
    },
  });
} else {
  // development (local) database connection
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // toggle logging SQL in console
  });
}

// test the connection
sequelize.authenticate()
  .then(() => {
    console.log(`Connection has been established with ${DB_NAME} database successfully.`);
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

/*
  MODELS

  Sequelize defaults a primary key 'id' for every model/table.
  Also adds a createdAt and updatedAt column.

  { underscored: true } will convert camelCase in the models to
  snake_case in the database. Can be set for each table.

  Sequelize also will automatically pluralize the table names
  based of the singular model name. User model becomes users table.

  For join tables (see lines 143-146), it will pluralize the last
  word in the join table.
  For example UserMovement will be user_movements in the db.

*/

const User = sequelize.define('user', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  hash: { type: DataTypes.STRING, allowNull: false },
  salt: { type: DataTypes.STRING, allowNull: false },
  firstName: { type: DataTypes.STRING, allowNull: true },
  lastName: { type: DataTypes.STRING, allowNull: true },
  location: { type: DataTypes.STRING, allowNull: true },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: { type: DataTypes.STRING },
  imageUrl: { type: DataTypes.STRING },
  bio: { type: DataTypes.TEXT },
  lastLogin: { type: DataTypes.DATE },
  status: { type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active' },
}, { underscored: true }); // convert camelCase column names to snake_case in db

const Movement = sequelize.define('movement', {
  // movement info
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  followers: { type: DataTypes.INTEGER },
  emailCount: { type: DataTypes.INTEGER },
  textCount: { type: DataTypes.INTEGER },
  imageUrl: { type: DataTypes.STRING },
  // politician info
  polFirstName: { type: DataTypes.STRING },
  polLastName: { type: DataTypes.STRING },
  polPosition: { type: DataTypes.STRING },
  polEmail: { type: DataTypes.STRING },
  polPhoneNumber: { type: DataTypes.STRING },
  polImageUrl: { type: DataTypes.STRING },
}, { underscored: true });

// track which movements a user 'joins'
const UserMovement = sequelize.define('userMovement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, { underscored: true });

// comments added to a movement page by user
const Comment = sequelize.define('comment', {
  commentText: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
}, { underscored: true });

const Event = sequelize.define('event', {
  // event info
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  rsvpCount: { type: DataTypes.INTEGER },
  imageUrl: { type: DataTypes.STRING },
}, { underscored: true });

// track which events are added to a movement
// const MovementEvent = sequelize.define('movementEvent', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
// }, { underscored: true });

// track which events a user 'rsvps' to
const UserRSVP = sequelize.define('userRSVP', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, { underscored: true });

// sync sequelize to create tables in db before adding associations
// { force: true } will drop and recreate the tables,
// can be handy for dev but also dangerous:

// sequelize.sync({ force: true });
sequelize.sync(); // will not drop tables every time

// ASSOCIATIONS: these need to be set after all the models have been
// made and synced with the database. Cannot make an association if
// the table doesn't exist yet.

// add user id foreign key to all movements
Movement.belongsTo(User, { foreignKey: 'id_organizer' });
User.hasMany(Movement, { foreignKey: 'id_organizer' });

// makes a join table between the users and movements
// 'through' key sets the name of the table: user_movements
User.belongsToMany(Movement, { through: UserMovement, foreignKey: 'id_user' });
Movement.belongsToMany(User, { through: UserMovement, foreignKey: 'id_movement' });

// adds movement and user foreign keys on comments table
Comment.belongsTo(Movement, { foreignKey: 'id_movement' });
Comment.belongsTo(User, { foreignKey: 'id_user' });

/* ////////////////////////////////////////////////////// */

// // add user id foreign key to all movements.. ?? //
// Event.belongsTo(Movement, { foreignKey: 'id_event' });
// Movement.hasMany(Event, { foreignKey: 'id_movement' });

// makes a join table between the movements and events
// 'through' key sets the name of the table: movement_event
// Movement.belongsToMany(Event, { through: MovementEvent, foreignKey: 'id_movement' });
// Event.belongsToMany(Movement, { through: MovementEvent, foreignKey: 'id_event' });

// An event belongs to one movement while a movement may have many events
Movement.hasMany(Event, { as: 'event' });
Event.belongsTo(Movement, {
  foreignKey: 'id_movement',
  as: 'movement',
});

// adds event and user foreign keys on RSVPs table
UserRSVP.belongsTo(User, { foreignKey: 'id_user' });
UserRSVP.belongsTo(Event, { foreignKey: 'id_event' });

module.exports = {
  sequelize,
  User,
  Movement,
  Event,
  UserRSVP,
  Comment,
  UserMovement,
};
