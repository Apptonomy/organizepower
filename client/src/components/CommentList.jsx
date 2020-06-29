import React, { useState, useEffect } from 'react';
import CommentListItem from './CommentListItem.jsx';
// sub component of Comments.jsx
const CommentList = ({ comments, user }) => {
  return (
    <div className="mt-10">
      <p className="font-bold text-gray-800 text-xl ml-4">Comments</p>
      {/* if there are comments map through them and pass down each comment,
      with he latest comment on top, to commentListItem */}
      {comments.length && comments.map((comment, index) => (
        <div key={index}>
          <CommentListItem comment={comment} comments={comments} currentUser={user} id={index} />
      </div>
      ))}
    </div>
  );
};

export default CommentList;
