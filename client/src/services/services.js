import axios from 'axios';

const getUser = () => {

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

const createGroup = (group) => {
  console.log(group);
  //return axios.post('/signup', { group });
};

export {
  getUserProfileById,
  getMovements,
  getMovementsLeading,
  getMovementsFollowing,
  logout,
  login,
  signup,
  createGroup,
};
