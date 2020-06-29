import React, { useState, useEffect } from 'react';
import GroupListItem from './GroupListItem.jsx';

const GroupsList = ({
  user,
  groups = [],
  handleGroupTitleClick,
}) => {
  const [groupsAdmin, setGroupsAdmin] = useState([]);
  // const [movementsFollowing, setMovementsFollowing] = useState([]);
  // get movements leading & following by user to pass to movement list item
  // useEffect(() => {
  //   if (user) {
  //     getMovementsLeading(user.id)
  //       .then(results => {
  //         setMovementsLeading(results.data);
  //       });
  //     getMovementsFollowing(user.id)
  //       .then(results => {
  //         setMovementsFollowing(results.data);
  //       });
  //   }
  // }, []);

  return (
    <div className="flex flex-wrap -mb-4">
      {groups.map(group => (
        <GroupListItem
          group={group}
          user={user}
          key={group.id}
          handleGroupTitleClick={handleGroupTitleClick}
          // movementsLeading={movementsLeading}
          // movementsFollowing={movementsFollowing}
        />
      ))}
    </div>
  );
};

export default GroupsList;
