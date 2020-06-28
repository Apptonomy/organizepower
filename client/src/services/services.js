import axios from 'axios';

const getUserByUsername = (username) => {
  return axios.get(`/profile/:${username}`);
};

const getAllUsers = () => {
  return axios.get('profile/all/users');
};

const getMovements = () => {
  return axios.get('/movement');
};

// this is a user route
const getMovementsLeading = (id) => {
  return axios.get(`/profile/leading/:${id}`);
};
// this a user route: user following a movement
const getMovementsFollowing = (id) => {
  return axios.get(`/profile/following/:${id}`);
};

const getUserProfileById = (id) => {
  return axios.get(`/profile/:${id}`);
};

// Gets all messages between two users
const getAllUserMessages = (sender_id, recipient_id) => {
  return axios.get(`messages/${recipient_id}/from/${sender_id}`);
};

// post a message to the db that references two users
const sendUserMessage = (sender_id, recipient_id, messageObj) => {
  return axios.post(`messages/${sender_id}/to/${recipient_id}`, messageObj);
};

// Authentication

const login = (username, password) => {
  return axios.post('/login', { username, password });
};

const logout = () => {
  return axios.get('/logout');
};

const signup = (user) => {
  return axios.post('/signup', { user });
};

export {
  getAllUsers,
  getUserByUsername,
  getUserProfileById,
  getMovements,
  getMovementsLeading,
  getMovementsFollowing,
  getAllUserMessages,
  sendUserMessage,
  logout,
  login,
  signup,
};
