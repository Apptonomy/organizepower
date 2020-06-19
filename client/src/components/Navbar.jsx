import React, { useState } from 'react';
import axios from 'axios';
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
} from 'react-router-dom';

import Profile from './Profile.jsx';
import Explore from './Explore.jsx';
import Login from './Login.jsx';
import Movement from './Movement.jsx';
import SignUp from './SignUp.jsx';
import PrivateRoute from './PrivateRoute.jsx';

import { logout } from '../services/services';

const Navbar = () => {
  const [currentMovement, setCurrentMovement] = useState({});
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleClick(movementId) {
    axios.get(`/movement/:${movementId}`)
      .then(res => {
        setCurrentMovement(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleLogout = () => {
    logout()
      .then(() => setIsAuthenticated(false))
      .catch(err => console.error(err));
  };

  return (
    <Router>
      <div>
        <nav className="flex items-center justify-between flex-wrap bg-gray-700 p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path className="heroicon-ui" d="M13 16v5a1 1 0 0 1-1 1H9l-3-6a2 2 0 0 1-2-2 2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2 0-1.1.9-2 2-2h7.59l4-4H20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2.41l-4-4H13zm0-2h1.41l4 4H20V4h-1.59l-4 4H13v6zm-2 0V8H6v2H4v2h2v2h5zm0 2H8.24l2 4H11v-4z" /></svg>
            <Link to="/explore" className="font-semibold text-xl tracking-tight m-2 hover:text-gray-600">Organize Power</Link>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <NavLink to="/explore" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                EXPLORE
              </NavLink>
              <NavLink to={`/profile/${user.id}`} className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                PROFILE
              </NavLink>
              {!isAuthenticated
              && (
                <NavLink to="/login" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                  LOGIN
                </NavLink>
              )}
              {!isAuthenticated
              && (
                <NavLink to="/signup" className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                  SIGNUP
                </NavLink>
              )}
              {isAuthenticated
              && (
                <NavLink to="/login" onClick={handleLogout} className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4">
                  LOGOUT
                </NavLink>
              )}
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path={`/movement/${currentMovement.id}`} render={() => (<Movement currentMovement={currentMovement} user={user} />)} />
          <Route exact path="/explore" render={() => (<Explore user={user} handleClick={handleClick} />)} />
          <PrivateRoute exact path={`/profile/${user.id}`} component={Profile} user={user} handleClick={handleClick} isAuthenticated={isAuthenticated} />
          <Route exact path="/login" render={() => (<Login setUser={setUser} setIsAuthenticated={setIsAuthenticated} />)} />
          <Route exact path="/signup" render={() => (<SignUp setUser={setUser} setIsAuthenticated={setIsAuthenticated} />)} />
        </Switch>
        {/* <Redirect to="/explore" /> */}
      </div>
    </Router>
  );
};

export default Navbar;
