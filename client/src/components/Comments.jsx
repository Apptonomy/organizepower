import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentList from './CommentList.jsx';

// lead component for comment box
// recives props from Movement.jsx
const Comments = ({ movement, user }) => {
  const { id } = movement;
  // create wo state values of text and comments
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);

  // grab all the comments that are already stored in the database
  useEffect(() => {
    axios.get('/comment', { params: { movementId: id } })
      .then((response) => {
        setComments(response.data.reverse());
      })
      .catch((err) => console.error(err));
  }, []);

  /*  when the comment button is clicked save the comment to the
  database and also grab it from the dataabse
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    // we ill send a body with a movementId, comment and user
    axios.post('/comment', { movementId: id, comment: text, authorId: user.id })
      .then(() => {
        setText('');
        // then we will get that data back from the db
        axios.get('/comment', { params: { movementId: id } })
          .then((response) => {
            setComments(response.data.reverse());
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const areThereComments = comments.length > 0;

  return (
    <div>
      {/* conditionally render the text box if a user is logged in */}
      {user && (
        <form className="commentForm" onSubmit={handleSubmit}>
          <textarea
            className="shadow appearance-none border border-gray-200 rounded w-full h-20 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline m-2"
            value={text}
            type="text"
            placeholder="Say something..."
            onChange={e => setText(e.target.value)}
          />
          <input className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2 float-right" type="submit" value="Submit" />
        </form>
      )}
      <div className="commentBox">
        {/* if there are comments render the comment list component and pass down the comments */}
        {areThereComments && (<CommentList comments={comments} user={user} />)}
      </div>
    </div>
  );
};

export default Comments;
