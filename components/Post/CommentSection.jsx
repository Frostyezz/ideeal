import React, { useContext } from "react";

import { UserContext } from "../../contexts/userContext";

import Comment from "./Comment";

import CreateComment from "./CreateComment";

const CommentSection = ({ comments, id }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col">
      {user && <CreateComment id={id} />}
      <ul className="flex flex-col mb-2">
        {comments.map((comment, i) => (
          <Comment key={i} id={id} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
