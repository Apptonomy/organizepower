/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfileById } from '../services/services';

const GroupListItem = ({
  user,
  group,
  handleGroupTitleClick,
}) => {
  // const followedMovementIds = movementsFollowing.length
  //   ? movementsFollowing.map(mvmt => mvmt.id)
  //   : null;

  // const isFollowing = movement && followedMovementIds
  //   ? followedMovementIds.includes(movement.id)
  //   : null;

  // const ledMovementIds = movementsLeading.length
  //   ? movementsLeading.map(mvmt => mvmt.id)
  //   : null;

  // const isLeading = movement && ledMovementIds
  //   ? ledMovementIds.includes(movement.id)
  //   : null;

  const [startedBy, setStartedBy] = useState('');

  const {
    id,
    imageUrl,
    name,
    location,
    bio,
    adminName,

    id_organizer,
  } = group;

  useEffect(() => {
    getUserProfileById(id_organizer)
      .then(res => {
        const { firstName, lastName } = res.data;
        setStartedBy(`${firstName} ${lastName}`);
      });
  }, []);

  const shortDesc = bio.slice(0, 250);

  return (
    <div className="max-w-sm h-full rounded overflow-hidden shadow-lg m-8 float-left">
      <Link to={`/group/${id}`} onClick={() => handleGroupTitleClick(id)}>
        <img className="w-full" src={imageUrl} alt={`${name}`} />
      </Link>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <span className="text-gray-900 font-bold text-xl mb-2 hover:text-gray-500 mr-4">
            <Link to={`/group/${id}`} onClick={() => handleGroupTitleClick(id)}>
              {name}
            </Link>
          </span>
          <p className="text-gray-700 text-base my-2">
            {location}
          </p>
          <p className="text-gray-500 text-sm my-2">
            <i>{adminName} is the Admin for this Group</i>
          </p>
          <p className="text-gray-700 text-base my-2">
            {shortDesc} . . . &nbsp;
            <Link to={`/group/${id}`} onClick={() => handleGroupTitleClick(id)} className="text-gray-400 font-bold mb-2 hover:text-gray-500 mr-4">
              <i>continue reading</i>.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupListItem;
