import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SendMessage from './SendMessage.jsx';
import Comments from './Comments.jsx';
import { getMovementsLeading, getMovementsFollowing } from '../services/services';

const Movement = ({
  user,
  currentMovement,
  setCurrentMovement,
}) => {
  const {
    id,
    name,
    imageUrl,
    description,
    polFirstName,
    polLastName,
    polEmail,
    polPosition,
    location,
    followers,
    emailCount,
    textCount,
  } = currentMovement;

  const data = [
    { id: 1, author: 'Pete Hunt', text: 'This is one comment' },
    { id: 2, author: 'Jordan Walke', text: 'This is *another* comment' },
  ];

  const [buttonText, setButtonText] = useState('Follow this Movement');
  const [text, setText] = useState(false);
  const [emailClick, setEmailClick] = useState(false);
  const [leading, setLeading] = useState(false);
  const followersString = followers ? followers.toLocaleString() : 0;
  const emailCountString = emailCount ? emailCount.toLocaleString() : 0;
  const textCountString = textCount ? textCount.toLocaleString() : 0;
  const body = `Dear ${polFirstName} ${polLastName}, 
    I am [INSERT YOUR NAME}, one of your many constituents. There must be something done about this problem...[INSERT YOUR PERSONAL MESSAGE HERE]
  `;

  let isFollowing;
  let isLeading;

  useEffect(() => {
    if (user) {
      getMovementsLeading(user.id)
        .then(results => {
          const ledMovementIds = results.data.length
            ? results.data.map(mvmt => mvmt.id)
            : null;
          isLeading = currentMovement && ledMovementIds
            ? ledMovementIds.includes(id)
            : null;
          if (isLeading) {
            setButtonText('Following ✓');
            setLeading(true);
          }
        });
      getMovementsFollowing(user.id)
        .then(results => {
          const followedMovementIds = results.data.length
            ? results.data.map(mvmt => mvmt.id)
            : null;
          isFollowing = currentMovement && followedMovementIds
            ? followedMovementIds.includes(id)
            : null;
          if (isFollowing) {
            setButtonText('Following ✓');
          }
        });
    }
  }, []);

  const getMovementById = (movementId) => {
    axios.get(`/movement/:${movementId}`)
      .then(res => {
        setCurrentMovement(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  // create a function to store who follows a movement
  const followMovement = () => {
    // store user id who follows a movements in movements tables
    // when the movement is clicked add that movement to the users table
    if (!isFollowing || !isLeading) {
      axios.post('/movement/followers', { userId: user.id, movementId: id })
        .then(follow => {
          setButtonText('Following ✓');
          getMovementById(id);
        })
        .catch(err => console.error(err));
    }
  };

  // create a function to send an email
  const email = () => {
    // send a request to google email API
    setEmailClick(true);
    axios.post('/movement/emailCount/', { id })
      .then(() => getMovementById(id))
      .catch((err) => console.error(err));
  };

  // create a function to send a request to twilio
  const textMovement = () => {
    setText(true);
  };

  return (
    <div className="container mx-auto px-4 m-8 grid grid-cols-2 gap-4 rounded overflow-hidden shadow-lg">
      <div>
        <div>
          <img className="object-cover h-48 w-full float-left" src={imageUrl} alt={`${name}`} />
          <p className="text-gray-900 font-bold text-3xl mb-2">{name}</p>
          <p className="text-gray-700 text-xl my-2">{location}</p>
          <p className="text-gray-700 text-lg my-2">Important Politician: {polFirstName} {polLastName}, {polPosition}</p>
          {leading && (
            <p className="text-gray-500 text-sm my-2">
              <i>You created this movement.</i>
            </p>
          )}
          <p className="text-gray-900 text-base my-2">{description}</p>
        </div>
        <Comments movement={currentMovement} user={user} />
      </div>
      <div className="m-8">
        <div>
          {/* conditionally render event button if user is the creator of the movement */}
          {leading && (
            <div>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-red-400 rounded shadow m-4" onClick={followMovement}>
                Schedule Event
              </button>
              <br />
            </div>
          )}


          {/* conditionally render follow button if user is logged in */}
          {user && (
            <div>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-blue-400 rounded shadow m-4" onClick={followMovement}>
                {buttonText}
              </button>
              <br />
            </div>
          )}
          <a href={`mailto:${polEmail}?&subject=${name}&body=${body}`} target="_blank" rel="noopener noreferrer">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-blue-400 rounded shadow m-4" onClick={email}>Email {polFirstName} {polLastName}</button>
          </a><br />
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-blue-400 rounded shadow m-4" onClick={textMovement}>Text a Friend</button><br />
        </div>
        {text && (
          <SendMessage
            currentMovement={currentMovement}
            getMovementById={getMovementById}
            user={user}
            setText={setText}
          />
        )}
        <div className="flex items-center mt-8 m-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 fill-current text-gray-600" viewBox="0 0 24 24"><path className="heroicon-ui" d="M20 22H4a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h4V8c0-1.1.9-2 2-2h4V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2zM14 8h-4v12h4V8zm-6 4H4v8h4v-8zm8-8v16h4V4h-4z" /></svg>
          <div className="text-sm mx-4">
            <p className="text-gray-600">FOLLOWERS: {followersString}</p>
            <p className="text-gray-600">EMAILS SENT: {emailCountString}</p>
            <p className="text-gray-600">TEXTS SENT: {textCountString}</p>
          </div>
        </div>
      </div>
      <Link to="/explore" className="text-gray-500 text-sm my-2 italic">← Return to Explore Page</Link>
    </div>
  );
};
export default Movement;
