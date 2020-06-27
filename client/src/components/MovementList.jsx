import React, { useState, useEffect } from 'react';
import MovementListItem from './MovementListItem.jsx';
import {
  getMovementsLeading,
  getMovementsFollowing,
} from '../services/services';

// child of explore
const MovementList = ({
  user,
  movements = [],
  handleMovementTitleClick,
}) => {
  const [movementsLeading, setMovementsLeading] = useState([]);
  const [movementsFollowing, setMovementsFollowing] = useState([]);
  // get movements leading & following by user to pass to movement list item
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
    }
  }, []);

  return (
    <div className="flex flex-wrap -mb-4">
      {movements.map(movement => (
        <MovementListItem
          movement={movement}
          user={user}
          key={movement.id}
          handleMovementTitleClick={handleMovementTitleClick}
          movementsLeading={movementsLeading}
          movementsFollowing={movementsFollowing}
        />
      ))}
    </div>
  );
};

export default MovementList;
