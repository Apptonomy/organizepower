/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { getMovements, getGroups } from '../services/services';
import MovementList from './MovementList.jsx';
import GroupsList from './GroupsList.jsx';

const Explore = ({
  user,
  handleMovementTitleClick,
  handleGroupTitleClick,
}) => {
  const [movements, setMovements] = useState([]);
  const [groups, setGroups] = useState([]);
  const [toggleMovements, setToggleMovements] = useState(true);
  const [toggleGroups, setToggleGroups] = useState(false);

  // gets movements from db to pass them down to movement list
  useEffect(() => {
    getMovements()
      .then(results => {
        setMovements(results.data);
      })
      .catch(err => console.error(err));

    getGroups()
      .then(results => {
        setGroups(results.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="m-4">
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-blue-400 rounded shadow m-4" onClick={() => setToggleMovements(!toggleMovements)}>Explore Movments</button><br />
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-blue-400 rounded shadow m-4" onClick={() => setToggleGroups(!toggleGroups)}>Explore Groups</button><br />
      <p className="text-gray-700 text-lg m-8 w-1/2">Organize Power bridges the gap between the desire for change and impactful action. Engage with the movements that inspire you - and start your own movement! Encourage your followers to pressure public figures and get the word out to friends.</p>
      {toggleGroups && (
        <GroupsList
          groups={groups}
          user={user}
        // movements={movements}
          handleGroupTitleClick={handleGroupTitleClick}

        />
      )}
      {movements.length && !toggleMovements
      && (
        <MovementList
          user={user}
          movements={movements}
          handleMovementTitleClick={handleMovementTitleClick}
        />
      )}
    </div>
  );
};

export default Explore;
