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
    followers,
    emailCount,
    textCount,
    adminName,
    polFirstName,
    polLastName,
    charName,
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
  const followersString = followers ? followers.toLocaleString() : 0;
  const emailCountString = emailCount ? emailCount.toLocaleString() : 0;
  const textCountString = textCount ? textCount.toLocaleString() : 0;

  return (
    <div className="max-w-sm h-full rounded overflow-hidden shadow-lg m-8 float-left">
      <Link to={`/movement/${id}`} onClick={() => handleGroupTitleClick(id)}>
        <img className="w-full" src={imageUrl} alt={`${name}`} />
      </Link>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <span className="text-gray-900 font-bold text-xl mb-2 hover:text-gray-500 mr-4">
            <Link to={`/movement/${id}`} onClick={() => handleGroupTitleClick(id)}>
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
            <Link to={`/movement/${id}`} onClick={() => handleMovementTitleClick(id)} className="text-gray-400 font-bold mb-2 hover:text-gray-500 mr-4">
              <i>continue reading</i>.
            </Link>
          </p>
          <div className="flex items-center mt-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-current text-gray-600" viewBox="0 0 24 24"><path className="heroicon-ui" d="M20 22H4a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h4V8c0-1.1.9-2 2-2h4V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2zM14 8h-4v12h4V8zm-6 4H4v8h4v-8zm8-8v16h4V4h-4z" /></svg>
            <div className="text-xs mx-4">
              <p className="text-gray-600">FOLLOWERS: {followersString}</p>
              <p className="text-gray-600">EMAILS SENT: {emailCountString}</p>
              <p className="text-gray-600">TEXTS SENT: {textCountString}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupListItem;
