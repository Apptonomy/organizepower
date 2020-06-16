/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';

import { getMovements } from '../services/services';
import { fakeMovements } from '../services/fakeData';
import MovementList from './MovementList.jsx';

const Explore = ({ user }) => {
  const [movements, setMovements] = useState(fakeMovements);

  // example of a function that could be used to update movements
  // this is currently returning a 404 error
  useEffect(() => {
    getMovements()
      .then(results => setMovements(results));
  });

  return (
    <div>
      <button className="discover-movements" type="button">Fight the Power</button>
      <MovementList movements={movements} />
    </div>
  );
};

export default Explore;