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
  const baseURL = !process.env.VERCEL_URL
    ? "http://localhost:3000"
    : process.env.VERCEL_URL;
  const res = await fetch(`${baseURL}/api/post`);
  const data = await res.json();
  return { props: { initialPosts: data.posts } };
}

export default Feed;
