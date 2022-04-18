import React, { useState } from "react";

import FeedOptions from "../../components/FeedOptions";

import Post from "../../components/Post";

const Feed = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  return (
    <div className="min-h-screen bg-gray">
      <div className="flex flex-col mx-auto w-full md:w-2/4">
        <FeedOptions />
        <ul className="flex flex-col">
          {posts.map((post, i) => (
            <Post key={i} post={post} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/post");
  const data = await res.json();
  return { props: { initialPosts: data.posts } };
}

export default Feed;
