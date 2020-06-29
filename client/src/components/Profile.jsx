import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import MovementList from './MovementList.jsx';
import StartMovement from './StartMovement.jsx';
import { getMovementsLeading, getMovementsFollowing } from '../services/services';
import FullScreenDialog from './CalendarWindow.jsx';

const Profile = ({ user, handleMovementTitleClick }) => {
  const {
    id,
    username,
    firstName,
    lastName,
    imageUrl,
    bio,
    createdAt,
    location,
  } = user;

  const [startMovementClicked, setStartMovementClicked] = useState(false);
  const [movementsLeading, setMovementsLeading] = useState([]);
  const [movementsFollowing, setMovementsFollowing] = useState([]);
  const [events, setEvents] = useState([]);
  const [toExplore, setToExplore] = useState(false);

  useEffect(() => {
    if (user) {
      getMovementsLeading(user.id)
        .then(results => {
          setMovementsLeading(results.data);
        });
      getMovementsFollowing(user.id)
        .then(results => {
          setMovementsFollowing(results.data);
        });
      axios.get(`/event/rsvp/${id}`)
        .then((eventColl) => {
          console.log('in profile, eventColl', eventColl);
          setEvents(eventColl.data);
        })
        .catch((err) => {
          console.error('Error pulling events to client for movement:', err);
        });
    }
  }, []);

  return (
    <div className="p-8">
      <div className="container mx-auto px-4 m-8 grid grid-flowgrid-cols-2 gap-4">
        <div>
          <div className="lg:flex bg-gray-200 w-full sm:w-full md:w-4/6 lg:w-4/6 xl:w-4/6 rounded overflow-hidden shadow-lg">
            <img className="flex-col object-cover w-full h-64 sm:w-full sm:h-64 md:w-full md:h-64 lg:w-2/5 lg:h-auto xl:w-2/5 xl:h-auto" src={imageUrl} alt={username} />
            <div className="m-8">
              <p className="text-gray-900 font-bold text-xl mb-2">{firstName} {lastName}</p>
              <p className="text-gray-900 text-lg mb-2">{location}</p>
              <p className="text-gray-900 text-base my-2">{bio}</p>
              <p className="text-gray-900 text-sm italic my-4">Member of Organize Power for {moment(createdAt).fromNow(true)}.</p>
            </div>
          </div>
        </div>

        <div className="m-4">
          <button onClick={() => setStartMovementClicked(!startMovementClicked)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mb-8 border border-gray-400 rounded shadow mr-4">Start a Movement</button>
          <Link to="/explore"><button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mb-8 border border-gray-400 rounded shadow mr-4">Join a Movement</button></Link>
          <FullScreenDialog events={events} />
          {startMovementClicked && (
            <div className="">
              <StartMovement
                user={user}
                setMovementsLeading={setMovementsLeading}
                setStartMovementClicked={setStartMovementClicked}
              />
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto">
        <div className="float-left max-w-lg rounded overflow-hidden shadow-lg p-8 m-8">
          <p className="text-gray-900 font-bold text-xl mb-2">Leader of These Movements:</p>
          <MovementList
            user={user}
            movements={movementsLeading}
            handleMovementTitleClick={handleMovementTitleClick}
          />
        </div>
        <div className="float-left max-w-lg rounded overflow-hidden shadow-lg p-8 m-8">
          <p className="text-gray-900 font-bold text-xl mb-2">Member of These Movements:</p>
          <MovementList
            user={user}
            movements={movementsFollowing}
            handleMovementTitleClick={handleMovementTitleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
