import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Emoji } from 'emoji-mart';
import axios from 'axios';
import CommentReplyList from './CommentReplyList.jsx';
import { getUserProfileById } from '../services/services';
import Emojis from './Emojis.jsx';

// sub component of commentListItem where we recieve a comment
const CommentListItem = ({ comment, key, comments, currentUser }) => {
  // destructure the username and comment out of props
  const { username, commentText, createdAt, id_user, id, emojiData, replyData } = comment;

  // a user set state for the profile image
  const [user, setUser] = useState({ imageUrl: '' });
  const [seen, setSeen] = useState(false);
  const [reply, setReply] = useState(false);
  const [emojiArray, setEmojiArray] = useState(JSON.parse(emojiData));
  // example comment data
  const [replyArray, setReplyArray] = useState(JSON.parse(replyData));

  // make a function that will save the current state of the comment into the database
  const updateCommentEmoji = () => {
    // stingify the emojiArray
    const emojiString = JSON.stringify(emojiArray);
    axios.post('/comment/update/emoji', { emojiString, id });
  };

  const updateCommentReply = () => {
    // stingify the emojiArray
    const replyString = JSON.stringify(replyArray);
    axios.post('/comment/update/reply', { replyString, id });
  };

  // add the replied comment to the reply data
  const addCommentToReplyData = (text) => {
    // copy the current replyData
    const newArr = [...replyArray];
    // construct the new comment
    const newComment = {
      id: newArr.length,
      commentText: text,
      username: currentUser.username,
      emojiData: [],
      createdAt: moment(),
      id_user: currentUser.id,
    };
    // add the new comment to the newArr
    newArr.push(newComment);
    // replace the replyData
    setReplyArray(newArr);
    // I need to update it in the storage yeah!
    updateCommentReply();
  };

  const updateEmojiDataOnReplyComment = (emojiArr, idOfUser) => {
    // copy the current replyData
    const newArr = [...replyArray];
    // modify the emojiData on the selected comment
    newArr[idOfUser].emojiData = emojiArr;
    // replace replyData with the modified newArr
    setReplyArray(newArr);
    updateCommentReply();
  };

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

  const toggleReply = () => {
    setReply(!reply);
  };

  const addToEmojiArray = (emojiObject) => {
    // make a new array with the added emoji
    const newArr = [...emojiArray];
    newArr.push({ id: emojiObject.id, skin: emojiObject.skin, count: 1 });
    setEmojiArray(newArr);
    updateCommentEmoji();
  };

  const addToEmojiCount = (index) => {
    // copy the current array of objects
    const newArr = [...emojiArray];
    // update the count
    newArr[index].count += 1;
    setEmojiArray(newArr);
    updateCommentEmoji();
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
            <div key={index}>
              <div className="flex mr-2 text-gray-700 text-sm mr-3">
                <button className="modal-open bg-transparent hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-1 px-2 rounded-none" style={{ outline: 'none' }} onClick={() => addToEmojiCount(index)}>
                  <Emoji emoji={{ id: emoji.id, skin: emoji.skin }} size={32} />
                </button>
                <div className="flex items-center justify-between" id={key}>
                  <p>{emoji.count}</p>
                </div>
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
          <button className="modal-open bg-transparent border border-gray-500 hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-1 px-2 rounded-full" style={{ outline: 'none' }} onClick={toggleReply}>
            <svg fill="none" viewBox="0 0 24 24" className="w-8 h-8 mr-1" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            <span>{replyArray.length}</span>
          </button>
          {reply ? <CommentReplyList comments={replyArray} toggleReply={toggleReply} addComment={addCommentToReplyData} updateEmojiData={updateEmojiDataOnReplyComment} /> : null}
        </div>
      </div>
    </div>
  );
};

export default CommentListItem;
