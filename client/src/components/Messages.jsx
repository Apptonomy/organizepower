import React, { useState, useEffect } from 'react';
import { } from '../services/services';
import '../styles/Messages.css';

const Messages = ({ user }) => {
  const {
    username,
  } = user;
  return (
    <div>
      <div>
        <h1>List of people {username} are messaging</h1>
        {/* make this list hidden unless it is clicked on */}
      </div>
      <div>
        <input type="text" name="name" placeholder="Speak your mind" />
        <button type="submit" value="Submit">Submit</button>
      </div>
    </div>
  );
};

export default Messages;
