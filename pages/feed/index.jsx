import React, { useState } from "react";

import { jwtVerify } from "jose";

import * as cookie from "cookie";

import FeedOptions from "../../components/FeedOptions";

import Post from "../../components/Post";

const Feed = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const removePost = (id) => {
    const updated = posts.filter((post) => post._id !== id);
    setPosts(updated);
  };
  return (
    <div className="min-h-screen bg-gray">
      <div className="flex flex-col mx-auto w-full md:w-2/4">
        <FeedOptions addPost={(post) => setPosts([...posts, post])} />
        <ul className="flex flex-col">
          {posts.map((post, i) => (
            <Post key={i} post={post} removePost={removePost} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  try {
    const secret = process.env.JWT_SECRET;
    const cookies = cookie.parse(ctx.req.headers.cookie);
    const jwt = cookies.IdeeROJWT;
    const { payload } = await jwtVerify(jwt, new TextEncoder().encode(secret));
    const baseURL = !process.env.VERCEL_URL
      ? "http://localhost:3000"
      : `https://${process.env.VERCEL_URL}`;
    const res = await fetch(`${baseURL}/api/feed/${payload.id}`);
    const data = await res.json();
    return { props: { initialPosts: data.posts } };
  } catch (error) {
    return { props: { initialPosts: [] } };
  }
}

export default Feed;
