import React, { useState, useContext, useMemo } from "react";

import { jwtVerify } from "jose";

import * as cookie from "cookie";

import FeedOptions from "../../components/Feed/FeedOptions";

import Post from "../../components/Post/Post";

import useSWR from "swr";

import axios from "axios";

import { Button } from "@chakra-ui/react";

import { ExclamationTriangleFill } from "react-bootstrap-icons";

import { UserContext } from "../../contexts/userContext";

const Feed = ({ initialPosts }) => {
  const { user } = useContext(UserContext);

  const [sort, setSort] = useState({
    name: null,
    title: null,
    upvotes: null,
    modified: false,
    time: null,
    date: {
      from: null,
      to: null,
    },
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
      if (sort.time) {
        if (sort.time === "newest") {
          posts.sort(function (a, b) {
            return (
              new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
            );
          });
        } else {
          posts.sort(function (a, b) {
            return (
              new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
            );
          });
        }
      }
      if (sort.date.from && sort.date.to) {
        if (+sort.date.from === +sort.date.to) {
          posts = posts.filter((post) => {
            const time = new Date(post.postedAt);
            return (
              time.getDay() === sort.date.from.getDay() &&
              time.getMonth() === sort.date.from.getMonth() &&
              time.getFullYear() === sort.date.from.getFullYear()
            );
          });
        } else {
          posts = posts.filter(
            (post) =>
              new Date(post.postedAt).getTime() >= sort.date.from.getTime() &&
              new Date(post.postedAt).getTime() <= sort.date.to.getTime()
          );
        }
      }
    }
    return posts;
  }, [initialPosts, data, sort]);

  return (
    <div className="min-h-screen bg-gray">
      <div className="flex flex-col mx-auto w-full md:w-2/4">
        <FeedOptions
          create={true}
          sortPosts={(filters) => setSort(filters)}
          resetFilters={() =>
            setSort({
              name: null,
              title: null,
              upvotes: null,
              modified: false,
              time: null,
              date: {
                from: null,
                to: null,
              },
            })
          }
        />
        {posts?.length ? (
          <ul className="flex flex-col">
            {posts.map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </ul>
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
            <ExclamationTriangleFill className="text-9xl text-orange" />
            <h1 className="text-3xl font-bold text-center">
              Nu există postări!
            </h1>
            {sort.modified && (
              <>
                <span className="my-2 text-center">
                  Se pare că nicio postare nu respectă filtrele alese.
                </span>
                <Button
                  onClick={() =>
                    setSort({
                      name: null,
                      title: null,
                      upvotes: null,
                      modified: false,
                      time: null,
                      date: {
                        from: null,
                        to: null,
                      },
                    })
                  }
                  colorScheme="blue"
                >
                  Resetează filtrele
                </Button>
              </>
            )}
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
