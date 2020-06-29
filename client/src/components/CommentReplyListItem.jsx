import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Emoji } from 'emoji-mart';
import Emojis from './Emojis.jsx';
import { getUserProfileById } from '../services/services';

// sub component of commentListItem where we recieve a comment
const CommentReplyListItem = ({ comment, key, updateEmojiData }) => {
  // destructure the username and comment out of props
  const { username, commentText, createdAt, id_user, id, emojiData } = comment;

  // a user set state for the profile image
  const [user, setUser] = useState({ imageUrl: '' });
  const [seen, setSeen] = useState(false);
  const [emojiArray, setEmojiArray] = useState(emojiData);

  useEffect(() => {
    getUserProfileById(id_user)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const toggleEmoji = () => {
    setSeen(!seen);
  };

  const addToEmojiArray = (emojiObject) => {
    // make a new array with the added emoji
    const newArr = [...emojiArray];
    newArr.push({ id: emojiObject.id, skin: emojiObject.skin, count: 1 });
    setEmojiArray(newArr);
    updateEmojiData(newArr, id);
  };

  const addToEmojiCount = (index) => {
    // copy the current array of objects
    const newArr = [...emojiArray];
    // update the count
    newArr[index].count += 1;
    setEmojiArray(newArr);
  };

  return (
    <div className="flex items-start px-4 py-6 bg-white shadow-lg">
      <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={user.imageUrl} alt="avatar" />
      <div className="">
        <div className="flex items-center" id={key}>
          <h2 className="text-lg font-semibold text-gray-900 -mt-1">{username}</h2>
          <small className="text-sm text-gray-700 object-left">&nbsp;&nbsp;&nbsp;{moment(createdAt).fromNow()}</small>
        </div>
        <p className="mt-3 text-gray-700 text-sm">
          {commentText}
        </p>
        <div className="mt-4 flex items-center">
          {emojiArray.map((emoji, index) => (
            <div className="flex mr-2 text-gray-700 text-sm mr-3" key={index}>
              <button className="modal-open bg-transparent hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-1 px-2 rounded-none" style={{ outline: 'none' }} onClick={() => addToEmojiCount(index)}>
                <Emoji emoji={{ id: emoji.id, skin: emoji.skin }} size={32} />
              </button>
              <div className="flex items-center justify-between" id={key}>
                <p>{emoji.count}</p>
              </div>
            </div>
          ))}
          <div className="flex mr-2 text-gray-700 text-sm mr-4">
            <button className="modal-open bg-transparent border border-gray-500 hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-1 px-2 rounded-full" style={{ outline: 'none' }} onClick={toggleEmoji}>
              <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            {seen ? <Emojis toggleEmoji={toggleEmoji} addToEmojiArray={addToEmojiArray} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentReplyListItem;
