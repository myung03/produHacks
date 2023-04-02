import React from "react";
import { useState } from "react";

function Post(media, comments) {
  const [commentInput, setCommentInput] = useState("");

  const handleCommentInput = (event) => {
    setCommentInput(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    // Here you can add code to submit the comment to a backend API or store it in state
    setCommentInput("");
  };

  const updateComments = () => {
    comments.map((comment, index) => <div key={index}>{comment}</div>);
  };

  return (
    <div>
      <video src={videoUrl} controls />
      <div>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentInput}
            onChange={handleCommentInput}
          />
          <button type="submit">Comment</button>
        </form>
        {updateComments}
      </div>
    </div>
  );
}

export default Post;
