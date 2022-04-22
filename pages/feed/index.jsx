import React, { useState, useContext, useMemo } from "react";

import { jwtVerify } from "jose";

import * as cookie from "cookie";

import FeedOptions from "../../components/FeedOptions";

import Post from "../../components/Post";

import useSWR from "swr";

import axios from "axios";

import { ExclamationTriangleFill } from "react-bootstrap-icons";

import { UserContext } from "../../contexts/userContext";

const Feed = ({ initialPosts }) => {
  const { user } = useContext(UserContext);

  const [sort, setSort] = useState({
    name: null,
    title: null,
    upvotes: null,
    modified: false,
  });

  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`/api/feed/${user?._id}`, fetcher, {
    refreshInterval: 60000,
  });

  const posts = useMemo(() => {
    if (!data) return initialPosts;
    const { posts } = data;
    if (sort.modified) {
      if (sort.name) {
        posts = posts.filter((post) =>
          `${post.author.firstName} ${post.author.lastName}`
            .toLowerCase()
            .includes(sort.name)
        );
      }
      if (sort.title) {
        posts = posts.filter((post) =>
          `${post.title} ${post.title}`.toLowerCase().includes(sort.title)
        );
      }
      if (sort.upvotes) {
        if (sort.upvotes === "ascending")
          posts.sort((a, b) => a.upvoters.length - b.upvoters.length);
        else posts.sort((a, b) => b.upvoters.length - a.upvoters.length);
      }
    }
    return posts;
  }, [initialPosts, data, sort]);

  return (
    <div className="min-h-screen bg-gray">
      <div className="flex flex-col mx-auto w-full md:w-2/4">
        <FeedOptions
          sortPosts={(filters) => setSort(filters)}
          resetFilters={() =>
            setSort({
              name: null,
              title: null,
              upvotes: null,
              modified: false,
            })
          }
        />
        {posts.length ? (
          <ul className="flex flex-col">
            {posts.map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </ul>
        ) : (
          <div className="w-full h-screen flex flex-col justify-center items-center">
            <ExclamationTriangleFill className="text-9xl text-orange" />
            <h1 className="text-3xl font-bold">Nu există postări!</h1>
          </div>
        )}
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
