import { createContext, useState, useEffect } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };
  const populatePosts = (list) => {
    setPosts(list);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        populatePosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostProvider, PostContext };
