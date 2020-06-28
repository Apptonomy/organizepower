import React, { useState, useEffect } from 'react';
import { getAllUsers, getAllUserMessages, sendUserMessage } from '../services/services';
import { fakeUsers, fakeMessages } from '../services/fakeData';
import '../styles/Messages.css';

// pass user to messages below once not useing fakeData
const Messages = ({ user }) => {
  const {
    username,
    id,
  } = user;
  // const user = fakeUsers[1];
  const [allUsers, setAllUsers] = useState('');
  const [userMessages, setUserMessages] = useState([]);
  const [otherMessages, setOtherMessages] = useState([]);
  const showUsers = () => {
    getAllUsers()
      .then((response) => {
        console.log(response);
        // profile.js is filtering this request to remove the hash and salt; we could remove more if we want
        setAllUsers(response.data);
      });
  };
  const logMessages = (clickedUserId, clickedUsername) => {
    console.log('clicked');
    console.log(clickedUsername);
    console.log(clickedUserId);
    // setUserMessages(getAllUserMessages(clickedUserId, id));
    // setOtherMessages(getAllUserMessages(id, clickedUserId));
    getAllUserMessages(id, clickedUserId)
      .then(response => {
        setUserMessages(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    getAllUserMessages(clickedUserId, id)
      .then(response => {
        setOtherMessages(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    return (
      <div>
        <h1>Currently messaging {clickedUsername}</h1>
        <div>
          {}
        </div>
      </div>
    );
  };
  return (
    <div className="container mx-auto px-4 m-8 grid grid-flowgrid-cols-2 gap-4">
      <div className="container mx-auto px-4 m-8 grid grid-flowgrid-cols-2 gap-4">
        <h1>List of people {username} is messaging</h1>
        {/* make this list hidden unless it is clicked on */}
        <button onClick={showUsers}>show them users</button>
        {allUsers && (
          <div>
            {allUsers.map((mappedUser, index) => (
              <h1 onClick={() => {logMessages(mappedUser.id, mappedUser.username)}} key={index} id={index}>{mappedUser.username}</h1>
            ))}
          </div>
        )}
      </div>
      <div>
        <input type="text" name="name" placeholder="Speak your mind" />
        <button type="submit" value="Submit">Submit</button>
      </div>
    </div>
  );
};
export default Messages;
