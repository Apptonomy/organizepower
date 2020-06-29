import Draggable from 'react-draggable';
import React, { useState } from 'react';
import CommentReplyListItem from './CommentReplyListItem.jsx';
// sub component of Comments.jsx

const CommentReplyList = ({ comments, toggleReply, addComment, updateEmojiData }) => {

  const [seen, setSeen] = useState(false);
  const [text, setText] = useState('');

  const toggleReplyBox = () => {
    setSeen(!seen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(text);
    // update the reply list data
  };

  return (
    <Draggable>
      <div className=" fixed w-full h-full top-0 left-0 flex items-center justify-center">
        <div className="modal-overlay absolute w-full h-full opacity-50" />
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
            <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
            </svg>
            <span className="text-sm">(Esc)</span>
          </div>
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <div className="modal-close cursor-pointer z-50" />
            </div>
            <div className="mt-10">
              <p className="font-bold text-gray-800 text-xl ml-4">Replys</p>
              {/* if there are comments map through them and pass down each comment */}
              {comments.length > 0 && comments.map(comment => (
                <div key={comment.id}>
                  <CommentReplyListItem comment={comment} updateEmojiData={updateEmojiData} />
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <button className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400" onClick={() => toggleReplyBox()}>Reply</button>
              <button className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400" onClick={() => toggleReply()}>Close</button>
            </div>
            {seen ? <form className="commentForm" onSubmit={handleSubmit}>
              <textarea
                className="shadow appearance-none border border-gray-200 rounded w-full h-20 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline m-2"
                value={text}
                type="text"
                placeholder="Say something..."
                onChange={e => setText(e.target.value)}
              />
              <input className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2 float-right" type="submit" value="Submit" />
            </form> : null}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default CommentReplyList;
